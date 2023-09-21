import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav01 from './NaviBar.css';
import petplusLogo from './petplus_logo.png';

function NaviBar() {
    return (
        <Navbar expand="lg" className="custom-nav-bar">
            <Container className="Nav01">
                {/*<Navbar.Brand href="#home"><Image src={petplusLogo} alt= "Veterinary Services Logo" className="custom-logo" /></Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="custom-navlinks">
                        <div className="nav-row">
                            <Nav.Link href="#home" className="mr-1">Home</Nav.Link>
                            <Nav.Link href="#staff" className="mr-2">Staff</Nav.Link>
                            <Nav.Link href="#services" className="mr-3">Services</Nav.Link>
                            <Nav.Link href="#contact" className="mr-4">Contact</Nav.Link>
                        </div>
                    <Form inline className="login-form">
                        <div className="userForm">
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="passwordForm">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className=" mr-sm-2"
                                /> 
                        </div>
                        <div className="btn-nav-row">
                                <Button type="submit" className="custom-btn-Login">Login</Button>
                                <Button type="submit" className="custom-btn-Register" >Register</Button> 
                        </div>
                    </Form>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NaviBar