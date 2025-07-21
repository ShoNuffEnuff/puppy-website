
import Container from 'react-bootstrap/Container';
import './Home.css';
import Image from 'react-bootstrap/Image';
import StaffPhoto from './page_Images/staffPic.jpg';
import ServicesPhoto from './page_Images/servicesPic.jpg';
import locationPhoto from './page_Images/vetHospital.jpg';

const Home = () => {
    return (
        <div> 
            <div className='title-container'>
                <h2>Welcome to Pet</h2>
                <h1 className='plus'>+</h1>
            </div>
            <div>
                <Container className='homePageItems'>
                    <div className= 'flexItem01'>
                        <div className='contentWrapper'>
                            <h4>Staff</h4>
                            <p className= 'staffInfo'>At Pet Plus Veterinarian Services, we are proud to introduce 
                            you to our passionate team of veterinarians who share a common commitment to your pet's 
                            well-being. With a specialized focus on surgery and consults, our team is at the 
                            forefront of providing comprehensive, holistic pet healthcare.</p>
                        </div>
                        <img src={StaffPhoto} className='staffImg' alt='Staff' />
                    </div>
                    <div className= 'flexItem02'>
                        <div className='contentWrapper'>
                            <h4>Services</h4>
                            <p className= 'servicesInfo'>When you choose Pet Plus Veterinarian Services, you're 
                            choosing a team of veterinarians who are dedicated to going above and beyond for your 
                            pets as well as treating the whole pet, not just their symptoms. Join us in providing 
                            the best in surgical and consultative care, and let's create a healthier, happier future for your four-legged family members.</p>
                        </div>
                        <img src={ServicesPhoto} className='serviceImg' alt='Services' />
                    </div>
                    <div className= 'flexItem03'>
                        <div className='contentWrapper'>
                            <h4>Contact</h4>
                            <p className= 'contactInfo'>At Pet Plus Veterinarian Services, we look forward to 
                            welcoming you to our practice and providing the best in veterinary care for your pets. 
                            Contact us today to learn more or schedule a consultation. Your pet's health and 
                            happiness are our top priorities, and we're here to serve the needs of Adelaide and the
                            surrounding areas.</p>
                        </div>
                        <img src={locationPhoto} className='contactsImg' alt='Contacts' />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;
