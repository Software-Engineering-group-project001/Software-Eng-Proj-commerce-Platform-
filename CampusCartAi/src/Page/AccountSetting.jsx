import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShop, AiOutlineLogout, AiOutlineHistory, AiOutlineCreditCard } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";

import LogIn from "./LogIn";

const Account = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        navigate("/login");
    }
    const handleSwitchToSeller = () => {
        navigate("/seller-dashboard");
    }
    const handleOrderHistory = () => {
        navigate("/orders");
    }
    const handlePayments = () => {
        navigate("/payments");
    }

    return (
        <div className="container shadow-lg p-5 rounded-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="card shadow-sm border-0 p-4 text-center mb-4">
                        <div className="bg-light d-inline-block p-3 rounded-circle mb-3">
                            <MdManageAccounts size={60} className="text-primary" />
                        </div>
                        <h2 className="fw-bold">My Account</h2>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-6">
                            <button className="btn btn-white w-100 shadow-sm border py-3" onClick={handleOrderHistory}>
                                <AiOutlineHistory size={25} className="text-info mb-2" />
                                <div className="fw-bold small">Orders</div>
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-white w-100 shadow-sm border py-3" onClick={handlePayments}>
                                <AiOutlineCreditCard size={25} className="text-info mb-2" />
                                <div className="fw-bold small">Payments</div>
                            </button>
                        </div>
                    </div>


                    <div className="card shadow-sm border-0 p-3">
                        <div className="d-flex flex-row gap-3">
                            <button
                                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-3 flex-grow-1"
                                onClick={handleSwitchToSeller}
                            >
                                <AiOutlineShop size={24} />
                                <span className="fw-bold">Seller Mode</span>
                            </button>

                            <button
                                className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-3 flex-grow-1"
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout size={24} />
                                <span className="fw-bold">Log Out</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Account;