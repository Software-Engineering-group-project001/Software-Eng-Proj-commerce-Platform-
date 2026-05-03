import React, { useState, useEffect } from "react";
import data from "../../data.json";
import Product from "../Components/Product";
import 'bootstrap/dist/css/bootstrap.min.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data.products);
    }, []);

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-5">

                {products.map(p => (
                    <div className="col" key={p.id}>
                        <Product product={p} />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ProductList;