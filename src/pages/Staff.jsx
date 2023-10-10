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
            <div className='title-container'>
                <h2>Meet the Team</h2>
            </div>
            <body className='staffBackground'>
                <div className= 'Staff01'>
                    <div className='img-container'>
                        <Image src={Stirling} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Sarah Rodriguez</h5>
                        <p><i>Passionate About Pet Health</i></p>
                        <p>Dr. Sarah Rodriguez, a caring veterinarian, offers comprehensive pet care. Trust her for 
                        preventive and wellness services.</p>
                    </div>
                </div>
                <div className= 'Staff02'>
                    <div className='img-container'>
                        <Image src={EdAPoe} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Dr James Mitchell,DVM</h5>
                        <p><i>Your Trusted Pet Vet</i></p>
                        <p>Dr. James Mitchell, a compassionate vet, specializes in surgery, dentistry, and wellness 
                        care. Your pet's health is in good hands.</p>
                    </div>
                </div>
                <div className= 'Staff03'>
                    <div className='img-container'>
                        <Image src={Amy} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Amy Martinez, Vet Nurse</h5>
                        <p><i>Caring for Pets Like Family</i></p>
                        <p>Amy Martinez, a dedicated vet nurse, provides compassionate care to all pets. With 
                        expertise in nursing and a love for animals, she ensures your furry friends receive the 
                        best attention.</p>
                    </div>
                </div>
                <div className= 'Staff04'>
                <div className='img-container'>
                        <Image src={Randy} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Mark Davis, Vet Nurse</h5>
                        <p><i>Supporting Veterinary Excellence</i></p>
                        <p>One of our skilled vet nurses, has a dedication to animal health ensures a smooth and successful experience for your
                        pets.</p>
                    </div>
                </div>
                <div className= 'Staff05'>
                <div className='img-container'>
                        <Image src={Roger} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Olivia Foster, Vet Nurse</h5>
                        <p><i>Your Pet's Wellness Advocate</i></p>
                        <p>Olivia Foster, an experienced vet nurse, is committed to your pet's well-being with a 
                        focus on preventive care.</p>
                    </div>
                </div>
                <div className= 'Staff06'>
                <div className='img-container'>
                        <Image src={Charlie} roundedCircle height={200} width={200} className='staff-pic'/>
                    </div>
                    <div className='staff-profile'>
                        <h5>Linda Harrison, Pet Behaviorist</h5>
                        <p><i>Transforming Pet Behavior</i></p>
                        <p>Our skilled pet behaviorist,has a deep passion for animal psychology, she 
                        helps pets and their owners 
                        build happier, healthier relationships.</p>
                    </div>
                </div>
            </body>

        </div>
    );
}

export default About;