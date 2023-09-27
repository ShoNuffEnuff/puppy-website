import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';

const UserProfile = ({ idusername, isLoggedIn, keyProp }) => {
    const [user, setUser] = useState({ username: '' });
    const [userPets, setUserPets] = useState([]); // Renamed to userPets
    const [playdates, setPlaydates] = useState([]); // Added for playdates
    const [showProfile, setShowProfile] = useState(false);

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
            setUserPets(parsedData.pets); // Updated to setUserPets
        }
    }, []);

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
                setUserPets(userdata.pets); // Updated to setUserPets

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

    // Fetch playdates data from the server when the user logs in
    useEffect(() => {
        if (isLoggedIn) {
            axios.get(`http://localhost:5000/api/get_playdates/${idusername}`)
                .then((response) => {
                    setPlaydates(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching playdates:', error);
                });
        }
    }, [idusername, isLoggedIn]);

    useEffect(() => {
        if (showProfile && isLoggedIn) {
            fetchUserData();
        }
    }, [showProfile, isLoggedIn, fetchUserData]);

    // Reset user, userPets, and playdates state when keyProp changes
    useEffect(() => {
        setUser({ username: '' });
        setUserPets([]); // Updated to setUserPets
        setPlaydates([]);
    }, [keyProp]);

    const handleShow = () => {
        setShowProfile(true);
    };

    const handleClose = () => setShowProfile(false);

    return (
        <div key={keyProp}>
            <button className="btn btn-primary" onClick={handleShow}>
                Your Profile
            </button>

            <Offcanvas show={showProfile} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>User Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <h2>Welcome, {user.username}</h2>
                    <h3>Your Pets</h3>
                    <div className="d-flex flex-wrap">
                        {userPets.map((pet) => ( // Updated to use userPets
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
                                </div>
                            </div>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default UserProfile;
