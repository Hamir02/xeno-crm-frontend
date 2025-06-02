import React, { useState } from 'react';

function SendCampaign() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSummary = async () => {
    setLoading(true);
    setError('');
    setSummary('');

    const stats = {
      total: 1000,
      delivered: 850,
      failed: 150,
      highSpenderRate: 93
    };

    console.log('📤 Sending stats payload:', stats); // 🧪 Debug log

    try {
      const res = await fetch('http://localhost:3000/api/ai/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stats)
      });

      const data = await res.json();

      if (data.summary) {
        setSummary(data.summary);
      } else {
        setError('❌ Failed to generate summary.');
      }
    } catch (err) {
      console.error('❌ Error sending request:', err);
      setError('❌ Error contacting backend.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📊 Campaign Performance Summary</h2>

      <button
        onClick={generateSummary}
        style={{ padding: '10px 20px', background: 'purple', color: 'white', borderRadius: '5px' }}
      >
        Generate AI Summary
      </button>

      {loading && <p>⏳ Generating summary...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {summary && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f2f2f2', borderRadius: '5px' }}>
          <strong>AI Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default SendCampaign;
