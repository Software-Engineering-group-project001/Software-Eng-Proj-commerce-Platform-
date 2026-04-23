import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  createBrowserRouter, 
  RouterProvider, 
  Outlet, 
  Navigate, 
  useLocation 
} from 'react-router-dom';
import './App.css';


import { data } from 'react-router-dom';

// Components & Pages
import Navbar from './Components/Navbar';
import AIButton from './Components/AIButton';
import ProductList from './Page/ProductList';
import Cart from './Page/Cart';
import Search from './Components/Search';
import AI from './Page/AI'; 
import AccountSetting from './Page/AccountSetting';
import LogIn from './Page/LogIn';
import CreateAccount from './Page/CreateAccount';

const Layout = () => {
  const [isLoggedIn] = useState(true); 
  const location = useLocation();
  
  // States
  const [cart, setCart] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(data.products);

  // 2. Add Logic: Add item to list
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // 3. Add Logic: Remove item from list by ID
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

  if (!isLoggedIn && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {!isLoginPage && <Navbar setFilteredProducts={setFilteredProducts} />}

      <main>
        {/* 4. Pack the new removeFromCart function into the context suitcase */}
        <Outlet context={{ filteredProducts, cart, addToCart, removeFromCart }} /> 
      </main>

      {!isLoginPage && <AIButton />}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ProductList /> },
      { path: "/login", element: <LogIn /> },
      { path: "/cart", element: <Cart /> },
      { path: "/search", element: <Search /> },
      { path: "/ai", element: <AI /> },
      { path: "/account", element: <AccountSetting /> },
      { path: "/register", element: <CreateAccount /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;