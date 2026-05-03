import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const LogIn = () => {
    const navigate = useNavigate();

    const handleLoginClick = (e) => {
        e.preventDefault();
        {/* IMPLEMENT LOG IN CHECK HERE */}
        navigate("/");
    };

    return (
        <div className="container mt-5 shadow-lg p-5 rounded-4 ">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0 p-4">

                        <div className="text-center mb-4">
                            <div className="bg-light d-inline-block p-3 rounded-circle mb-3">
                                <RiAccountCircleFill  size={60} className="text-primary" />
                            </div>
                            <h2 className="fw-bold">Welcome</h2>
                            <p className="text-muted">Sign in to CampusCartAI</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLoginClick}>
                            <div className="mb-3">
                                <label className="form-label fw-bold small">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="yourname@towson.edu"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold small">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">
                                Sign In
                            </button>
                        </form>

                        <div className="mt-3 text-center">
                            <p>Don't have an account?</p>

                            {/* This makes it a Link that looks like a Button */}
                            <Link to="/register" className="btn btn-outline-primary w-100">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;