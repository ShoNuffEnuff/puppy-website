import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, Toast } from 'react-bootstrap';

const LoginForm = ({ onLogin, onLogout, idusername, setIdUsername, changeKey }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedIdUsername = localStorage.getItem('idUsername');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
            setIdUsername(storedIdUsername);
        }
    }, [setIdUsername]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogout = () => {
        // Clear the JWT, isLoggedIn state, and idUsername from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('idUsername');
        localStorage.removeItem('userProfileData');

        // Clear the idUsername state
        setIdUsername('');

        // Set isLoggedIn to false
        setIsLoggedIn(false);

        // Call the changeKey function to trigger the key change
        changeKey();
        onLogout();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('Login response:', response.data);

            if (!response.data.access_token) {
                console.error('No token received in the response');
                return;
            }

            localStorage.setItem('access_token', response.data.access_token);

            console.log('Token stored in local storage:', response.data.access_token);

            const idUsername = response.data.idusername;
            setIdUsername(idUsername);

            setIsLoggedIn(true);

            // Store isLoggedIn and idUsername in local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUsername', idUsername);

            // Set the toast message and show the toast
            setToastMessage('Login successful.');
            setShowToast(true);

            onLogin();
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div>
            <ToastContainer position="top-end" className="p-3">
                {showToast && (
                    <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>

            {isLoggedIn ? (
                <div>
                    <button className="btn btn-danger" onClick={() => handleLogout()}>
                        Logout
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
