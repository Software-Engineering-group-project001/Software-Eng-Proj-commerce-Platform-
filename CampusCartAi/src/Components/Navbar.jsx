import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCart, MdManageAccounts } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import data from "../../data.json";

const Navbar = ({ setFilteredProducts }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

   const handleSearch = (e) => {
    e.preventDefault();

    const term = searchTerm.replace(/\s+/g, '').toLowerCase();

    const results = data.products.filter(product => {
        
        const cleanTitle = product.title.replace(/\s+/g, '').toLowerCase();
        const cleanCategory = product.category.replace(/\s+/g, '').toLowerCase();
        
        const cleanCourse = product.course?.replace(/\s+/g, '').toLowerCase() || "";

        return (
            cleanTitle.includes(term) ||
            cleanCategory.includes(term) ||
            cleanCourse.includes(term)
        );
    });

    setFilteredProducts(results);
    navigate("/search");
};

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="navbar-brand">CampusCartAI</Link>

                <div className="d-flex gap-4">

                    <form className="d-flex" style={{ width: '600px' }} onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-light" type="submit">
                            <AiOutlineSearch />
                        </button>
                    </form>

                    <Link to="/cart" className="text-white"><MdShoppingCart size={35} /></Link>
                    <Link to="/account" className="text-white"><MdManageAccounts size={35} /></Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;