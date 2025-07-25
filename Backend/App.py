import os
from dotenv import load_dotenv
import base64
import io
import logging
from flask import Flask, json, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from passlib.hash import sha256_crypt
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from sqlalchemy import ForeignKey, text
import werkzeug
from werkzeug.utils import secure_filename
from flask_jwt_extended import (
    get_jwt, JWTManager, jwt_required,
    create_access_token, get_jwt_identity
)
from datetime import timedelta, datetime

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://shonuffenuff.github.io"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"])

api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

db = SQLAlchemy(app)
jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(identity):
    return int(identity)


@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    try:
        user_id = int(identity)
        user = User.query.get(user_id)
        if user:
            return {"username": user.username}
    except Exception:
        pass
    return {}

class User(db.Model):
    __tablename__ = 'username'
    __table_args__ = {'schema': 'public'}
    idusername = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    customer = db.relationship('Customer', backref='user', uselist=False)
    pets = db.relationship('Pets', backref='user', foreign_keys='Pets.idusername')

class Customer(db.Model):
    __tablename__ = 'customer'
    __table_args__ = {'schema': 'public'}
    idcustomer = db.Column(db.Integer, primary_key=True)
    idusername = db.Column(db.Integer, db.ForeignKey('public.username.idusername'), unique=True)
    first_name = db.Column(db.String(45), nullable=False)
    surname = db.Column(db.String(45), nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(45), nullable=False)
    postcode = db.Column(db.Integer, nullable=False)
    suburb = db.Column(db.String(45), nullable=False)

class Pets(db.Model):
    __tablename__ = 'pets'
    __table_args__ = {'schema': 'public'}
    petid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    idusername = db.Column(db.Integer, db.ForeignKey('public.username.idusername'))
    name = db.Column(db.String(45), nullable=False)
    breed = db.Column(db.String(45), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(45), nullable=False)
    photo = db.Column(db.LargeBinary, default=b'')

class Playdates(db.Model):
    __tablename__ = 'playdates'
    __table_args__ = {'schema': 'public'}
    playdatesid = db.Column(db.Integer, primary_key=True)
    customer1 = db.Column(db.String(45))
    c1id = db.Column(db.Integer)
    customer1pet = db.Column(db.String(45))
    customer2 = db.Column(db.String(45))
    c2id = db.Column(db.Integer)
    customer2pet = db.Column(db.String(45))
    time = db.Column(db.DateTime)
    status = db.Column(db.String(45))

user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, required=True, help='Username is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')

customer_parser = reqparse.RequestParser()
customer_parser.add_argument('first_name', type=str, required=True, help='First name is required')
customer_parser.add_argument('surname', type=str, required=True, help='Surname is required')
customer_parser.add_argument('phone', type=int, required=True, help='Phone number is required')
customer_parser.add_argument('email', type=str, required=True, help='Email is required')
customer_parser.add_argument('postcode', type=int, required=True, help='Postcode is required')
customer_parser.add_argument('suburb', type=str, required=True, help='Suburb is required')

pet_parser = reqparse.RequestParser()
pet_parser.add_argument('idusername', type=int, required=True, help='User ID is required')
pet_parser.add_argument('name', type=str, required=True, help='Pet name is required')
pet_parser.add_argument('breed', type=str, required=True, help='Pet breed is required')
pet_parser.add_argument('age', type=int, required=True, help='Pet age is required')
pet_parser.add_argument('gender', type=str, required=True, help='Pet gender is required')
pet_parser.add_argument('photo', type=werkzeug.datastructures.FileStorage, location='files')

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
            new_customer = Customer(
                idusername=user_id,
                first_name=data['first_name'],
                surname=data['surname'],
                phone=data['phone'],
                email=data['email'],
                postcode=data['postcode'],
                suburb=data['suburb']
            )
            db.session.add(new_customer)
            db.session.commit()
            return {'message': 'Customer data added successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error adding customer data to the database'}, 500

class PetRegistration(Resource):
    def post(self):
        if 'photo' in request.files and request.headers['Content-Type'].startswith('multipart/form-data'):
            idusername = request.form.get('idusername')
            new_pet = Pets(
                idusername=idusername,
                name=request.form.get('name'),
                breed=request.form.get('breed'),
                age=request.form.get('age'),
                gender=request.form.get('gender'),
                photo=request.files['photo'].read()
            )
            db.session.add(new_pet)
            db.session.commit()
            return {'message': 'Pet data added successfully'}, 201
        elif request.headers['Content-Type'] == 'application/json':
            data = request.json
            new_pet = Pets(
                idusername=data['idusername'],
                name=data['name'],
                breed=data['breed'],
                age=data['age'],
                gender=data['gender'],
                photo=None
            )
            db.session.add(new_pet)
            db.session.commit()
            return {'message': 'Pet data added successfully'}, 201
        else:
            return {'error': 'Unsupported Content-Type'}, 415

