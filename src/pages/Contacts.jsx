
import ContactDetails from '../components/ContactDetails';
import GoogleMap from '../components/GoogleMap';
import './Contacts.css';
const Contacts = () => {
    return (
        <div>
            <div className='title-container'>
                <h2>How to Reach Us</h2>
            </div>
            <div className= 'contactData'>
                <div>
                    <ContactDetails className= 'CInfoTable'/> 
                </div>
                <div>
                    <GoogleMap className= 'mapLocation'/>
                </div>
            </div>
        </div>
    )    

}

export default Contacts;