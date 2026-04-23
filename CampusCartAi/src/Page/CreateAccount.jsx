import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate

const CreateAccount = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleCreateAccount = (e) => {
        e.preventDefault();
        console.log("Account Created!"); // Testing line
        {/* IMPLEMENT LOG IN CHECK HERE */ }
        navigate("/"); // This will now work
    };

    return (
        <div className="container mt-5 shadow-lg p-5 rounded-4 bg-white">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="text-center mb-4">
                        <div className="bg-light d-inline-block p-3 rounded-circle mb-3">
                            <IoMdPersonAdd size={60} className="text-primary" />
                        </div>
                        <h2 className="fw-bold">Sign Up</h2>
                        <p className="text-muted">
                            Create an account or{' '}
                            <Link to="/login" className="text-primary text-decoration-none fw-bold">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleCreateAccount}>
                        {/* Wrapper for side-by-side inputs */}
                        <div className="mb-4 row align-items-center">

                            {/* First Name */}
                            <label className="col-sm-4 col-form-label fw-bold small text-sm-end text-start">First Name</label>
                            <div className="col-sm-8 mb-3">
                                <input type="text" className="form-control input-underline shadow-none" required />
                            </div>

                            {/* Last Name */}
                            <label className="col-sm-4 col-form-label fw-bold small text-sm-end text-start">Last Name</label>
                            <div className="col-sm-8 mb-3">
                                <input type="text" className="form-control input-underline shadow-none" required />
                            </div>

                            {/* TU Email */}
                            <label className="col-sm-4 col-form-label fw-bold small text-sm-end text-start">TU Email</label>
                            <div className="col-sm-8 mb-3">
                                <input type="email" className="form-control input-underline shadow-none" required />
                            </div>

                            {/* Onecard ID */}
                            <label className="col-sm-4 col-form-label fw-bold small text-sm-end text-start">Onecard ID</label>
                            <div className="col-sm-8 mb-3">
                                <input type="text" className="form-control input-underline shadow-none" required />
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-lg fw-bold shadow-sm px-5 rounded-pill">
                                Create Account
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default CreateAccount;

