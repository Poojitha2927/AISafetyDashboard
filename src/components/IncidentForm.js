import React, { useState } from 'react';

function IncidentForm({ addIncident }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }
    const newIncident = {
      title,
      description,
      severity,
      reported_at: new Date().toISOString()
    };
    addIncident(newIncident);
    setTitle('');
    setDescription('');
    setSeverity('Low');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Report New Incident</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default IncidentForm;