class PetList(Resource):
    def get(self):
        selected_gender = request.args.get('gender', 'all', type=str)
        selected_age = request.args.get('age', 'all', type=str)
        selected_breed = request.args.get('breed', 'all', type=str)
        pets_query = Pets.query
        if selected_gender != 'all':
            pets_query = pets_query.filter_by(gender=selected_gender)
        if selected_age != 'all':
            try:
                age_int = int(selected_age)
                pets_query = pets_query.filter_by(age=age_int)
            except ValueError:
                pass
        if selected_breed != 'all':
            pets_query = pets_query.filter_by(breed=selected_breed)
        pets_query = pets_query.add_columns(Pets.idusername)
        pets = pets_query.all()
        pet_data = []
        for pet, idusername in pets:
            pet_entry = {
                'petid': pet.petid,
                'name': pet.name,
                'breed': pet.breed,
                'age': pet.age,
                'gender': pet.gender,
                'photo': None,
                'idusername': idusername
            }
            if pet.photo:
                with io.BytesIO(pet.photo) as binary_stream:
                    pet_entry['photo'] = base64.b64encode(binary_stream.read()).decode()
            pet_data.append(pet_entry)
        return jsonify(pet_data)

@app.route('/user-profile/<int:idusername>', methods=['GET'])
@jwt_required()
def user_profile(idusername):
    print("Authorization header in user_profile:", request.headers.get("Authorization"))
    current_user = get_jwt_identity()
    print("get_jwt_identity() ->", current_user, "type:", type(current_user))

    if not isinstance(current_user, int):
        try:
            current_user = int(current_user)
        except Exception as e:
            print("Identity casting error:", e)
            return {"message": "Invalid token identity"}, 422

    if current_user != idusername:
        return {"message": "Unauthorized"}, 403

    user = User.query.filter_by(idusername=idusername).first()
    if not user:
        return {"message": "User not found"}, 404

    pets = Pets.query.filter_by(idusername=idusername).all()

    user_data = {
        "username": user.username,
        "pets": []
    }

    for pet in pets:
        pet_dict = {
            "name": pet.name,
            "breed": pet.breed,
            "age": pet.age,
            "gender": pet.gender,
            "photo": None,
            "photo_url": None
        }

        if pet.photo:
            with io.BytesIO(pet.photo) as binary_stream:
                encoded = base64.b64encode(binary_stream.read()).decode()
                pet_dict["photo"] = encoded

        user_data["pets"].append(pet_dict)

    return jsonify(user_data)






class UserLogin(Resource):
    def post(self):
        data = user_parser.parse_args()
        username = data['username']
        password = data['password']
        user = User.query.filter_by(username=username).first()
        if not user or not sha256_crypt.verify(password, user.password):
            return {'message': 'Invalid username or password'}, 401
        access_token = create_access_token(identity=user.idusername)
        return {
            'message': 'Login successful',
            'access_token': access_token,
            'idusername': user.idusername,
            'username': user.username
        }, 200

@app.route('/api/get_playdates/<int:idusername>', methods=['GET'])
@jwt_required()
def get_playdates(idusername):
    print("Authorization header in get_playdates:", request.headers.get("Authorization"))
    current_user = get_jwt_identity()
    print("get_jwt_identity() ->", current_user, "type:", type(current_user))

    if not isinstance(current_user, int):
        try:
            current_user = int(current_user)
        except Exception as e:
            print("Identity casting error:", e)
            return {"message": "Invalid token identity"}, 422

    if current_user != idusername:
        return {"message": "Unauthorized"}, 403

    playdates = Playdates.query.filter_by(idusername=idusername).all()
    playdate_data = []

    for playdate in playdates:
        playdate_dict = {
            "date": playdate.date.isoformat() if playdate.date else None,
            "location": playdate.location,
            "description": playdate.description,
        }
        playdate_data.append(playdate_dict)

    return jsonify(playdate_data)


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
            db.session.execute(query)
        except Exception as e:
            print(f'Database connection error: {str(e)}')
    app.run(host='0.0.0.0', port=5000, debug=False)
