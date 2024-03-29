import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'
import { formatPrice } from '../../utils/helpers'
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
import { Button } from 'react-bootstrap';
import "./ProductSinglePage.css"

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
  
    const handleQuantityChange = (type) => {
      setQuantity((prevQty) => {
        let newQty = type === "increase" ? prevQty + 1 : prevQty - 1;
        newQty = Math.max(newQty, 1); // 数量不应该少于1
        newQty = product?.stock ? Math.min(newQty, product?.stock) : newQty; // 数量也不应该多于库存量
        return newQty;
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
                    onClick={() => handleQuantityChange("decrease")}
                  >
                    -
                  </Button>
                  <Button
                    type="button" className="btn btn-light"
                    onClick={() => handleQuantityChange("increase")}
                  >
                    +
                  </Button>
                </div>
                <button type="button" className="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default ProductSinglePage
