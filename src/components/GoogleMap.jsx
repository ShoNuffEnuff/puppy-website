import React from 'react';
import './GoogleMap.css';

function GoogleMap() {
    return (

        <div className='GMapStyling'>
            <iframe title= 'mapFrame' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11002.979188275189!2d138.59173169142468!3d-34.926388182290175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0b68ac2b74cc5%3A0x333289e17eb86cc1!2sAcademy%20IT!5e0!3m2!1sen!2sau!4v1696479175571!5m2!1sen!2sau" 
            width="600" 
            height="450" 
            style= {{border:10}}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
}
export default GoogleMap;