import React, { useState } from "react";
import lemonpayLogo from './LemonPay Logo.png'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");   

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        // You can store the token if needed: localStorage.setItem('token', data.token);
        localStorage.setItem('token', data.token);
        console.log("Token:", data.token);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(120deg, #e0e7ff 0%, #a5b4fc 100%)"
    }}>
      <div style={{
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        display: "flex",
        width: "900px",
        minHeight: "500px",
        overflow: "hidden"
      }}>
        {/* Left Side */}
        <div style={{
          flex: 1,
          background: "linear-gradient(120deg, #f9fafb 0%, #c7d2fe 100%)",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <img src={lemonpayLogo} alt="lemonpay" style={{height: "200px"}} />
             <h2 style={{ color: "#6d28d9", fontWeight: 700, marginBottom: 10 }}>
            Join 1000<sup>+</sup> Businesses
          </h2>
          <h3 style={{ color: "#facc15", fontWeight: 500, marginBottom: 10 }}>
            Powering Growth with Lemonpay!
          </h3>
        </div>
        {/* Right Side */}
        <div style={{
          flex: 1.2,
          background: "linear-gradient(120deg, #6366f1 0%, #818cf8 100%)",
          color: "white",
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <h2 style={{ marginBottom: 10 }}>Welcome Login System</h2>
          <p style={{ marginBottom: 30, color: "#e0e7ff" }}>
            Your gateway to seamless transactions and easy payments.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label>Email</label>
              <input
                type="email"
                placeholder="mahadev@lemonpay.tech"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "none",
                  marginTop: 5,
                  background: "#ede9fe"
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "none",
                  marginTop: 5,
                  background: "#ede9fe"
                }}
              />
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20
            }}>
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ marginRight: 5 }}
                />
                Remember me
              </label>
              <a href="#" style={{ color: "#fbbf24", textDecoration: "none" }}>Sign Up</a>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                background: "#fbbf24",
                color: "#3730a3",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer"
              }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;