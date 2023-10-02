import React from 'react';
import petplusLogo from './petplus_logo.png';

const Home = () => {
    return (
        <div> 
            <h4>Home Page</h4>
            <body>
                <Container className='homePageItems'>
                    <div className= 'flexItem01'>1</div>
                    <div className= 'flexItem02'>2</div>
                    <div className= 'flexItem03'>3</div>
                </Container>
            </body>
        </div>
    );
}

export default Home;
