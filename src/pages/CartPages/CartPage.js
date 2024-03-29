import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllCarts, removeFromCart, toggleCartQty, clearCart, getCartTotal } from '../../store/cartSlice';
import { formatPrice } from '../../utils/helpers';

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);
  console.log(carts);

  if (carts.length === 0) {
    return (
      <Container className="my-5">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Your shopping cart is empty.</Card.Title>
            <Link to="/" className="btn btn-primary">Go shopping Now</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>Shopping Cart</h2>
          <ListGroup variant="flush">
            {carts.map((cart, idx) => (
              <ListGroup.Item key={cart.id}>
                <Row className="align-items-center">
                  <Col md={2}><Badge pill bg="secondary">{idx + 1}</Badge></Col>
                  <Col md={3}>{cart.title}</Col>
                  <Col md={2}>{formatPrice(cart.discountedPrice)}</Col>
                  <Col md={3}>
                    <Button variant="light" onClick={() => dispatch(toggleCartQty({id: cart.id, type: "DEC"}))}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <Badge bg="light" text="dark">{cart.quantity}</Badge>
                    <Button variant="light" onClick={() => dispatch(toggleCartQty({id: cart.id, type: "INC"}))}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                  <Col md={1}>{formatPrice(cart.totalPrice)}</Col>
                  <Col md={1}>
                    <Button variant="danger" onClick={() => dispatch(removeFromCart(cart.id))}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <h4>Total ({itemsCount} items): {formatPrice(totalAmount)}</h4>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" className="mt-2">Check Out</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPage;
