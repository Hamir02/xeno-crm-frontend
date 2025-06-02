import React from 'react';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;

    try {
      const res = await fetch('https://xeno-crm-backend-zlmh.onrender.com/api/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('✅ Google Login Success:', data);
        alert(`Welcome, ${data.user.name}`);
        setUser(data.user);           // ✅ Store user
        navigate('/dashboard');       // ✅ Redirect to dashboard
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('❌ Login request failed:', err);
      alert('Login request failed');
    }
  };

  const handleError = () => {
    console.error('❌ Google Login Failed');
    alert('Google login failed');
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
          backgroundImage: "url('photo-1748630312862-fbbd301ed17f.avif')",
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

      {/* Login Card */}
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
        <div className="App">
          <h2>Xeno CRM</h2>
          <p>Powering Hyper-Personalized Campaigns</p>

          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

          <p style={{ marginTop: '20px', fontSize: '16px' }}>
            Don’t have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
