import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'
import { formatPrice } from '../../utils/helpers'
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import { Button } from 'react-bootstrap';
import "./ProductSinglePage.css";
import CartMessage from '../../components/CartMessage/CartMessage';

function ProductSinglePage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(getProductSingle);
    const productSingleStatus = useSelector(getSingleProductStatus);
    const [quantity, setQuantity] = useState(1);
    const cartMessageStatus = useSelector(getCartMessageStatus);
    const [selectedImage, setSelectedImage] = useState('');
  
    // getting single product
    useEffect(() => {
      dispatch(fetchAsyncProductSingle(id));
  
      if(cartMessageStatus){
        setTimeout(() => {
          dispatch(setCartMessageOff());
        }, 2000);
      }
    }, [cartMessageStatus]);
  
    useEffect(() => {
      if (product?.images?.length > 0) {
        setSelectedImage(product.images[0]);
      }
    }, [product]);

    if(productSingleStatus === STATUS.LOADING) {
      return <Loader />
    }
  
    const increaseQty = () => {
        setQuantity((prevQty) => {
          let tempQty = prevQty + 1;
          if(tempQty > product?.stock) tempQty = product?.stock;
          return tempQty;
        })
    }
    
    const decreaseQty = () => {
      setQuantity((prevQty) => {
        let tempQty = prevQty - 1;
        if (tempQty < 1) tempQty = 1;
        return tempQty;
      });
    };
  
    const addToCartHandler = (product) => {
      let discountedPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
      let totalPrice = quantity * discountedPrice;
  
      dispatch(addToCart({...product, quantity: quantity, totalPrice, discountedPrice}));
      dispatch(setCartMessageOn(true));
    }

    return (
      <main className="py-5 bg-whitesmoke">
        <div className="product-single">
          <div className="container">
            <div className="product-single-content bg-white grid">
              <div className="product-single-l">
                <div className="product-img">
                  <div className="product-img-zoom">
                    <img src={selectedImage} alt="" className="img-cover" />
                  </div>
                  <div className="product-img-thumbs flex align-center my-2">
                    {product?.images?.map((img, index) => (
                      <div
                        key={index}
                        className="thumb-item"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt="" className="img-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="product-single-r">
                <h1 className="product-title">{product?.title}</h1>
                <p className="product-price">{formatPrice(product?.price)}</p>
                {product?.discountPercentage > 0 && (
                  <p className="product-price-discounted">
                    {formatPrice(
                      product?.price -
                        product?.price * (product?.discountPercentage / 100)
                    )}
                  </p>
                )}
                <p className="product-description">
                  {product?.description
                    ? product.description.split("  ").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : null}
                </p>
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    readOnly
                  />
                  <Button
                    type="button" className="btn btn-light"
                    onClick={() => decreaseQty()}
                  >
                    -
                  </Button>
                  <Button
                    type="button" className="btn btn-light"
                    onClick={() => increaseQty()}
                  >
                    +
                  </Button>
                </div>
                <button type = "button" className='btn btn-primary'>
                    <i className='fas fa-shopping-cart'></i>
                    <span className='btn-text mx-2' onClick={() => { addToCartHandler(product)}}>Add to cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {cartMessageStatus && <CartMessage />}
      </main>
    );
}

export default ProductSinglePage
