import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { ToastContainer, Toast } from 'react-bootstrap';
import './DatePicker.css';
import Button from 'react-bootstrap/Button';

function Datepicker({ selectedPet, clearSelectedPet }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedUserPet, setSelectedUserPet] = useState('');
    const [datepickerUserPets, setDatepickerUserPets] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [playdates, setPlaydates] = useState([]);

    const backendUrl = 'https://puppy-website.onrender.com';

    const showToastError = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleBookPlaydate = () => {
        if (!selectedUserPet) {
            showToastError('Please select a pet before finalising the playdate.');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            showToastError('You must be logged in to book a playdate.');
            return;
        }

        const c1id = parseInt(localStorage.getItem('idusername'), 10);
        const c2id = parseInt(localStorage.getItem('selectedPetIdusername'), 10);

        if (!c1id || !c2id) {
            console.error('Customer IDs not found in local storage');
            return;
        }

        const customer1pet = datepickerUserPets.find((pet) => pet.name === selectedUserPet);
        const customer2pet = selectedPet;

        if (!customer1pet || !customer2pet) {
            console.error('Pet selection error');
            showToastError('Pet selection error.');
            return;
        }

        const formattedDate = selectedDate
            ? selectedDate.toISOString().slice(0, 19).replace('T', ' ')
            : null;

        const playdateData = {
            c1id,
            c2id,
            customer1petid: customer1pet.petid,
            customer2petid: customer2pet.petid,
            time: formattedDate,
            status: 'pending',
        };

        axios.post(`${backendUrl}/create_playdate/${c1id}/${c2id}`, playdateData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log('Playdate created successfully:', response.data);
            setToastMessage('Playdate booked successfully.');
            setShowToast(true);
            localStorage.removeItem('selectedPetIdusername');
            setSelectedDate(null);
            setSelectedUserPet('');
            clearSelectedPet();
        })
        .catch((error) => {
            console.error('Error creating playdate:', error);
            showToastError('Error creating playdate.');
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleUserPetChange = (event) => {
        setSelectedUserPet(event.target.value);
    };

    useEffect(() => {
        if (selectedPet && selectedPet.idusername) {
            localStorage.setItem('selectedPetIdusername', selectedPet.idusername);
        } else {
            localStorage.removeItem('selectedPetIdusername');
        }
    }, [selectedPet]);

    useEffect(() => {
        const userProfileData = localStorage.getItem('userProfileData');
        if (userProfileData) {
            const parsedData = JSON.parse(userProfileData);
            const userPets = parsedData.pets || [];
            setDatepickerUserPets(userPets);
        }

        const fetchPlaydates = async () => {
            const idusername = localStorage.getItem('idusername');
            const token = localStorage.getItem('access_token');

            if (!idusername || !token) {
                console.warn('Missing idusername or token for playdate fetch.');
                return;
            }

            try {
                const response = await axios.get(
                    `${backendUrl}/api/get_playdates/${idusername}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setPlaydates(response.data);
                console.log('Fetched playdates:', response.data);
            } catch (error) {
                console.error('Error fetching playdates:', error);
            }
        };

        fetchPlaydates();
    }, []);

    return (
        <div className="datepicker-container">
            <ToastContainer position="top-end" className="p-3">
                {showToast && (
                    <Toast
                        bg={toastMessage === 'success' ? 'success' : 'danger'}
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">
                                {toastMessage === 'success' ? 'Success' : 'Error'}
                            </strong>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                )}
            </ToastContainer>

            <h2>Select a Date, Time, and your Pet</h2>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={15}
                timeCaption="Time"
                placeholderText="Select a date and time"
            />

            {selectedDate && selectedPet && (
                <div>
                    <p>You selected: {selectedDate.toLocaleString()}</p>
                    <p>Pet Name: {selectedPet.name}</p>
                    <p>Breed: {selectedPet.breed}</p>
                    <p>Age: {selectedPet.age}</p>
                    <p>Gender: {selectedPet.gender}</p>
                </div>
            )}

            {datepickerUserPets.length > 0 && (
                <div>
                    <h3>Your Pets</h3>
                    <select value={selectedUserPet} onChange={handleUserPetChange}>
                        <option value="">Select a pet</option>
                        {datepickerUserPets.map((pet) => (
                            <option key={pet.petid} value={pet.name}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div id="finalise-playdate-container">
                <Button className="finalise-button" onClick={handleBookPlaydate}>
                    Finalise Playdate
                </Button>
            </div>
        </div>
    );
}

export default Datepicker;
