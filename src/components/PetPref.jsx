import React, { useState, useEffect } from 'react';
import axios from 'axios';

function  PetPref() {
    const [background, setBackground] = useState('');

    useEffect(() => {
        // Retrieve idusername from local storage
        const idusername = localStorage.getItem('idUsername');

        if (!idusername) {
            // Handle the case where idusername is not found in local storage
            console.error('idusername not found in local storage.');
            return;
        }

        // Make an HTTP request to your server to fetch the background data with idusername
        axios.get(`/api/getBackground?idusername=${idusername}`)
            .then((response) => {
                // Assuming the response.data contains the background value from the database
                setBackground(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    let containerClassName = '';

    // Conditionally set the containerClassName based on the background value
    switch (background) {
        case 'dog':
            containerClassName = 'dog-background';
            break;
        case 'cat':
            containerClassName = 'cat-background';
            break;
        case 'both':
            containerClassName = 'both-background';
            break;
        default:
            containerClassName = 'default-background';
    }

    return (
        <div className={containerClassName}>
            {/* Your content goes here */}
        </div>
    );
}

export default PetPref;
