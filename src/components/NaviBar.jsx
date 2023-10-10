import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import petplusLogo from './petplus_logo.png';
import axios from 'axios';
import { ToastContainer, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './RegistrationForm';
import UserProfile from './UserProfile';
import PetGroupCard from './PetGroupCard';
import './NaviBar.css';

function NaviBar({
    isLoggedIn,
    onLogin,
    onLogout,
    setShowToast,
    setToastMessage,
    setIdUsername,
    setIsLoggedIn,
    changeKey,
    showToast,
    toastMessage,
    idusername,
    keyProp,
    userPets,
    userProfileData,
    token,
}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedIdUsername = localStorage.getItem('idUsername');
        if (storedIsLoggedIn === 'true') {
            setIdUsername(storedIdUsername);
        }
    }, [setIdUsername]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowToast = (message, type) => {
        setToastMessage(message);
        setShowToast(type);
        setTimeout(() => {
            setShowToast(false);
            setToastMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if username or password is empty
        if (!formData.username || !formData.password) {
            handleShowToast('Username and password are required.', 'error');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response || !response.data || !response.data.access_token) {
                console.error('No valid token received in the response');
                return;
            }

            localStorage.setItem('access_token', response.data.access_token);
            const idUsername = response.data.idusername;
            setIdUsername(idUsername);
            // Store isLoggedIn and idUsername in local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('idUsername', idUsername);

            handleShowToast('Login successful.', 'success');
            onLogin();
        } catch (error) {
            console.error('Login error:', error);
            handleShowToast('Login failed.', 'error');
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('idUsername');
        localStorage.removeItem('userProfileData');

        setIdUsername('');
        setIsLoggedIn(false);
        changeKey();
        onLogout();
    };

    return (
        <div>
            <Navbar expand="sm" className='custom-nav-bar'>
                <Container>
                    {/*<Navbar.Brand as={Link} to="/">
                        <Image src={petplusLogo} className="custom-logo" alt="Logo" />}
    </Navbar.Brand>*/}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/staff">
                                Staff
                            </Nav.Link>
                            <Nav.Link as={Link} to="/services">
                                Services
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contacts">
                                Contacts
                            </Nav.Link>
                        </Nav>
                        {isLoggedIn ? (
                            <div className="d-flex">
                                <UserProfile
                                    isLoggedIn={isLoggedIn}
                                    idusername={idusername}
                                    setIdUsername={setIdUsername}
                                    keyProp={keyProp}
                                    userPets={userPets}
                                    userProfileData={userProfileData}
                                    token={token}
                                />
                                <PetGroupCard />
                                <Button onClick={handleLogoutClick} className="custom-btn-Logout">Logout</Button>
                            </div>
                        ) : (
                            <Form onSubmit={handleSubmit} className="d-flex">
                                <InputGroup>
                                    <Form.Control
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        className="passwordStyle"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" className="custom-btn-Login">
                                        Login
                                    </Button>
                                </InputGroup>
                                <RegistrationForm />
                            </Form>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer position="top-end">
                {showToast && (
                    <Toast bg={showToast === 'success' ? 'success' : 'danger'} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{showToast === 'success' ? 'Success' : 'Error'}</strong>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
        </div>
    );
}
export default NaviBar;
