import base64
import io
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from passlib.hash import sha256_crypt
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from sqlalchemy import ForeignKey, text
import werkzeug
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
CORS(app, origins=["*"], supports_credentials=True, headers="*")
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Hadok3ns77!!@localhost/pet_care'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this to your secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)  # Set token expiration to 24 hours

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    __tablename__ = 'username'
    idusername = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    customer = db.relationship('Customer', backref='user', uselist=False)
    pets = db.relationship('Pets', backref='user', foreign_keys='Pets.idusername')

class Customer(db.Model):
    __tablename__ = 'customer'
    idcustomer = db.Column(db.Integer, primary_key=True)
    idusername = db.Column(db.Integer, db.ForeignKey('username.idusername'), unique=True)
    first_name = db.Column(db.String(45), nullable=False)
    surname = db.Column(db.String(45), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(45), nullable=False)
    postcode = db.Column(db.Integer, nullable=False)

class Pets(db.Model):
    __tablename__ = 'pets'
    petid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idusername = db.Column(db.Integer, db.ForeignKey('username.idusername'))
    name = db.Column(db.String(45), nullable=False)
    breed = db.Column(db.String(45), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(45), nullable=False)
    photo = db.Column(db.LargeBinary, default=b'')

user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, required=True, help='Username is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')

customer_parser = reqparse.RequestParser()
customer_parser.add_argument('first_name', type=str, required=True, help='First name is required')
customer_parser.add_argument('surname', type=str, required=True, help='Surname is required')
customer_parser.add_argument('phone', type=int, required=True, help='Phone number is required')
customer_parser.add_argument('email', type=str, required=True, help='Email is required')
customer_parser.add_argument('postcode', type=int, required=True, help='Postcode is required')

pet_parser = reqparse.RequestParser()
pet_parser.add_argument('idusername', type=int, required=True, help='User ID is required')
pet_parser.add_argument('name', type=str, required=True, help='Pet name is required')
pet_parser.add_argument('breed', type=str, required=True, help='Pet breed is required')
pet_parser.add_argument('age', type=int, required=True, help='Pet age is required')
pet_parser.add_argument('gender', type=str, required=True, help='Pet gender is required')
pet_parser.add_argument('photo', type=werkzeug.datastructures.FileStorage, location='files')

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

# Add a custom claims for user identity in JWT
@jwt.user_identity_loader
def add_claims_to_access_token(user):
    return {'username': user.username}

class UserRegistration(Resource):
    def post(self):
        data = user_parser.parse_args()
        username = data['username']
        password = data['password']

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {'message': 'User already exists'}, 400

        hashed_password = sha256_crypt.hash(password)

        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        user_id = new_user.idusername

        return {'message': 'User registered successfully', 'user_id': user_id}, 201

class CustomerRegistration(Resource):
    def post(self):
        try:
            data = request.get_json()
            user_id = data.get('user_id')

            first_name = data['first_name']
            surname = data['surname']
            phone = data['phone']
            email = data['email']
            postcode = data['postcode']

            new_customer = Customer(
                idusername=user_id,
                first_name=first_name,
                surname=surname,
                phone=phone,
                email=email,
                postcode=postcode
            )

            db.session.add(new_customer)
            db.session.commit()

            print('Customer data added successfully to the database')

            return {'message': 'Customer data added successfully'}, 201
        except Exception as e:
            db.session.rollback()
            print(f'Error adding customer data to the database: {str(e)}')
            return {'message': 'Error adding customer data to the database'}, 500

class PetRegistration(Resource):
    def post(self):
        if 'photo' in request.files and request.headers['Content-Type'].startswith('multipart/form-data'):
            idusername = request.form.get('idusername')
            name = request.form.get('name')
            breed = request.form.get('breed')
            age = request.form.get('age')
            gender = request.form.get('gender')
            
            photo = request.files['photo']
            if photo:
                photo_data = photo.read()
                
                new_pet = Pets(
                    idusername=idusername,
                    name=name,
                    breed=breed,
                    age=age,
                    gender=gender,
                    photo=photo_data
                )

                db.session.add(new_pet)
                db.session.commit()

                return {'message': 'Pet data added successfully'}, 201

        elif request.headers['Content-Type'] == 'application/json':
            data = request.json
            idusername = data['idusername']
            name = data['name']
            breed = data['breed']
            age = data['age']
            gender = data['gender']

            new_pet = Pets(
                idusername=idusername,
                name=name,
                breed=breed,
                age=age,
                gender=gender,
                photo=None
            )

            db.session.add(new_pet)
            db.session.commit()

            return {'message': 'Pet data added successfully'}, 201

        else:
            return {'error': 'Unsupported Content-Type'}, 415

