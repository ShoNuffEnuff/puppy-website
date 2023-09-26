import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Datepicker({ selectedPet, clearSelectedPet }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedUserPet, setSelectedUserPet] = useState('');
    const [datepickerUserPets, setDatepickerUserPets] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleUserPetChange = (event) => {
        const selectedPetName = event.target.value;
        setSelectedUserPet(selectedPetName);
    };

    useEffect(() => {
        // Retrieve userPets from local storage and set it as datepickerUserPets
        const userProfileData = localStorage.getItem('userProfileData');
        if (userProfileData) {
            const parsedData = JSON.parse(userProfileData);
            const userPets = parsedData.pets || []; // Access the pets array

            setDatepickerUserPets(userPets);
        }
    }, []);

    return (
        <div className="datepicker-container">
            <h2>Select a Date and Time</h2>
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
                    <p>You selected: {selectedDate.toString()}</p>
                    <p>Pet Name: {selectedPet.name}</p>
                    <p>Breed: {selectedPet.breed}</p>
                    <p>Age: {selectedPet.age}</p>
                    <p>Gender: {selectedPet.gender}</p>
                </div>
            )}
            <button onClick={clearSelectedPet}>Back to All Pets</button>

            {/* Dropdown to select userPets */}
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
        </div>
    );
}

export default Datepicker;
