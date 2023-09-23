// PetGroupCard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './PetGroupCard.css';
import Datepicker from './DatePicker';

const dogBreeds = [
    'Beagle',
    'Bernese Mountain Dog',
    'Border Collie',
    'Boxer',
    'Brittany Spaniel',
    'Bulldog',
    'Cavalier King Charles Spaniel',
    'Chihuahua',
    'Dachshund',
    'Dobermann',
    'English Cocker Spaniel',
    'English Setter',
    'English Springer Spaniel',
    'French Bulldog',
    'German Shepherd',
    'German Shorthaired Pointer',
    'German Spitz',
    'Golden Retriever',
    'Great Dane',
    'Labrador Retriever',
    'Maltese',
    'Miniature Schnauzer',
    'Poodle',
    'Pug',
    'Rottweiler',
    'Shetland Sheepdog',
    'Shih Tzu',
    'Staffordshire Bull Terrier',
    'West Highland White Terrier',
    'Yorkshire Terrier',
];

const PetGroupCard = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGender, setSelectedGender] = useState('all');
    const [selectedAge, setSelectedAge] = useState('all');
    const [selectedBreed, setSelectedBreed] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        let url = 'http://localhost:5000/pets';
        const params = [];

        if (selectedGender !== 'all') {
            params.push(`gender=${selectedGender}`);
        }

        if (selectedAge !== 'all') {
            params.push(`age=${selectedAge}`);
        }

        if (selectedBreed !== 'all') {
            params.push(`breed=${selectedBreed}`);
        }

        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        axios
            .get(url)
            .then((response) => {
                setPets(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pet data:', error);
                setError(error);
                setLoading(false);
            });
    }, [selectedGender, selectedAge, selectedBreed]);

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value);
    };

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value);
    };

    const handleBreedChange = (event) => {
        setSelectedBreed(event.target.value);
    };

    const handlePetSelection = (pet) => {
        setSelectedPet(pet);
        setShowModal(true);
    };

    const clearSelectedPet = () => {
    setSelectedPet(null);
    
};


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !Array.isArray(pets)) {
        return <p>Error: Unable to fetch pet data.</p>;
    }

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPet ? 'Select a Date and Time' : 'All Pets'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPet ? (
                        <Datepicker selectedPet={selectedPet} clearSelectedPet={clearSelectedPet} />
                    ) : (
                        <div>
                            <label htmlFor="genderSelect">Select Gender:</label>
                            <select id="genderSelect" value={selectedGender} onChange={handleGenderChange}>
                                <option value="all">All</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <label htmlFor="ageSelect">Select Age:</label>
                            <select id="ageSelect" value={selectedAge} onChange={handleAgeChange}>
                                <option value="all">All</option>
                                {Array.from({ length: 15 }, (_, i) => (
                                    <option key={i + 1} value={(i + 1).toString()}>
                                        {(i + 1).toString()} year{((i + 1) !== 1) ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="breedSelect">Select Breed:</label>
                            <select id="breedSelect" value={selectedBreed} onChange={handleBreedChange}>
                                <option value="all">All</option>
                                {dogBreeds.map((breed) => (
                                    <option key={breed} value={breed}>
                                        {breed}
                                    </option>
                                ))}
                            </select>
                            <div className="row">
                                {pets.map((pet) => (
                                    <div key={pet.petid} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                                        <Card className="pet-card">
                                            <Card.Img
                                                className="pet-image"
                                                src={`data:image/jpeg;base64,${pet.photo}`}
                                                alt={pet.name}
                                            />
                                            <Card.Body>
                                                <Card.Title>{pet.name}</Card.Title>
                                                <Card.Text>
                                                    Breed: {pet.breed}
                                                </Card.Text>
                                                <Card.Text>
                                                    Age: {pet.age}
                                                </Card.Text>
                                                <Card.Text>
                                                    Gender: {pet.gender}
                                                </Card.Text>
                                                <Button
                                                    className="pet-button"
                                                    variant="primary"
                                                    onClick={() => handlePetSelection(pet)}
                                                >
                                                    Book a play date with {pet.name}
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedPet ? (
                        <Button variant="secondary" onClick={clearSelectedPet}>
                            Back to All Pets
                        </Button>
                    ) : null}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PetGroupCard;
