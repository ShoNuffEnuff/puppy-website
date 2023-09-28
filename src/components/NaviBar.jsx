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
import { Link } from 'react-router-dom'; // Import Link for routing
import petplusLogo from './petplus_logo.png';
import Nav01 from './NaviBar.css';

function NaviBar() {
    return (
        <Navbar expand="lg" className="custom-nav-bar">
            <Container className="Nav01">
                <Navbar.Brand as={Link} to="/"><Image src={petplusLogo} alt="Veterinary Services Logo" className="custom-logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" />
                <Nav className="custom-navlinks">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/staff">Staff</Nav.Link>
                    <Nav.Link as={Link} to="/services">Services</Nav.Link>
                    <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
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
                                    className="mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit" className="custom-btn-Login">Login</Button>
                            </Col>
                            <Col>
                                <Button type="submit" className="custom-btn-Register">Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NaviBar;
