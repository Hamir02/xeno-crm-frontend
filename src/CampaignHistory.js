import React, { useEffect, useState } from 'react';

function CampaignHistory() {
  const API_BASE = 'https://xeno-crm-backend-zlmh.onrender.com'; // ✅ Render backend base URL

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch saved campaigns
  useEffect(() => {
    fetch(`${API_BASE}/api/campaigns`)
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleGenerateSummary = async (campaign) => {
    setSummaryLoading(true);
    setSummary('');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/ai/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: 1000,
          delivered: 850,
          failed: 150,
          highSpenderRate: 78
        }) // Optional: you can use real stats if available
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setError('❌ Failed to generate summary.');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Backend error.');
    }

    setSummaryLoading(false);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', minHeight: '100vh', color: 'white' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>📈 Campaign History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        campaigns.map((campaign, idx) => (
          <div key={idx} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <p><strong>📛 Name:</strong> {campaign.campaignName}</p>
            <p><strong>📅 Created:</strong> {new Date(campaign.createdAt).toLocaleString()}</p>
            <p><strong>📋 Rules:</strong></p>
            <ul>
              {campaign.rules.map((rule, i) => (
                <li key={i}>{rule.field} {rule.operator} {rule.value}</li>
              ))}
            </ul>

            <button
              onClick={() => handleGenerateSummary(campaign)}
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              Generate AI Summary
            </button>

            {summaryLoading && <p>⏳ Generating...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {summary && (
              <div style={{ backgroundColor: '#f2f2f2', color: 'black', padding: '10px', marginTop: '10px', borderRadius: '6px' }}>
                <strong>📢 Summary:</strong>
                <p>{summary}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CampaignHistory;
