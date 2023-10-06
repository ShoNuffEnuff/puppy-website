import React from 'react';
import Container from 'react-bootstrap/Container';
import './Home.css';

const Home = () => {
    return (
        <div> 
            <h4>Home Page</h4>
            <div>
                <Container className='homePageItems'>
                    <div className= 'flexItem01'>
                    <h4>Staff</h4>
                    <p className= 'staffInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </div>
                    <div className= 'flexItem02'>
                    <h4>Services</h4>
                    <p className= 'servicesInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </div>
                    <div className= 'flexItem03'>
                    <h4>Contact</h4>
                    <p className= 'contactInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;
