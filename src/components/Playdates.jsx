import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker/dist/react-datepicker.esm.js';
import 'react-datepicker/dist/react-datepicker.css';

const Playdates = ({ loggedInUser }) => {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // Fetch the user's pets from your API, replace with your actual API endpoint
        axios.get('/user-profile/<string:idusername>')
            .then((response) => {
                setPets(response.data);
                if (response.data.length > 0) {
                    setSelectedPet(response.data[0].id); // Select the first pet by default
                }
            })
            .catch((error) => {
                console.error('Error fetching pets:', error);
            });
    }, [loggedInUser]);

    const handlePetChange = (e) => {
        setSelectedPet(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFinalizeClick = () => {
        if (selectedPet && selectedDate) {
            // Send a booking request to your API with the selectedPet and selectedDate
            axios.post('/api/book-appointment', {
                petId: selectedPet,
                date: selectedDate.toISOString(),
            })
                .then((response) => {
                    // Handle success
                    console.log('Appointment booked successfully:', response.data);
                    // Close the modal or perform any other action
                })
                .catch((error) => {
                    console.error('Error booking appointment:', error);
                });
        } else {
            alert('Please select a pet and a date before finalizing.');
        }
    };

    return (
        <div className="modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Book an Appointment</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="petSelect">Select a Pet:</label>
                        <select
                            id="petSelect"
                            className="form-control"
                            value={selectedPet}
                            onChange={handlePetChange}
                        >
                            {pets.map((pet) => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Select an Appointment Date:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            dateFormat="MM/dd/yyyy"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleFinalizeClick}
                    >
                        Finalize
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Playdates;
