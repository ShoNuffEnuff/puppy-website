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
                <Navbar.Brand href="#home"><Image src={petplusLogo} alt= "Veterinary Services Logo" className="custom-logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" />
                <Nav className="custom-navlinks">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#staff">Staff</Nav.Link>
                    <Nav.Link href="#services">Services</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    <Form inline>
                        <InputGroup>
                            <Form.Control
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Form>
                    <Form inline>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" className="custom-btn-Login">Login</Button>
                            </Col>
                            <Col>
                                <Button type="submit" className="custom-btn-Register" >Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NaviBar