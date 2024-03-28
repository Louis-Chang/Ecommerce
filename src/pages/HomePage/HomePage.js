import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../store/categorySlice'
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice'
import ProductList from '../../components/ProductList/ProductList'
import Loader from '../../components/Loader/Loader'
import { STATUS } from '../../utils/status'


function HomePage() {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);
    const products = useSelector(getAllProducts);
    console.log(products);
    const productStatus = useSelector(getAllProductsStatus);

    useEffect(() => {
        dispatch(fetchAsyncProducts(50));
      }, []);

    return (
      <main>
        <div className="slider-wrapper">
        </div>
        <div className="main-content bg-whitesmoke">
          <div className="container">
            <div className="categories py-5">
              <div className="categories-item">
                <div className="title-md">
                  <h3>See our products</h3>
                </div>
                {productStatus === STATUS.LOADING ? (
                  <Loader />
                ) : (
                  <ProductList products={products}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default HomePage
