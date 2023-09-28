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

function App() {
    // State Variable for Login Status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);
    const [keyProp, setKeyProp] = useState(0);
    const [userPets, setUserPets] = useState([]);

    // Pass isLoggedIn State
    const handleLogin = () => {
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
        <Router>
            <div>
                <h1>Pet + Veterinary Services</h1>
                <NaviBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
                <div>
                <RegistrationForm />
                <UserProfile isLoggedIn={isLoggedIn} idusername={idusername} setIdUsername={setIdUsername} keyProp={keyProp} userPets={userPets} />
                <PetGroupCard />
                    <LoginForm onLogin={handleLogin} isLoggedIn={isLoggedIn} setIdUsername={setIdUsername} onLogout={handleLogout} changeKey={changeKey} />
                </div>
            </div>
        </Router>

    );
}

export default App;
