import React from 'react';
import Container from 'react-bootstrap/Container';
import './Home.css';

const Home = () => {
    return (
        <div className='homePageBackground'> 
            <h4>Home Page</h4>
            <body>
                <Container className='homePageItems'>
                    <div className= 'flexItem01'>
                    <h4>Staff</h4>
                    <body>
                    <p className= 'staffInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </body>
                    </div>
                    <div className= 'flexItem02'>
                    <h4>Services</h4>
                    <body>
                    <p className= 'servicesInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </body>
                    </div>
                    <div className= 'flexItem03'>
                    <h4>Contact</h4>
                    <body>
                    <p className= 'contactInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus. Curabitur accumsan sem massa, in efficitur arcu sodales sit amet. Sed enim augue, ultrices quis elit sed, suscipit suscipit leo.</p>
                    </body>
                    </div>
                </Container>
            </body>
        </div>
    );
}

export default Home;
