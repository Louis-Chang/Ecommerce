import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Form, FormControl, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { setSidebarOn } from '../../store/sidebarSlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsCount = useSelector(getCartItemsCount);
  const carts = useSelector(getAllCarts);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts]);

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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1 flex-lg-row">
              <Form className="d-flex flex-grow-1" onSubmit={handleSearchSubmit}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 flex-grow-1"
                  aria-label="Search"
                  onChange={(e) => handleSearchTerm(e)}
                />
                <LinkContainer to={`search/${searchTerm}`}>
                  <Button variant="outline-success" className="flex-shrink-1">Search</Button>
                </LinkContainer>
              </Form>
              <Nav className="ms-lg-auto flex-shrink-1">
                <LinkContainer to="/cart">
                  <Nav.Link className="flex-shrink-1">
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
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default Header;
