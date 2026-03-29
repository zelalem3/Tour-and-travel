import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    
    <Navbar expand="lg" className="py-3 custom-nav" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/static/images/logo.jpg" alt="Logo" className="nav-logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
  
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/Destinations" className="nav-item-link">
              Expreditions
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/tours" className="nav-item-link">
              Tours
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className="nav-item-link">
              Blog
            </Nav.Link>
           
            <Nav.Link as={Link} to="/contact" className="p-0 ms-lg-3">
              <Button className="button-27">Contact Us</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;