import React from 'react';
import './Staff.css';
import Image from 'react-bootstrap/Image';
import Stirling from './page_Images/Stirling01.jpg';
import EdAPoe from './page_Images/EdgarAPoe.jpg';
import Amy from './page_Images/gone-girl-1.jpeg';
import Randy from './page_Images/RandyandSharon.jpg';
import Roger from './page_Images/Rodger.jpg';
import Charlie from './page_Images/charlieDay.jpg';

const About = () => {
    return (
        <div className="About">
            <h4>Staff</h4>
            <body className='staffBackground'>
                <div className= 'Staff01'>
                <Image src={Stirling} roundedCircle height={200} width={200}/>
                <p className='staff01Info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed risus eu lacus consequat condimentum. Cras nec volutpat libero. Pellentesque placerat eu libero sed placerat. Curabitur mollis ante at lacus hendrerit ullamcorper. In porttitor justo id orci tempus, eu porttitor odio dapibus</p>
                </div>
                <div className= 'Staff02'>
                <Image src={EdAPoe} roundedCircle height={200} width={200}/>
                </div>
                <div className= 'Staff03'>
                <Image src={Amy} roundedCircle height={200} width={200}/>
                </div>
                <div className= 'Staff04'>
                <Image src={Randy} roundedCircle height={200} width={200}/>
                </div>
                <div className= 'Staff05'>
                <Image src={Roger} roundedCircle height={200} width={200}/>
                </div>
                <div className= 'Staff06'>
                <Image src={Charlie} roundedCircle height={200} width={200}/>
                </div>
            </body>

        </div>
    );
}

export default About;