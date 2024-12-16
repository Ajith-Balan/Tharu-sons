import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';

import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Payment from './pages/user/Payment';
import OrdersList from './pages/Admin/OrdersList';
import Forget from './pages/Auth/Forget';
import SearchResult from './pages/SearchResults';
import CreateType from './pages/Admin/createtype';
import CategoryProduct from './pages/Admin/CategoryProduct';
import Types from './pages/Types';
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
        <Route path='/ghj' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchResult />} />


        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
          
          {/* Private Route Wrapper */}
          <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/category/:id' element={<CategoryProduct />} />

          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/create-type' element={<CreateType/>} />

          <Route path='admin/update-product/:id' element={<UpdateProduct/>}/>
          <Route path='admin/orderslist' element={<OrdersList/>} />

          <Route path='admin/products' element={<Products/>} />

          <Route path='admin/users' element={<Users/>} />


          </Route>
   {/* Private Route Wrapper */}
   <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders/:userid' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/payment/:id' element={<Payment />} />



          </Route>

          <Route path='/types/:id' element={<Types />} />

          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
