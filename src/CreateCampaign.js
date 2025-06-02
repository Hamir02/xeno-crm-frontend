import React, { useState } from 'react';
import axios from 'axios';

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [field, setField] = useState('');
  const [operator, setOperator] = useState('');
  const [value, setValue] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaign = {
      campaignName,
      rules: [
        {
          field,
          operator,
          value: Number(value),
        },
      ],
    };

    try {
      const res = await axios.post('http://localhost:3000/api/campaigns', campaign);
      alert('Campaign created ✅');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to create campaign ❌');
    }
  };

  const getAISuggestion = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/ai/generate-message', {
        audienceDescription: `Users with ${field} ${operator} ${value}`,
      });
      setAiMessage(res.data.message);
    } catch (error) {
      alert('AI failed to generate message ❌');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Campaign</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Campaign Name"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Field (e.g., totalSpend)"
          value={field}
          onChange={(e) => setField(e.target.value)}
          required
        /><br /><br />

        <input
          type="text"
          placeholder="Operator (e.g., >, <, =)"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
        /><br /><br />

        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Create Campaign</button>
      </form>

      <hr />

      <button onClick={getAISuggestion}>🤖 Generate AI Message</button><br /><br />
      {loading && <p>Loading AI message...</p>}
      {aiMessage && (
        <div style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '5px' }}>
          <strong>AI Suggested Message:</strong>
          <p>{aiMessage}</p>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
