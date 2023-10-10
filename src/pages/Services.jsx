import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './Services.css';

const Services = () => {
    return (
        <div>
            <div className='title-container'>
                <h2>What We Do</h2>
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