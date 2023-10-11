import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import pathologyImg from './page_Images/servicesPic.jpg';
import consultImg from './page_Images/consultationPic.webp'
import behaviourImg from'./page_Images/behaviourPic.jpg'
import desexingImg from './page_Images/desexingPic.jpg'
import microchipImg from './page_Images/microchippingPic.jpg'
import surgeryImg from './page_Images/surgeryPic.jpg'
import vaccImg from './page_Images/vaccinationPic.jpg'
import './Services.css';

const Services = () => {
    return (
        <div>
            <div className='title-container'>
                <h2>What We Do</h2>
            </div>

            <body className="Services">
            <div className= 'serviceCarousel'>
                <Carousel>
                    <Carousel.Item className='vac'>
                        <img src={vaccImg} alt="First slide" />
                        <Carousel.Caption>
                            <h3>Vaccinations</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={surgeryImg} alt="Second slide" />
                        <Carousel.Caption>
                            <h3>Surgical</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={microchipImg} alt="Third slide" />
                        <Carousel.Caption>
                            <h3>Microchipping</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={desexingImg} alt="fourth slide" />
                        <Carousel.Caption>
                            <h3>Desexing</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={consultImg} alt="fifth slide" />
                        <Carousel.Caption>
                            <h3>Consultaions</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={behaviourImg} alt="sixth slide" />
                        <Carousel.Caption>
                            <h3>Behaviour Consultations</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className='vac'>
                        <img src={pathologyImg} alt="seventh slide" />
                        <Carousel.Caption>
                            <h3>Pathology</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            </body>
        </div>
    );
}

export default Services;