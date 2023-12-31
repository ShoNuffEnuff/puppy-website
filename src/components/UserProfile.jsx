import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'; // Import Alert
import './UserProfile.css';

const UserProfile = ({ idusername, isLoggedIn, keyProp }) => {
    const [user, setUser] = useState({ username: '' });
    const [userPets, setUserPets] = useState([]);
    const [playdates, setPlaydates] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // New state for the alert

    // Use a useRef to store the isLoggedIn value
    const isLoggedInRef = useRef(isLoggedIn);

    // Update the ref whenever isLoggedIn changes
    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);

    // Retrieve user profile data from local storage on component mount
    useEffect(() => {
        const userProfileData = localStorage.getItem('userProfileData');
        if (userProfileData) {
            const parsedData = JSON.parse(userProfileData);
            setUser(parsedData.user);
            setUserPets(parsedData.pets);
        }
    }, []);

    // Function to show/hide the alert for pending playdates
    const toggleAlert = (isVisible) => {
        setShowAlert(isVisible);
    };

    // Fetch user data from the server and save it to local storage
    const fetchUserData = useCallback(async () => {
        // Use the ref instead of directly using isLoggedIn
        if (!isLoggedInRef.current || !idusername) {
            return;
        }

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Unauthorized access');
                return;
            }

            const response = await axios.get(`http://localhost:5000/user-profile/${idusername}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const userdata = response.data;
                setUser({ username: userdata.username });
                setUserPets(userdata.pets);

                // Save user profile data in local storage with the same key
                const userProfileData = JSON.stringify({ user: { username: userdata.username }, pets: userdata.pets });
                localStorage.setItem('userProfileData', userProfileData);
            } else if (response.status === 401) {
                console.error('Token expired or invalid');
            } else {
                console.error('Error fetching user data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [idusername]);

    // Fetch playdates data from the server when the component mounts
    const fetchPlaydates = useCallback(() => {
        if (isLoggedIn) {
            axios.get(`http://localhost:5000/api/get_playdates/${idusername}`)
                .then((response) => {
                    console.log('Fetched Playdates:', response.data);
                    setPlaydates(response.data);

                    // Check for pending playdates and show/hide the alert
                    const hasPendingPlaydates = response.data.some(playdate => playdate.status !== 'accepted' && playdate.status !== 'declined');
                    toggleAlert(hasPendingPlaydates);
                })
                .catch((error) => {
                    console.error('Error fetching playdates:', error);
                });
        }
    }, [idusername, isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
            fetchPlaydates(); // Fetch playdates when the component mounts
        }
    }, [showProfile, isLoggedIn, fetchUserData, fetchPlaydates]);

    // Reset user, userPets, and playdates state when keyProp changes
    useEffect(() => {
        setUser({ username: '' });
        setUserPets([]);
        setPlaydates([]);
    }, [keyProp]);

    const handleShow = () => {
        setShowProfile(true);
    };

    const handleClose = () => setShowProfile(false);

    // Function to update the playdate status
    const updatePlaydateStatus = (playdateId, newStatus) => {
        // Send a request to update the playdate status
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Unauthorized access');
            return;
        }

        axios.put(`http://localhost:5000/update_playdate_status/${playdateId}`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // Update the playdates state with the updated status
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
                                    src={`data:image/jpeg;base64,${pet.photo}`}
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

export default UserProfile;
