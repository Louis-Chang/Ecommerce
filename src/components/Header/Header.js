import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Button, Form, FormControl, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';


const Header = () => {
  const dispatch = useDispatch();
  const itemsCount = useSelector(getCartItemsCount);
  const carts = useSelector(getAllCarts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts])

    return (
      <div>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <Button 
                aria-controls="basic-navbar-nav" 
                variant="outline-secondary"
                className="sidebar-toggle"
                onClick={() => dispatch(setSidebarOn())}
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>Louis' Shop</Navbar.Brand>
              </LinkContainer>
              <div className="ms-auto">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Form className="d-flex me-auto">
                      <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i> Cart
                        {itemsCount > 0 && (
                          <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                            {itemsCount}
                          </Badge>
                        )}
                      </Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
        </header>
      </div>
    );
}

export default Header;