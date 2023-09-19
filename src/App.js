import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import PetGroupCard from './components/PetGroupCard';
import UserProfile from './components/UserProfile';

function App() {
    // Step 1: Create a state variable to track the login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);

    // Step 1: Create a function to update the login status
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Header title="Soul taker industries" />
            <RegistrationForm />
            <LoginForm onLogin={handleLogin} isLoggedIn={isLoggedIn} setIdUsername={setIdUsername} />
            <h1>Soultaker App</h1>
            <UserProfile isLoggedIn={isLoggedIn} idusername={idusername} /> {/* Pass idusername */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contacts" element={<Contacts />} />
            </Routes>
            <PetGroupCard></PetGroupCard>
        </Router>
    );
}

export default App;
