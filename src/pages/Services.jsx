import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Example from './page_Images/servicesPic.jpg';
import './Services.css';

const Services = () => {
    return (
        <div>
            <div className='title-container'>
                <h2>What We Do</h2>
            </div>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <Example text="First slide" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Example text="Second slide" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Example text="Third slide" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <body className="Services">

                <div className='listofServices'>
                    <ListGroup style={{ fontSize: 24 }}>
                        <ListGroup.Item>Surgical</ListGroup.Item>
                        <ListGroup.Item>Vaccinations</ListGroup.Item>
                        <ListGroup.Item>Microchipping</ListGroup.Item>
                        <ListGroup.Item>Desexing</ListGroup.Item>
                        <ListGroup.Item>Consultations</ListGroup.Item>
                        <ListGroup.Item>Behavior Consultations</ListGroup.Item>
                        <ListGroup.Item>Dietary Management</ListGroup.Item>
                        <ListGroup.Item>Pathology</ListGroup.Item>
                    </ListGroup>
                </div>    
            </body>
        </div>
    );
}

export default Services;