import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill all fields.' });
      return;
    }

    try {
      const response = await fetch('https://xeno-crm-backend-zlmh.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Signup successful!' });
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Signup failed. Try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Signup failed. Try again.' });
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/photo-1748630312862-fbbd301ed17f.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1.3)',
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          zIndex: 1,
        }}
      />

      {/* Centered Signup Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="signup-card">
          <h1>Sign Up</h1>
          <p>Create your Xeno CRM account</p>

          {message && (
            <div
              style={{
                marginBottom: '16px',
                color: message.type === 'error' ? '#f87171' : '#22c55e',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
