import React, { useState } from 'react';

function IncidentList({ incidents }) {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expandedId, setExpandedId] = useState(null);

  const filteredIncidents = incidents.filter(incident => {
    return filter === 'All' || incident.severity === filter;
  });

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortOrder === 'Newest') {
      return new Date(b.reported_at) - new Date(a.reported_at);
    } else {
      return new Date(a.reported_at) - new Date(b.reported_at);
    }
  });

  const toggleDescription = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="list-container">
      <div className="controls">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All Severities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {sortedIncidents.map((incident) => (
        <div key={incident.id} className="incident-card">
          <h3>{incident.title}</h3>
          <p><strong>Severity:</strong> {incident.severity}</p>
          <p><strong>Reported Date:</strong> {new Date(incident.reported_at).toLocaleDateString()}</p>
          <button onClick={() => toggleDescription(incident.id)}>
            {expandedId === incident.id ? 'Hide Details' : 'View Details'}
          </button>
          {expandedId === incident.id && (
            <p className="description">{incident.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default IncidentList;
