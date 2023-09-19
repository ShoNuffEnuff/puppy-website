import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        surname: '',
        phone: '',
        email: '',
        postcode: '',
        pet_name: '',
        pet_breed: '',
        pet_age: '',
        pet_gender: '',
        photo: null, // Store the uploaded file
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData({ ...formData, photo: file });
        }
    };

    const registrationUrl = 'http://localhost:5000';

    const handleRegistration = async () => {
        // JSON Data (except photo)
        const userData = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const userResponse = await axios.post(`${registrationUrl}/register`, userData);
            console.log(userResponse.data);

            const user_id = userResponse.data.user_id;

            // JSON Data (except photo)
            const customerData = {
                first_name: formData.first_name,
                surname: formData.surname,
                phone: formData.phone,
                email: formData.email,
                postcode: formData.postcode,
                user_id: user_id,
            };

            const customerResponse = await axios.post(`${registrationUrl}/register_customer`, customerData);
            console.log(customerResponse.data);

            // Create a FormData object for the pet registration
            const petData = new FormData();
            petData.append('idusername', user_id);
            petData.append('name', formData.pet_name);
            petData.append('breed', formData.pet_breed);
            petData.append('age', formData.pet_age);
            petData.append('gender', formData.pet_gender);
            petData.append('photo', formData.photo); // Append the file object directly

            const petResponse = await axios.post(`${registrationUrl}/register_pet`, petData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                },
            });
            console.log(petResponse.data);

            // Handle the rest of your registration process
        } catch (error) {
            console.error(error.response.data);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            <form>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="surname"
                        placeholder="Last Name"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="postcode"
                        placeholder="Postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="pet_name"
                        placeholder="Pet Name"
                        value={formData.pet_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="pet_breed"
                        placeholder="Pet Breed"
                        value={formData.pet_breed}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="pet_age"
                        placeholder="Pet Age"
                        value={formData.pet_age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="pet_gender"
                        placeholder="Pet Gender"
                        value={formData.pet_gender}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                    />
                </div>
                <button type="button" onClick={handleRegistration}>Register User, Customer, and Pet</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
