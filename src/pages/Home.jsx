import React from 'react';
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
                            <p className= 'staffInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                        </div>
                        <img src={StaffPhoto} className='staffImg' alt='Staff' />
                    </div>
                    <div className= 'flexItem02'>
                        <div className='contentWrapper'>
                            <h4>Services</h4>
                            <p className= 'servicesInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                        </div>
                        <img src={ServicesPhoto} className='serviceImg' alt='Services' />
                    </div>
                    <div className= 'flexItem03'>
                        <div className='contentWrapper'>
                            <h4>Contact</h4>
                            <p className= 'contactInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                        </div>
                        <img src={locationPhoto} className='contactsImg' alt='Contacts' />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;
