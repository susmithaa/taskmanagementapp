import React, { useState } from "react";
import lemonpayLogo from './LemonPay Logo.png';
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirm);
    console.log("Remember me:", remember);

    if (password !== confirm) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
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
        setMessage("Signup successful!");
        localStorage.setItem('signupResponse', JSON.stringify(data));
        console.log("Signup Response:", data);
      } else {
        setMessage(data.message || "Signup failed");
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
      background: '#fcfeff',
      background: 'linear-gradient(95deg, rgba(252, 254, 255, 1) 0%, rgba(30, 59, 163, 1) 50%)',
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
              position: "absolute",
              left: "-100px",
              bottom: "-50px",
              width: "240px",
              height: "240px",
              background: "radial-gradient(circle at 60% 40%, #fff 0%, #FDBC31 80%, #FDBC31 100%)",
              opacity: 0.35,
              borderRadius: "50%",
              zIndex: 0
            }} />
            {/* Right ellipse */}
            <div style={{
              position: "absolute",
              right: "-50px",
              top: "-100px",
              width: "260px",
              height: "260px",
              background: "radial-gradient(circle at 40% 60%, #fff 0%, #FDBC31 80%, #FDBC31 100%)",
              opacity: 0.35,
              borderRadius: "50%",
              zIndex: 0
            }} />
            {/* center bottom ellipse */}
            <div style={{
              position: "absolute",
              center: "-50px",
              bottom: "-100px",
              width: "240px",
              height: "240px",
              background: "radial-gradient(circle at 50% 50%, #fff 0%, #FDBC31 80%, #FDBC31 100%)",
              opacity: 0.35,
              borderRadius: "50%",
              zIndex: 0
            }} />
            <div
              className="header-logo"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                padding: "24px",
                zIndex: 1
              }}
            >
              <img src={lemonpayLogo} alt="lemonpay" style={{ height: 102.51, width: 329, top:50, left:27 }} />
            </div>
            <div className="form-section" style={{
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "space-between",
              zIndex: 1
            }}>
              <div className="description"
                style={{
                  marginTop: 200,
                }}
              >
                <div style={{ color: "#ffffff", fontWeight: 600, fontFamily: "Nunito", fontSize: 48, marginBottom: 10 }}>
                  Join 1000<sup>+</sup> Businesses
                </div>
                <div style={{ color: "#F9D535", fontWeight: 600, fontFamily: "Nunito", fontSize: 48, marginBottom: 10 }}>
      
                  Powering Growth with
                </div>
                <div style={{ color: "#F9D535", fontWeight: 600, fontFamily: "Nunito", fontSize: 48, marginBottom: 10 }}>
                  Lemonpay!
                </div>
              </div>
          <div className="form-container" style={{fontFamily: "Nunito"}}>
          <h2 style={{ marginBottom: 10, color: "#FFFFFF", fontSize: 40 }}>Welcome Sign Up System</h2>
          <p style={{ marginBottom: 30, color: "#FFFFFF", fontSize: 25 }}>
            Your gateway to seamless transactions and easy payments.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20, color: "#FFFFFF", fontSize: 18 }}>
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
            <div style={{ marginBottom: 20, color: "#FFFFFF", fontSize: 18 }}>
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
            <div style={{ marginBottom: 20, color: "#FFFFFF", fontSize: 18 }}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
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
              <label style={{ color: "#FFFFFF", fontSize: 17 }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ marginRight: 5, color: "#FFFFFF", fontSize: 17 }}
                />
                Remember me
              </label>
              <Link to="/" style={{ color: "#fbbf24", textDecoration: "none", color: "#FFFFFF", fontSize: 17 }}>
                Sign In
              </Link>
            </div>
            <button
              type="submit"
              style={{
                width: "103%",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                background: "#ffffff",
                color: "#000000",
                fontWeight: 700,
                fontSize: 18,
                cursor: "pointer"
              }} >
              Sign Up
            </button>
            {message && (
              <div className="mt-4 text-center bg-yellow-200 text-yellow-800 rounded py-2">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;