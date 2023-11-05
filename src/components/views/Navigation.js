
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
      <Navbar.Brand>
        <NavLink to="/" activeClassName="active" style={{ fontSize: '24px', color: 'white', textDecoration: 'none', padding: '10px' }}>
          WAITER APP
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" activeClassName="active" exact>
            Home
          </Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
      
    </Navbar>
  );
};

export default Navigation;
