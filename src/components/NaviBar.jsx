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

function NaviBar() {
    return (
        <Navbar expand="lg" className="Home-Nav-Bar">
            <Container className="Nav01">
                <Navbar.Brand href="#home"><Image src="./petplus_logo.png" alt= "Veterinary Services Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" />
                <Nav className="me-auto">
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
                                <Button type="submit" className="login">Login</Button>
                            </Col>
                            <Col>
                                <Button type="submit">Register</Button>
                            </Col>
                        </Row>
                    </Form>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NaviBar