import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
const Header = () => {
    return (
        <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
      </nav>
    </header>
    )
};

export default Header;