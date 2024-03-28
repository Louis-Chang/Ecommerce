import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import Footer from './components/Footer';
import Store from './store/store';
import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
