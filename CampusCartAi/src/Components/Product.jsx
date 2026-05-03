import React from "react";
import { useOutletContext } from "react-router-dom"; 

const Product = ({ product }) => {
    const { addToCart } = useOutletContext();

    if (!product) return null;

    return (
        <div className="card h-100 shadow-sm border-0">
            <img 
                src={product.thumbnail} 
                className="card-img-top" 
                alt={product.title} 
                style={{ height: "200px", objectFit: "cover" }} 
            />
            
            <div className="card-body">
                <h5 className="card-title mb-1">{product.title}</h5>
                
                <div className="fs-4 fw-bold text-primary mb-2">
                    ${product.price}
                </div>

                <p className="card-text text-muted small">{product.description}</p>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item small text-uppercase text-secondary">{product.category}</li>
                
                <li className="list-group-item small">{product.course}</li>
            </ul>

            <div className="card-body d-flex gap-2">
                <button 
                    className='btn btn-primary flex-grow-1 fw-bold' 
                    onClick={() => {
                        addToCart(product);
                        alert(`${product.title} has been added to your cart!`);
                    }}
                >
                    Add to Cart 
                </button>

                <button className='btn btn-outline-secondary'>
                    Contact Seller
                </button>
            </div>
        </div>
    );
};

export default Product;