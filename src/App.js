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
        <Router>
            {/*<Header title="Soul taker industries" />*/}
            
            
            <h1>Pets N' Shit</h1>
            <UserProfile isLoggedIn={isLoggedIn} idusername={idusername} setIdUsername={setIdUsername} keyProp={keyProp}  /> 
            <NaviBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Staff" element={<About />} />
                <Route path="/Services" element={<Services />} />
                <Route path="/Contacts" element={<Contacts />} />
                </Routes>
            </NaviBar>
            <RegistrationForm />
            <LoginForm onLogin={handleLogin} isLoggedIn={isLoggedIn} setIdUsername={setIdUsername} onLogout={handleLogout} changeKey={changeKey} />
            {/*<DatePicker></DatePicker>*/}
            <PetGroupCard></PetGroupCard>
        </Router>
    );
}

export default App;
