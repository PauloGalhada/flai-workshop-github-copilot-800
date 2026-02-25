import React, { useState, useEffect } from 'react';

function parseMembers(members) {
  if (Array.isArray(members)) return members;
  if (typeof members === 'string') {
    return members
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map((m) => m.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }
  return [];
}

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams component: fetched data', data);
        const raw = Array.isArray(data) ? data : data.results || [];
        setTeams(raw.map((t) => ({ ...t, members: parseMembers(t.members) })));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams component: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <i className="me-2">&#128101;</i> Teams
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger m-3">Error: {error}</div>}
        {loading ? (
          <div className="octofit-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Members</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">No teams found.</td>
                  </tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team._id || team.id || team.name}>
                      <td><span className="rank-number">{idx + 1}</span></td>
                      <td>
                        <strong>{team.name}</strong>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {team.members.map((m) => (
                            <span key={m} className="badge bg-secondary octofit-badge">
                              {m.username || m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-info text-dark octofit-badge">
                          {team.members.length}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        <small>{teams.length} team{teams.length !== 1 ? 's' : ''} total</small>
      </div>
    </div>
  );
}

export default Teams;
