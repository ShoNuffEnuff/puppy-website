import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, Toast } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './RegistrationForm';
import UserProfile from './UserProfile';
import PetGroupCard from './PetGroupCard';
import './NaviBar.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://puppy-website.onrender.com';

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
    username,
    keyProp,
    userPets,
    userProfileData,
    token,
    backgroundClasses,
    currentBackgroundIndex,
}) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded JWT token:', decoded);

                let idusernameFromToken;
                let usernameFromToken;

                const sub = decoded.sub;
                if (typeof sub === 'object' && sub !== null && 'sub' in sub && 'username' in sub) {
                    idusernameFromToken = Number(sub.sub);
                    usernameFromToken = sub.username;
                } else if (typeof sub === 'number') {
                    idusernameFromToken = sub;
                    usernameFromToken = decoded.username || localStorage.getItem('username') || '';
                } else {
                    throw new Error('Malformed token payload');
                }

                setIdUsername(idusernameFromToken);
                setIsLoggedIn(Boolean(idusernameFromToken && usernameFromToken));
            } catch (error) {
                console.error('Invalid token:', error);
                setIsLoggedIn(false);
                setIdUsername('');
            }
        } else {
            setIsLoggedIn(false);
            setIdUsername('');
        }
    }, [setIdUsername, setIsLoggedIn]);

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

    if (!formData.username || !formData.password) {
        handleShowToast('Username and password are required.', 'error');
        return;
    }

    try {
        const response = await axios.post(`${backendUrl}/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        const { access_token } = response.data;

        if (!access_token) {
            console.error('No token returned from login');
            return;
        }

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('isLoggedIn', 'true');

        const decoded = jwtDecode(access_token);
        const idusernameFromToken = Number(decoded.idusername);
        const usernameFromToken = decoded.username;

        localStorage.setItem("idusername", idusernameFromToken.toString());
        localStorage.setItem('username', usernameFromToken);

        setIdUsername(idusernameFromToken);
        setIsLoggedIn(true);

        handleShowToast('Login successful.', 'success');
        onLogin({ idusername: idusernameFromToken, username: usernameFromToken });
    } catch (error) {
        console.error('Login error:', error);
        handleShowToast('Login failed.', 'error');
    }
};


    const handleLogoutClick = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('idusername');
        localStorage.removeItem('username');

        setIdUsername('');
        setIsLoggedIn(false);
        changeKey();
        onLogout();
    };

    return (
        <div>
            <Navbar expand="sm" className="custom-nav-bar">
                <Container className="custNavTest">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="navbarFixes">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/" className="homeLink">Home</Nav.Link>
                                <Nav.Link as={Link} to="/staff" className="staffLink">Staff</Nav.Link>
                                <Nav.Link as={Link} to="/services" className="servicesLink">Services</Nav.Link>
                                <Nav.Link as={Link} to="/contacts" className="contactsLink">Contacts</Nav.Link>
                            </Nav>

                            {isLoggedIn ? (
                                <div className="d-flex">
                                    <UserProfile
                                        isLoggedIn={isLoggedIn}
                                        idusername={idusername}
                                        username={username}
                                        setIdUsername={setIdUsername}
                                        keyProp={keyProp}
                                        userPets={userPets}
                                        userProfileData={userProfileData}
                                        token={localStorage.getItem('access_token')}
                                    />
                                    <PetGroupCard token={localStorage.getItem('access_token')} />
                                    <Button onClick={handleLogoutClick} className="custom-btn-Logout">Logout</Button>
                                </div>
                            ) : (
                                <Form onSubmit={handleSubmit} className="d-flex">
                                    <InputGroup>
                                        <Form.Control
                                            className="usernameContainer"
                                            placeholder="Username"
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            name="username"
                                            autoComplete="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <Form.Control
                                            className="passwordStyle"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            autoComplete="current-password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                    <Button type="submit" className="custom-btn-Login">Login</Button>
                                    <RegistrationForm
                                        backgroundClasses={backgroundClasses}
                                        currentBackgroundIndex={currentBackgroundIndex}
                                    />
                                </Form>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer position="top-end">
                {showToast && (
                    <Toast
                        bg={showToast === 'success' ? 'success' : 'danger'}
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                    >
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

NaviBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    setShowToast: PropTypes.func.isRequired,
    setToastMessage: PropTypes.func.isRequired,
    setIdUsername: PropTypes.func.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
    changeKey: PropTypes.func.isRequired,
    showToast: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    toastMessage: PropTypes.string,
    idusername: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string,
    keyProp: PropTypes.number,
    userPets: PropTypes.array,
    userProfileData: PropTypes.object,
    token: PropTypes.string,
    backgroundClasses: PropTypes.arrayOf(PropTypes.string),
    currentBackgroundIndex: PropTypes.number,
};

export default NaviBar;
