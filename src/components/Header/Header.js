import React, { useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { setSidebarOn, getSidebarStatus } from '../../store/sidebarSlice';
import { useSelector, useDispatch } from 'react-redux';


const Header = () => {
    const dispatch = useDispatch();

    return (
      <div>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <Button
                variant="outline-secondary"
                className="sidebar-toggle"
                onClick={ () => dispatch(setSidebarOn()) }
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Louis' Shop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/cart">
                    <Nav.Link>
                      <i className=" fas fa-shopping-cart"></i> Cart
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className=" fas fa-user"></i> Login
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </div>
    );
}

export default Header;