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
    const productStatus = useSelector(getAllProductsStatus);

    useEffect(() => {
        dispatch(fetchAsyncProducts(50));
    }, []);

    // randomizing the products in the list
    const tempProducts = [];
    if(products.length > 0){
        for(let i in products) {
            let randomIndex = Math.floor(Math.random() * products.length);

            while(tempProducts.includes(products[randomIndex])){
                randomIndex = Math.floor(Math.random() * products.length);
            }
            tempProducts[i] = products[randomIndex];
        }
    }

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
                  <ProductList products={tempProducts}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default HomePage
