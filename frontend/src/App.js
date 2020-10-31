import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './components/RegisterScreen';
import ProductsScreen from './components/ProductsScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen';
import OrderScreen from './components/OrderScreen';
import ProfileScreen from './components/ProfileScreen';
import OrdersScreen from './components/OrdersScreen';


function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  
  const changeMode = () =>{
    document.querySelector('.dark-mode-toggle').addEventListener('click',()=>{
      console.log(document.body.classList.toggle('darkmode'));
    })
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">WebStore</Link>
          </div>
          
          <div className="header-links">
            <button className="dark-mode-toggle" onClick={changeMode}><i className="fa fa-toggle-on"></i></button>
            {userInfo ? (
              <Link to="/products">Create</Link>
            ) : " "}

            <Link to="/cart" className="fa fa-shopping-cart">Cart</Link>

            {userInfo ? (
              <Link to="/profile" className="fa fa-user">{userInfo.name}</Link>
            ) : (
              <Link to="/signin" className="fa fa-sign-in">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#" className="fa fa-caret-down">Admin</a>
                <ul className="dropdown-content ">
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <br />
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3> Product Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>

          <ul className="categories">
            {products.map((product) => (

              <li key={product._id}>
              <Link to={"/category/"+ product.category}>{product.category}</Link> 
              </li>
            
            ))}
          </ul>

        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact component={HomeScreen} />  
          </div>
        </main>

        <footer className="footer">
          <a href="https://github.com/ayush-git228" className="github-icon"><i className="fa fa-github"></i></a> 
          <a href="https://linkedin.com/" className="linkedin-icon"><i className="fa fa-linkedin"></i></a>
          <a href="https://www.instagram.com/ayush.gupta228" className="instagram-icon"><i className="fa fa-instagram"></i></a>
          <div id="WAButton"></div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
