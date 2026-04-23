import React from "react";

const AIChatPage = () => {
    return (
        <div className="d-flex flex-column vh-100 bg-light">
            

            <div className="flex-grow-1 overflow-auto p-4" style={{ paddingBottom: '100px' }}>
                <div className="container max-width-md">
                    
        
                    <div className="d-flex mb-4">
                        <div className="bg-white shadow-sm p-3 rounded-4 border" style={{ maxWidth: '80%' }}>
                            <p className="mb-0 fw-semibold text-primary small mb-1">CampusCart AI</p>
                            <p className="mb-0">Hello! I can help you find gear for your Towson courses. What are you looking for today?</p>
                        </div>
                    </div>

                </div>
            </div>

     
            <div className="fixed-bottom bg-white border-top p-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6">
                            <div className="input-group shadow-sm" style={{ borderRadius: '50px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
                                <input 
                                    type="text" 
                                    className="form-control border-0 p-3 ps-4 shadow-none" 
                                    placeholder="Message CampusCart AI..." 
                                />
                                <button className="btn btn-primary px-4 fw-bold">
                                    Send
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                    AI can make mistakes. Verify important course requirements.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AIChatPage;