import React from "react";
import { useOutletContext, Link } from "react-router-dom"; 
import Product from "./Product"; 

const Search = () => {
    
    const { filteredProducts } = useOutletContext();

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Search Results</h2>
            <div className="row">
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map(p => (
                        <div key={p.id} className="col-md-4 mb-4">
                            <Product product={p} />
                        </div>
                    ))
                ) : (
                    <div className="text-center p-5">
                        <p className="text-muted">No items matched your search.</p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;