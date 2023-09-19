import React, { useState, useCallback, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const UserProfile = ({ idusername, isLoggedIn }) => {
    const [user, setUser] = useState({ username: '' });
    const [pets, setPets] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    // Use a useRef to store the isLoggedIn value
    const isLoggedInRef = useRef(isLoggedIn);

    // Update the ref whenever isLoggedIn changes
    useEffect(() => {
        isLoggedInRef.current = isLoggedIn;
    }, [isLoggedIn]);

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
                const data = response.data;
                setUser({ username: data.username });
                setPets(data.pets);
                console.log('Frontend - Pet Photo Data:', data.pets);
            } else if (response.status === 401) {
                console.error('Token expired or invalid');
            } else {
                console.error('Error fetching user data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }, [idusername]);

    useEffect(() => {
        if (showProfile) {
            fetchUserData();
        }
    }, [showProfile, fetchUserData]);

    const handleShow = () => {
        setShowProfile(true);
    };

    const handleClose = () => setShowProfile(false);

    return (
        <>
            <button className="btn btn-primary" onClick={handleShow}>
                Open User Profile
            </button>

            <Offcanvas show={showProfile} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>User Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h2>Welcome, {user.username}</h2>
                    <h3>Your Pets</h3>
                    <div className="d-flex flex-wrap">
                        {pets.map((pet) => (
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
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default UserProfile;
