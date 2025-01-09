"use client";

import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || "Invalid credentials");
            }

            const { token } = await res.json();
            document.cookie = `token=${token}; path=/`; 
            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <form
                onSubmit={handleLogin}
                className="bg-card p-8 rounded-lg shadow-lg w-96"
            >
                <h1 className="text-2xl font-semibold mb-6 text-foreground">
                    Admin Login
                </h1>
                {error && (
                    <p className="text-destructive mb-4 text-sm">{error}</p>
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded bg-input text-foreground"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-4 border rounded bg-input text-foreground"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary-foreground"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
