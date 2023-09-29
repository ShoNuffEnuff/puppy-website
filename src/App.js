import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import About from './pages/Staff';
import Services from './pages/Services';
import Contacts from './pages/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Header from './components/Header';
import PetGroupCard from './components/PetGroupCard';
import UserProfile from './components/UserProfile';
import NaviBar from './components/NaviBar';
import DatePicker from './components/DatePicker';
import './App.css';



function App() {
    // State Variable for Login Status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);
    const [keyProp, setKeyProp] = useState(0);

    //Pass isLoggedIn State
    const handleLogin = () => {
        setIsLoggedIn(true);
        
    };
    //Pass isLoggedIn State
    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    //Pass the key
    const changeKey = () => {
        setKeyProp(prevKey => prevKey + 1); 
    };

    return (
        <div class="background-div">
        <Router>
            <Header title="Soul taker industries" />
            <NaviBar></NaviBar>
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
        </div>
    );
}

export default App;
