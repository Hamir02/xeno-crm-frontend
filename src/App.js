import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import CampaignHistory from './CampaignHistory';
import Signup from './Signup'; // ✅ Make sure this import is correct

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ Add this line */}
      <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
      <Route path="/campaign-history" element={<CampaignHistory />} />
    </Routes>
  );
}

export default App;
