import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Store from './store/store';
import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar/Sidebar';
import {Home, CategoryProduct, ProductSingle, Cart} from "./pages/index";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/product/:id" element = {<ProductSingle />} />
            <Route path = "/category/:category" element = {<CategoryProduct />} />
            <Route path = "/cart" element = {<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
