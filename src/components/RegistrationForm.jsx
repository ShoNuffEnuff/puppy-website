import { useState } from 'react';
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
        setErrorToast(false);
        setErrorMessage('');
    };

    const handleShowModal = () => setShowModal(true);

    
    const registrationUrl = process.env.REACT_APP_API_BASE_URL || 'https://puppy-website.onrender.com';

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
            return;
        }

        if (!formData.pet_name || !formData.pet_breed || !formData.pet_age || !formData.pet_gender) {
            showErrorToast('Please fill in all required pet fields.');
            return;
        }

        const userData = {
            username: formData.username,
            password: formData.password,
        };

        try {
            const userResponse = await axios.post(`${registrationUrl}/register`, userData);
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

            await axios.post(`${registrationUrl}/register_customer`, customerData);

            const petData = new FormData();
            petData.append('idusername', user_id);
            petData.append('name', formData.pet_name);
            petData.append('breed', formData.pet_breed);
            petData.append('age', formData.pet_age);
            petData.append('gender', formData.pet_gender);
            petData.append('photo', formData.photo);

            await axios.post(`${registrationUrl}/register_pet`, petData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            showToastMessage('Registration Successful!');
            setTimeout(() => {
                handleCloseModal();
            }, 3000);
        } catch (error) {
            console.error(error.response?.data || error.message);
            if (error.response?.status === 400) {
                showErrorToast('User already exists.');
            } else {
                showErrorToast('An error occurred during registration. Please try again later.');
            }
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShowModal} className='custom-btn-Register'>Register</Button>

            <Modal className="dog-modal" size="sm" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-size">
                    <form>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} autoComplete="current-password" />
                        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                        <input type="text" name="surname" placeholder="Surname" onChange={handleChange} />
                        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                        <input type="text" name="suburb" placeholder="Suburb" onChange={handleChange} />
                        <input type="text" name="postcode" placeholder="Postcode" onChange={handleChange} />
                        <input type="text" name="pet_name" placeholder="Pet Name" onChange={handleChange} />
                        <input type="text" name="pet_breed" placeholder="Pet Breed" onChange={handleChange} />
                        <input type="text" name="pet_age" placeholder="Pet Age" onChange={handleChange} />
                        <select name="pet_gender" onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="file" name="photo" onChange={handlePhotoUpload} />
                    </form>
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
