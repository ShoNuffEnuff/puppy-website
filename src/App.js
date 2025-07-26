import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import PetGroupCard from './components/PetGroupCard';
import UserProfile from './components/UserProfile';
import NaviBar from './components/NaviBar';
import DatePicker from './components/DatePicker';
import './App.css';
import petplusLogo from './finalLogo.png';
import Image from 'react-bootstrap/Image';
import './components/RegistrationForm.css';
import { jwtDecode } from "jwt-decode";

function App() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);
    const [username, setUsername] = useState('');
    const [keyProp, setKeyProp] = useState(0);
    const [userPets, setUserPets] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [backgroundClasses, setBackgroundClasses] = useState(['default-background','cat-background', 'dog-background', 'both-background' ]);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const fetchUserPets = async (idusername) => {
      try {
        const token = localStorage.getItem('access_token');

        const userId = Number(idusername);

        const res = await fetch(`${backendUrl}/user-profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUserPets(data.pets || []); 
        } else {
          console.error('Failed to fetch user profile:', res.status);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const handleBackgroundChange = (index) => {
        setCurrentBackgroundIndex(index);
    };

    const handleLogin = () => {
    setIsLoggedIn(true);
    const token = localStorage.getItem('access_token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const id = decoded.idusername;  
            const name = decoded.username;

            if (id !== undefined) {
                const numericId = Number(id);
                setIdUsername(numericId);
                fetchUserPets(numericId);
            }
            if (name) {
                setUsername(name.toString());
            }
        } catch (err) {
            console.error("JWT decode failed on login:", err);
        }
    }
};


    const handleLogout = () => {
       localStorage.removeItem('access_token');
       localStorage.removeItem('userProfileData');
       localStorage.removeItem('idusername');
       localStorage.removeItem('username');

        setIsLoggedIn(false);
        setIdUsername(null);
        setUsername('');
        setUserPets([]);
        changeKey();
    };

    const changeKey = () => {
        setKeyProp(prevKey => prevKey + 1);
    };

    return (
        <div className={`background-div ${backgroundClasses[currentBackgroundIndex]}`}>
            <div>
                <Image src={petplusLogo} className="custom-logo" alt="Logo" />
            </div>
            <Router>
                <div>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="backgroundDropdown"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Change Background
                        </button>
                        <div className="dropdown-menu" aria-labelledby="backgroundDropdown">
                            {backgroundClasses.map((bgClass, index) => (
                                <button
                                    key={index}
                                    className={`dropdown-item ${currentBackgroundIndex === index ? 'active' : ''}`}
                                    onClick={() => handleBackgroundChange(index)}
                                >
                                    {bgClass}
                                </button>
                            ))}
                        </div>
                    </div>

                    <NaviBar
                      isLoggedIn={isLoggedIn}
                      onLogin={handleLogin}
                      onLogout={handleLogout}
                      setIdUsername={setIdUsername}
                      setShowToast={setShowToast}
                      setToastMessage={setToastMessage}
                      changeKey={changeKey}
                      setIsLoggedIn={setIsLoggedIn}
                      showToast={showToast}
                      toastMessage={toastMessage}
                      idusername={idusername}
                      username={username}
                      keyProp={keyProp}
                      userPets={userPets}
                      setUserPets={setUserPets}
                      backgroundClasses={backgroundClasses}
                      currentBackgroundIndex={currentBackgroundIndex}
                      backendUrl={backendUrl}
                    />
                    {isLoggedIn && (
  <UserProfile
    isLoggedIn={isLoggedIn}
    keyProp={keyProp}
  />
)}

                    <Routes>
                        <Route path="/" element={<Home backendUrl={backendUrl} />} />
                        <Route path="/staff" element={<Staff backendUrl={backendUrl} />} />
                        <Route path="/services" element={<Services backendUrl={backendUrl} />} />
                        <Route path="/contacts" element={<Contacts backendUrl={backendUrl} />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
