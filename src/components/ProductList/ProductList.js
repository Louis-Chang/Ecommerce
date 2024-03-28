import React from 'react';
import Product from "../Product/Product";
import './ProductList.css';
import { Row, Col } from 'react-bootstrap'

const ProductList = ({products}) => {
  return (
    <Row>
      {
        products.map(product => {
          let discountedPrice = (product.price) - (product.price * (product.discountPercentage / 100));

          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product key = {product.id} product = {{...product, discountedPrice}} />
            </Col>
          )
        })
      }
    </Row>
  )
}

export default ProductList