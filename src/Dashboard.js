import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  const API_BASE = 'https://xeno-crm-backend-zlmh.onrender.com'; // ✅ Render backend base URL

  const [rules, setRules] = useState([{ field: 'totalSpend', operator: 'gt', value: '' }]);
  const [campaignName, setCampaignName] = useState('');
  const [createMessage, setCreateMessage] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const [deliveryLogs, setDeliveryLogs] = useState([]);
  const [aiMessage, setAiMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  const fields = ['totalSpend', 'visits'];
  const operators = [
    { label: '>', value: 'gt' },
    { label: '<', value: 'lt' },
    { label: '>=', value: 'gte' },
    { label: '<=', value: 'lte' },
    { label: '=', value: 'eq' },
    { label: '!=', value: 'ne' },
  ];

  const handleRuleChange = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { field: 'totalSpend', operator: 'gt', value: '' }]);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/campaigns`, {
        campaignName,
        rules,
        aiMessage,
      });
      setCreateMessage('✅ Campaign saved!');
      setCampaignName('');
      setRules([{ field: 'totalSpend', operator: 'gt', value: '' }]);
      setAiMessage('');
    } catch (err) {
      setCreateMessage('❌ Error saving campaign');
      console.error(err);
    }
  };

  const handleSendCampaign = async () => {
    if (!campaignId) {
      setSendMessage('❌ Please enter a campaign ID');
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/api/send-campaign/${campaignId}`);
      setSendMessage(`✅ Sent to ${res.data.totalMatched} customers (Campaign: ${res.data.campaign})`);
      setDeliveryLogs(res.data.deliveryLogs);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.deliveryLogs) {
        setSendMessage('✅ Campaign sent, but with partial issues.');
        setDeliveryLogs(err.response.data.deliveryLogs);
      } else {
        setSendMessage('❌ Failed to send campaign');
      }
    }
  };

  const handleGenerateAIMessage = async () => {
    setLoading(true);
    try {
      const audienceDescription = rules.map(rule => `${rule.field} ${rule.operator} ${rule.value}`).join(' AND ');
      const res = await axios.post(`${API_BASE}/api/ai/generate-message`, { audienceDescription });
      setAiMessage(res.data.message);
    } catch (error) {
      alert('❌ Failed to generate AI message');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError('');
    try {
      const total = deliveryLogs.length;
      const delivered = deliveryLogs.filter(log => log.status === 'SENT').length;
      const failed = deliveryLogs.filter(log => log.status === 'FAILED').length;
      const highSpenderRate = 90;

      const res = await axios.post(`${API_BASE}/api/ai/summary`, {
        total,
        delivered,
        failed,
        highSpenderRate,
      });
      setSummary(res.data.summary);
    } catch (err) {
      setSummaryError('❌ Failed to generate summary');
      console.error(err);
    } finally {
      setSummaryLoading(false);
    }
  };

  if (!user) return <p style={{ textAlign: 'center', color: 'white' }}>Please login to access the dashboard</p>;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      {/* Top Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#1e293b', borderBottom: '1px solid #334155'
      }}>
        <h2 style={{ margin: 0 }}>📊 Xeno CRM</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/campaign-history" style={{ color: '#38bdf8', textDecoration: 'none' }}>View History</Link>
          <button onClick={onLogout} style={{
            backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 14px',
            borderRadius: '5px', cursor: 'pointer'
          }}>Logout</button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '40px 20px' }}>
        <h2>Create Campaign</h2>
        <form onSubmit={handleCreateSubmit}>
          <input type="text" placeholder="Campaign Name" value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)} required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px' }} />

          {rules.map((rule, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <select value={rule.field} onChange={(e) => handleRuleChange(index, 'field', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px' }}>
                {fields.map(f => <option key={f}>{f}</option>)}
              </select>
              <select value={rule.operator} onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '6px' }}>
                {operators.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
              </select>
              <input type="number" value={rule.value} onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
                placeholder="Value" required style={{ flex: 1, padding: '10px', borderRadius: '6px' }} />
            </div>
          ))}

          <button type="button" onClick={addRule}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px' }}>
            + Add Condition
          </button>

          <button type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px' }}>
            Save Campaign
          </button>
          <p>{createMessage}</p>
        </form>

        <hr style={{ margin: '30px 0', borderColor: '#334155' }} />

        <h2>🤖 Generate AI Campaign Message</h2>
        <button onClick={handleGenerateAIMessage}
          style={{ width: '100%', padding: '12px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px' }}
          disabled={loading}>
          {loading ? 'Generating...' : 'Generate Message'}
        </button>
        {aiMessage && (
          <div style={{ backgroundColor: '#ffffff', padding: '14px', marginTop: '10px', borderRadius: '6px', color: '#111827' }}>
            <strong>Suggested Message:</strong>
            <p>{aiMessage}</p>
          </div>
        )}

        <hr style={{ margin: '30px 0', borderColor: '#334155' }} />

        <h2>Send Campaign</h2>
        <input type="text" placeholder="Enter Campaign ID" value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '6px' }} />
        <button onClick={handleSendCampaign}
          style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Send Campaign
        </button>
        <p>{sendMessage}</p>
        {deliveryLogs.length > 0 && (
          <ul style={{ fontSize: '14px' }}>
            {deliveryLogs.map((log, i) => (
              <li key={i}>{log.customer} - {log.email} - <strong>{log.status}</strong></li>
            ))}
          </ul>
        )}

        <hr style={{ margin: '30px 0', borderColor: '#334155' }} />

        <h2>📊 Campaign Performance Summary</h2>
        <button onClick={generateSummary}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#9333ea',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
          disabled={summaryLoading}>
          {summaryLoading ? 'Generating summary...' : 'Generate AI Summary'}
        </button>
        {summaryError && <p style={{ color: 'red' }}>{summaryError}</p>}
        {summary && (
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '12px',
            marginTop: '10px',
            borderRadius: '6px',
            color: '#1e293b',
            fontWeight: '500'
          }}>
            <strong>📢 AI Summary:</strong>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
