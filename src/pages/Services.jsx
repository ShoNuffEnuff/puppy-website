import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './Services.css';

const Services = () => {
    return (
        <body className="Services">
            <div className='services-div'>
                <h4>Services</h4>
            </div>
            <div className='listofServices'>
                    <ListGroup>
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
    );
}

export default Services;