import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
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
import petplusLogo from './pages/petplus_logo.png';
import Image from 'react-bootstrap/Image';

function App() {
    // State Variable for Login Status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);
    const [keyProp, setKeyProp] = useState(0);
    const [userPets, setUserPets] = useState([]);
    const [showToast, setShowToast] = useState(false); 
    const [toastMessage, setToastMessage] = useState('');
    const [backgroundClasses, setBackgroundClasses] = useState(['bg-cat', 'bg-dog', 'bg-both', 'bg-default']);
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);


    // Function to handle background change
    const handleBackgroundChange = (index) => {
        setCurrentBackgroundIndex(index);
    };



    // Pass isLoggedIn State
    const handleLogin = (formData) => {
        /*handleLoginAPI(formData);*/
        setIsLoggedIn(true);
    };

    // Pass isLoggedIn State
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // Pass the key
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
                    {/* Bootstrap Dropdown for Background */}
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
                    {/* End of Background Dropdown */}
                    <NaviBar  isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} setIdUsername={setIdUsername} setShowToast={setShowToast} setToastMessage={setToastMessage} changeKey={changeKey} setIsLoggedIn={setIsLoggedIn} showToast={showToast} toastMessage={toastMessage} idusername={idusername} keyProp={keyProp} userPets={userPets} setUserPets={setUserPets } />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
                <div>
                {/*<RegistrationForm />*/}
                {/*<UserProfile isLoggedIn={isLoggedIn} idusername={idusername} setIdUsername={setIdUsername} keyProp={keyProp} userPets={userPets} />*/}
                {/*<PetGroupCard />*/}
                    {/*<LoginForm onLogin={handleLogin} isLoggedIn={isLoggedIn} setIdUsername={setIdUsername} onLogout={handleLogout} changeKey={changeKey} />*/}
                </div>

            </div>
        </Router>
        </div>
    );
}

export default App;