from flask import request

# ...

class PetList(Resource):
    def get(self):
        # Parse the 'gender', 'age', and 'breed' query parameters using the request object
        selected_gender = request.args.get('gender', 'all', type=str)
        selected_age = request.args.get('age', 'all', type=int)
        selected_breed = request.args.get('breed', 'all', type=str)

        # Create a base query
        base_query = Pets.query

        # Fetch pets from the filtered query
        pets = []

        # Initialize the pets query with the base query
        pets_query = base_query

        # Apply filters based on selected options
        if selected_gender != 'all':
            pets_query = pets_query.filter_by(gender=selected_gender)

        if selected_age != 'all':
            pets_query = pets_query.filter_by(age=selected_age)

        if selected_breed != 'all':
            pets_query = pets_query.filter_by(breed=selected_breed)

        # Execute the query to get the filtered pets
        pets = pets_query.all()


        # Create a list to store the pet data
        pet_data = []

        for pet in pets:
            pet_entry = {
                'petid': pet.petid,
                'name': pet.name,
                'breed': pet.breed,
                'age': pet.age,
                'gender': pet.gender,
                'photo': None
            }

            if pet.photo:
                with io.BytesIO(pet.photo) as binary_stream:
                    pet_entry['photo'] = base64.b64encode(binary_stream.read()).decode()

            pet_data.append(pet_entry)

        # Return the list of pet data as a JSON array
        return jsonify(pet_data)






class UserLogin(Resource):
    def post(self):
        data = user_parser.parse_args()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if not user or not sha256_crypt.verify(password, user.password):
            return {'message': 'Invalid username or password'}, 401

        access_token = create_access_token(identity=user)
        idusername = user.idusername

        # Create a dictionary containing the token and idusername
        response_data = {
            'message': 'Login successful',
            'access_token': access_token,
            'idusername': idusername
        }

        # Return the dictionary as JSON in the response
        return response_data, 200


# New endpoint for fetching user profile data including pets and their images
class UserProfile(Resource):
    @jwt_required()
    def get(self, idusername):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user['username']).first()

        if not user:
            return {'message': 'User not found'}, 404

        # Handle the GET request to retrieve user data
        pets = Pets.query.filter_by(idusername=user.idusername).all()

        user_data = {
            'username': user.username,
            'pets': [{
                'name': pet.name,
                'breed': pet.breed,
                'age': pet.age,
                'gender': pet.gender,
                'photo': pet.photo  
            } for pet in pets]
        }

        # Convert binary photo data to base64 and include it in the response
        for pet_data in user_data['pets']:
            if pet_data['photo']:
                with io.BytesIO(pet_data['photo']) as binary_stream:
                    pet_data['photo'] = base64.b64encode(binary_stream.read()).decode()
                    pet_data['photo_url'] = f"data:image/jpeg;base64,{pet_data['photo']}"  # Add the image URL
                    
            print('Image Data:', pet_data['photo'])
        # Return the user_data dictionary directly
        return user_data







api.add_resource(UserProfile, '/user-profile/<string:idusername>', methods=['GET'])



api.add_resource(UserRegistration, '/register', methods=['POST'])
api.add_resource(CustomerRegistration, '/register_customer', methods=['POST'])
api.add_resource(PetRegistration, '/register_pet', methods=['POST'])
api.add_resource(PetList, '/pets', methods=['GET'])
api.add_resource(UserLogin, '/login', methods=['POST'])

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
            query = text('SELECT 1')
            result = db.session.execute(query)
            print('Database connection successful')
        except Exception as e:
            print(f'Database connection error: {str(e)}')

    app.run(debug=True)
