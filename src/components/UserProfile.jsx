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
  const [user, setUser] = useState({ idusername: null, username: '' });
  const [userPets, setUserPets] = useState([]);
  const [playdates, setPlaydates] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const isLoggedInRef = useRef(isLoggedIn);
  const [idusername, setIdUsername] = useState(null);

  const handleShow = () => setShowProfile(true);
  const handleClose = () => setShowProfile(false);

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn;
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);
        const idFromToken = Number(decoded.sub);
        if (!isNaN(idFromToken)) {
          setIdUsername(idFromToken);
        } else {
          setIdUsername(null);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIdUsername(null);
      }
    } else {
      setIdUsername(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const userProfileData = localStorage.getItem('userProfileData');
    const idFromStorage = localStorage.getItem('idusername');
    const usernameFromStorage = localStorage.getItem('username');

    if (userProfileData) {
      try {
        const parsedData = JSON.parse(userProfileData);
        const userFromData = parsedData.user || {};
        setUser({
          idusername: userFromData.idusername ?? (idFromStorage ? Number(idFromStorage) : null),
          username: userFromData.username || usernameFromStorage || ''
        });
        setUserPets(parsedData.pets || []);
      } catch {
        setUser({
          idusername: idFromStorage ? Number(idFromStorage) : null,
          username: usernameFromStorage || ''
        });
        setUserPets([]);
      }
    } else {
      setUser({
        idusername: idFromStorage ? Number(idFromStorage) : null,
        username: usernameFromStorage || ''
      });
      setUserPets([]);
    }
  }, []);

  const toggleAlert = (isVisible) => {
    setShowAlert(isVisible);
  };

  const fetchUserData = useCallback(async () => {
    console.log("fetchUserData called with idusername:", idusername);
    if (!isLoggedInRef.current || idusername === null) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(`${backendUrl}/user-profile/${idusername}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (response.status === 200) {
        const userdata = response.data;
        console.log("Fetched user data:", userdata);
        setUser({ idusername, username: userdata.username });
        setUserPets(userdata.pets);

        localStorage.setItem(
          'userProfileData',
          JSON.stringify({ user: { idusername, username: userdata.username }, pets: userdata.pets })
        );
        localStorage.setItem('idusername', idusername.toString());
        localStorage.setItem('username', userdata.username);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [idusername]);

  const fetchPlaydates = useCallback(() => {
    console.log("fetchPlaydates called with idusername:", idusername);
    if (!isLoggedInRef.current || idusername === null) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Unauthorized access');
      return;
    }

    axios.get(`${backendUrl}/api/get_playdates/${idusername}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
      .then((response) => {
        console.log("Fetched playdates:", response.data);
        setPlaydates(response.data);
        const hasPendingPlaydates = response.data.some(
          playdate => playdate.status !== 'accepted' && playdate.status !== 'declined'
        );
        toggleAlert(hasPendingPlaydates);
      })
      .catch((error) => {
        console.error('Error fetching playdates:', error);
      });
  }, [idusername]);

  useEffect(() => {
    if (isLoggedIn && idusername !== null) {
      console.log("Triggering fetchUserData and fetchPlaydates from showProfile/isLoggedIn effect");
      fetchUserData();
      fetchPlaydates();
    }
  }, [showProfile, isLoggedIn, idusername, fetchUserData, fetchPlaydates]);

  useEffect(() => {
    if (isLoggedInRef.current && showProfile) {
      console.log("Triggering fetchUserData and fetchPlaydates from keyProp effect");
      fetchUserData();
      fetchPlaydates();
    }
  }, [keyProp, fetchUserData, fetchPlaydates, showProfile]);

  const updatePlaydateStatus = (playdateId, newStatus) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Unauthorized access');
      return;
    }

    axios.put(`${backendUrl}/update_playdate_status/${playdateId}`, { status: newStatus }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
      .then(() => {
        const updatedPlaydates = playdates.map((playdate) => {
          if (playdate.playdatesid === playdateId) {
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

  // Logout to clear state and storage
  useEffect(() => {
    if (!isLoggedIn) {
      console.log("User is logged out, clearing local state and storage.");
      setUser({ idusername: null, username: '' });
      setUserPets([]);
      setPlaydates([]);
      setIdUsername(null);

      localStorage.removeItem('userProfileData');
      localStorage.removeItem('idusername');
      localStorage.removeItem('username');
      localStorage.removeItem('access_token');
    }
  }, [isLoggedIn]);

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
              <div key={playdate.playdatesid} className="card">
                <div className="card-body">
                  <h5 className="card-title">Playdate</h5>
                  <p className="card-text">{playdate.customer1}</p>
                  <p className="card-text">{playdate.customer1}'s Pet: {playdate.customer1pet}</p>
                  <p className="card-text">{playdate.customer2}</p>
                  <p className="card-text">{playdate.customer2}'s Pet: {playdate.customer2pet}</p>
                  <p className="card-text">Time: {playdate.time}</p>
                  <p className="card-text">Status: {playdate.status}</p>
                  <Form.Check
                    type="switch"
                    id={`switch-${playdate.playdatesid}`}
                    label={playdate.status}
                    checked={playdate.status === 'accepted' || playdate.status === 'neutral'}
                    onChange={(e) => {
                      let newStatus = 'neutral';
                      if (e.target.checked) {
                        newStatus = 'accepted';
                      } else {
                        newStatus = 'declined';
                      }
                      updatePlaydateStatus(playdate.playdatesid, newStatus);
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
