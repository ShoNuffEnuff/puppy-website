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

function App() {
    // State Variable for Login Status
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [idusername, setIdUsername] = useState(null);
    const [keyProp, setKeyProp] = useState(0);
    const [userPets, setUserPets] = useState([]);
    const [showToast, setShowToast] = useState(false); 
    const [toastMessage, setToastMessage] = useState(''); 


    //// Function to handle login API call
    //const handleLoginAPI = async (formData) => {
    //    try {
    //        const response = await axios.post('http://localhost:5000/login', formData);
    //        console.log('Login response:', response.data);

    //        // Handle the response and update state as needed
    //        // Example: Update isLoggedIn and idusername state
    //        setIsLoggedIn(true);
    //        setIdUsername(response.data.idusername);

    //        // Perform other actions after successful login
    //        // ...

    //    } catch (error) {
    //        console.error('Login error:', error.response.data);
    //    }
    //};

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
        <body className="background-div">
        <Router>
            <div>
                <h1>Pet + Veterinary Services</h1>
                    <NaviBar isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} setIdUsername={setIdUsername} setShowToast={setShowToast} setToastMessage={setToastMessage} changeKey={changeKey} setIsLoggedIn={setIsLoggedIn} showToast={showToast} toastMessage={toastMessage} idusername={idusername} keyProp={keyProp} userPets={userPets} setUserPets={setUserPets } />
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
        </body>
    );
}

export default App;
