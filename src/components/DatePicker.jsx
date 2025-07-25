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

        const customer1Id = localStorage.getItem('idUsername');
        const customer2Id = localStorage.getItem('selectedPetIdusername');

        if (!customer1Id || !customer2Id) {
            console.error('Customer IDs not found in local storage');
            return;
        }

        axios.get(`${backendUrl}/get_customer_data/${customer1Id}`)
            .then((response1) => {
                const customer1Data = response1.data;
                axios.get(`${backendUrl}/get_customer_data2/${customer2Id}`)
                    .then((response2) => {
                        const customer2Data = response2.data;
                        const formattedDate = selectedDate
                            ? selectedDate.toISOString().slice(0, 19).replace('T', ' ')
                            : null;

                        const playdateData = {
                            idusername1: customer1Data.idusername,
                            idusername2: customer2Data.idusername,
                            customer1: { first_name: customer1Data.first_name },
                            customer2: { first_name: customer2Data.first_name },
                            customer1pet: { ...selectedPet },
                            customer2pet: {
                                ...datepickerUserPets.find((pet) => pet.name === selectedUserPet),
                            },
                            time: formattedDate,
                            status: 'pending',
                        };

                        axios.post(`${backendUrl}/create_playdate/${customer1Data.idusername}/${customer2Data.idusername}`, playdateData)
                            .then((response3) => {
                                console.log('Playdate created successfully:', response3.data);
                                setToastMessage('Playdate booked successfully.');
                                setShowToast(true);
                                localStorage.removeItem('selectedPetIdusername');
                            })
                            .catch((error3) => {
                                console.error('Error creating playdate:', error3);
                            });
                    })
                    .catch((error2) => {
                        console.error('Error fetching customer 2 data:', error2);
                    });
            })
            .catch((error) => {
                console.error('Error fetching customer 1 data:', error);
            });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleUserPetChange = (event) => {
        const selectedPetName = event.target.value;
        setSelectedUserPet(selectedPetName);
    };

    useEffect(() => {
        const userProfileData = localStorage.getItem('userProfileData');
        if (userProfileData) {
            const parsedData = JSON.parse(userProfileData);
            const userPets = parsedData.pets || [];
            setDatepickerUserPets(userPets);
        }

        const fetchPlaydates = async () => {
            const idusername = localStorage.getItem('idUsername');
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

            {datepickerUserPets && datepickerUserPets.length > 0 && (
                <div>
                    <h3>Your Pets</h3>
                    <select value={selectedUserPet} onChange={handleUserPetChange}>
                        <option value="">Select a pet</option>
                        {datepickerUserPets.map((pet) => (
                            <option key={pet.name} value={pet.name}>
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
