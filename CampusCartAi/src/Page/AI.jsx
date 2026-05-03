import React, { useState } from "react";

const AIChatPage = () => {
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! I can help you find gear for your Towson courses. What are you looking for today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { sender: "ai", text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: "ai", text: "Sorry, I'm having trouble connecting. Please try again." }]);
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className="d-flex flex-column vh-100 bg-light">
            <div className="flex-grow-1 overflow-auto p-4" style={{ paddingBottom: '100px' }}>
                <div className="container" style={{ maxWidth: '700px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`d-flex mb-4 ${msg.sender === "user" ? "justify-content-end" : ""}`}>
                            <div
                                className={`shadow-sm p-3 rounded-4 border ${msg.sender === "user" ? "bg-primary text-white" : "bg-white"}`}
                                style={{ maxWidth: '80%' }}
                            >
                                {msg.sender === "ai" && (
                                    <p className="mb-1 fw-semibold text-primary small">CampusCart AI</p>
                                )}
                                <p className="mb-0">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="d-flex mb-4">
                            <div className="bg-white shadow-sm p-3 rounded-4 border">
                                <p className="mb-1 fw-semibold text-primary small">CampusCart AI</p>
                                <p className="mb-0 text-muted">Typing...</p>
                            </div>
                        </div>
                    )}
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
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button className="btn btn-primary px-4 fw-bold" onClick={sendMessage}>
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