import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import './RegistrationForm.css';

const RegistrationForm = ({ backgroundClasses, currentBackgroundIndex, backgroundImages }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        first_name: '',
        surname: '',
        phone: '',
        email: '',
        suburb: '',
        postcode: '',
        pet_name: '',
        pet_breed: '',
        pet_age: '',
        pet_gender: '',
        photo: null,
    });

    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseModal = () => {
        setShowModal(false);
        // Reset error toast when the modal is closed
        setErrorToast(false);
        setErrorMessage('');
    };

    const handleShowModal = () => setShowModal(true);

    const registrationUrl = 'http://localhost:5000';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData({ ...formData, photo: file });
        }
    };

    const showToastMessage = (message) => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        setErrorMessage(message);
    };

    const showErrorToast = (message) => {
        setErrorToast(true);
        setErrorMessage(message);
    };

    const handleRegistration = async () => {
        // Validation checks for required user fields
        if (
            !formData.username ||
            !formData.password ||
            !formData.first_name ||
            !formData.surname ||
            !formData.email ||
            !formData.suburb ||
            !formData.phone ||
            !formData.postcode
        ) {
            showErrorToast('Please fill in all required user fields.');
            return; // Prevent registration if required fields are empty
        }

        // Validation checks for required pet fields
        if (!formData.pet_name || !formData.pet_breed || !formData.pet_age || !formData.pet_gender) {
            showErrorToast('Please fill in all required pet fields.');
            return; // Prevent registration if required pet fields are empty
        }

        const userData = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const userResponse = await axios.post(`${registrationUrl}/register`, userData);
            /*if (userResponse.status === 200) {*/
                console.log(userResponse.data);



            const user_id = userResponse.data.user_id;

            const customerData = {
                first_name: formData.first_name,
                surname: formData.surname,
                phone: formData.phone,
                email: formData.email,
                postcode: formData.postcode,
                suburb: formData.suburb,
                user_id: user_id,
            };

            const customerResponse = await axios.post(`${registrationUrl}/register_customer`, customerData);
            console.log(customerResponse.data);

            const petData = new FormData();
            petData.append('idusername', user_id);
            petData.append('name', formData.pet_name);
            petData.append('breed', formData.pet_breed);
            petData.append('age', formData.pet_age);
            petData.append('gender', formData.pet_gender);
            petData.append('photo', formData.photo);

            const petResponse = await axios.post(`${registrationUrl}/register_pet`, petData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(petResponse.data);

            showToastMessage('Registration Successful!');
            // Delay closing the modal for a few seconds to ensure the user sees the success message
            setTimeout(() => {
                handleCloseModal();
            }, 3000);


        /*}*/
        } catch (error) {
            console.error(error.response.data);
            if (error.response.status === 400) {
                showErrorToast('User already exists.');
            } else {
                showErrorToast('An error occurred during registration. Please try again later.');
            }
        }
    };

  

    return (
        <div >

            <Button variant="primary" onClick={handleShowModal} className='custom-btn-Register'>Register</Button>


            
            <Modal className="dog-modal" size="sm" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-size" >
                    <div >

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
                                    name="suburb"
                                    placeholder="Suburb"
                                    value={formData.suburb}
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
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button className="register-color" variant="primary" onClick={handleRegistration}>Register</Button>
                </Modal.Footer>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    style={{
                        position: 'bottom-left',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'green',
                        color: 'white',
                    }}
                    delay={5000}
                    autohide
                >
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>

                <Toast
                    show={errorToast}
                    onClose={() => setErrorToast(false)}
                    style={{
                        position: 'bottom-left',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'red',
                        color: 'white',
                    }}
                    delay={5000}
                    autohide
                >
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </Modal>

            
        </div>
    );
};

export default RegistrationForm;
