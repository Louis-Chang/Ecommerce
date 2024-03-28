import React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatPrice } from "../../utils/helpers";
import "./Product.css";

const Product = ({product}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product?.id}`} key={product?.id}>
        <CardBody>
          <div className="product-item bg-white">
            <div className="category">{product?.category}</div>
            <div className="card-img-container">
              <img
                className='card-img'
                src={product?.images[0]}
                alt={product.title}
              />
            </div>
            <div className="product-item-info fs-14">
              <CardTitle as="div">
                <strong>{product?.title}</strong>
              </CardTitle>
              <Card.Text as="div">
                <div className="my-3">
                  <span>Brand: </span>
                  <span className="fw-7">{product?.brand}</span>
                </div>
              </Card.Text>
              <Card.Text as="div">
                <div className="price flex align-center justify-center">
                  <span className="old-price">
                    {formatPrice(product?.price)}
                  </span>
                  <span className="new-price">
                    {formatPrice(product?.discountedPrice)}
                  </span>
                  <span className="discount fw-6">
                    ({product?.discountedPercentage}% Off)
                  </span>
                </div>
              </Card.Text>
            </div>
          </div>
        </CardBody>
      </Link>
    </Card>
  );
}

export default Product