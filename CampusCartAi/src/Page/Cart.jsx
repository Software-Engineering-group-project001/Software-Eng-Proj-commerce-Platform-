import React from "react";
import { useOutletContext } from "react-router-dom";
import { MdDelete } from "react-icons/md"; // Import a delete icon

const Cart = () => {
  const { cart, removeFromCart } = useOutletContext();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="list-group">
          {cart.map((item) => (
            <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between p-3 shadow-sm mb-2 border rounded">
              
              <div className="d-flex align-items-center">
             
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} 
                  className="me-3"
                />
                
                <div>
                  <h6 className="mb-0">{item.title}</h6>
                  <small className="text-muted">${item.price}</small>
                </div>
              </div>

              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                <MdDelete size={20} />
              </button>

            </div>
          ))}

          <div className="mt-4 p-3 bg-light rounded text-end">
            <h4>Total: ${cart.reduce((total, item) => total + item.price, 0)}</h4>
            <button className="btn btn-success px-4">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;