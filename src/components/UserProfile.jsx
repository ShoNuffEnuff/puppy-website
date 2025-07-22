import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { jwtDecode } from "jwt-decode";
import './UserProfile.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://puppy-website.onrender.com';

const UserProfile = ({ isLoggedIn, keyProp }) => {
    const [user, setUser] = useState({ username: '' });
    const [userPets, setUserPets] = useState([]);
    const [playdates, setPlaydates] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const isLoggedInRef = useRef(isLoggedIn);
    const [idusername, setIdUsername] = useState('');

    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);

    // Decode token and set idusername on mount or when login state changes
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const idFromToken = decoded.sub?.idusername;
                if (idFromToken) {
                    setIdUsername(decoded.idusername.toString());
                } else {
                    setIdUsername('');
                }
            } catch (error) {
                console.error('Invalid token:', error);
                setIdUsername('');
            }
        } else {
            setIdUsername('');
        }
    }, [isLoggedIn]);

    // You can keep this block to load cached profile data if you want
    useEffect(() => {
        const userProfileData = localStorage.getItem('userProfileData');
        const usernameFromStorage = localStorage.getItem('username');

        if (userProfileData) {
            const parsedData = JSON.parse(userProfileData);
            setUser(parsedData.user || { username: usernameFromStorage || '' });
            setUserPets(parsedData.pets || []);
        } else if (usernameFromStorage) {
            setUser({ username: usernameFromStorage });
        }
    }, []);

    const toggleAlert = (isVisible) => {
        setShowAlert(isVisible);
    };

    const fetchUserData = useCallback(async () => {
        if (!isLoggedInRef.current || !idusername) {
            return;
        }

        try {
            const userId = Number(idusername);
            const response = await axios.get(`${backendUrl}/user-profile/${userId}`);

            if (response.status === 200) {
                const userdata = response.data;
                setUser({ username: userdata.username });
                setUserPets(userdata.pets);

                const userProfileData = JSON.stringify({ user: { username: userdata.username }, pets: userdata.pets });
                localStorage.setItem('userProfileData', userProfileData);
            } else {
                console.error('Error fetching user data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [idusername]);

    const fetchPlaydates = useCallback(() => {
        if (isLoggedInRef.current && idusername) {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Unauthorized access');
                return;
            }

            const userId = Number(idusername);

            axios.get(`${backendUrl}/api/get_playdates/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setPlaydates(response.data);

                    const hasPendingPlaydates = response.data.some(
                        playdate => playdate.status !== 'accepted' && playdate.status !== 'declined'
                    );
                    toggleAlert(hasPendingPlaydates);
                })
                .catch((error) => {
                    console.error('Error fetching playdates:', error);
                });
        }
    }, [idusername]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
            fetchPlaydates();
        }
    }, [showProfile, isLoggedIn, fetchUserData, fetchPlaydates]);

    useEffect(() => {
        setUser({ username: '' });
        setUserPets([]);
        setPlaydates([]);
    }, [keyProp]);

    const handleShow = () => setShowProfile(true);
    const handleClose = () => setShowProfile(false);

    const updatePlaydateStatus = (playdateId, newStatus) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Unauthorized access');
            return;
        }

        axios.put(`${backendUrl}/update_playdate_status/${playdateId}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            const updatedPlaydates = playdates.map((playdate) => {
                if (playdate.id === playdateId) {
                    return { ...playdate, status: newStatus };
                }
                return playdate;
            });
            setPlaydates(updatedPlaydates);
        })
        .catch((error) => {
            console.error('Error updating playdate status:', error);
        });
    };

    return (
        <div key={keyProp}>
            <Button className="custom-btn-Profile" onClick={handleShow}>
                Profile
            </Button>

            <Offcanvas show={showProfile} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>User Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="user-bg">
                    <h2>Welcome, {user.username}</h2>
                    <h3>Your Pets</h3>
                    <div className="d-flex flex-wrap">
                        {userPets.map((pet) => (
                            <Card key={pet.name} style={{ width: '15rem', margin: '10px' }}>
                                <Card.Img
                                    variant="top"
                                    src={pet.photo ? `data:image/jpeg;base64,${pet.photo}` : undefined}
                                    alt={pet.name}
                                />
                                <Card.Body>
                                    <Card.Title>{pet.name}</Card.Title>
                                    <Card.Text>
                                        Breed: {pet.breed}<br />
                                        Age: {pet.age} years<br />
                                        Gender: {pet.gender}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    <h4>Your Play Dates</h4>
                    <div className="card-deck">
                        {playdates.map((playdate) => (
                            <div key={playdate.id} className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Playdate</h5>
                                    <p className="card-text"> {playdate.customer1}</p>
                                    <p className="card-text"> {playdate.customer1}'s Pet: {playdate.customer1pet}</p>
                                    <p className="card-text"> {playdate.customer2}</p>
                                    <p className="card-text"> {playdate.customer2}'s Pet: {playdate.customer2pet}</p>
                                    <p className="card-text">Time: {playdate.time}</p>
                                    <p className="card-text">Status: {playdate.status}</p>
                                    <Form.Check
                                        type="switch"
                                        id={`switch-${playdate.id}`}
                                        label={playdate.status}
                                        checked={playdate.status === 'accepted' || playdate.status === 'neutral'}
                                        onChange={(e) => {
                                            let newStatus = 'neutral';

                                            if (e.target.checked) {
                                                newStatus = 'accepted';
                                            } else if (!e.target.checked) {
                                                newStatus = 'declined';
                                            }

                                            updatePlaydateStatus(playdate.id, newStatus);
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {showAlert && (
                <Alert variant="success" className="user-alert" onClose={() => toggleAlert(false)} dismissible>
                    You have pending playdates in your profile
                </Alert>
            )}
        </div>
    );
};

UserProfile.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    keyProp: PropTypes.number,
};

UserProfile.defaultProps = {
    keyProp: 0,
};

export default UserProfile;
