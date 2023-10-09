import React from 'react';
import ContactDetails from '../components/ContactDetails';
import GoogleMap from '../components/GoogleMap';
import './Contacts.css';
const Contacts = () => {
    return (
        <div className= 'contactData'>
            <div>
                <ContactDetails className= 'CInfoTable'/> 
            </div>
            <div>
                <GoogleMap className= 'mapLocation'/>
            </div>

        </div>
    )    

}

export default Contacts;