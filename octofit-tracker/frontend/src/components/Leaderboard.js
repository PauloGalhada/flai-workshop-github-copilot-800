import React, { useState, useEffect } from 'react';

const MEDAL = ['🥇', '🥈', '🥉'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard component: fetched data', data);
        const raw = Array.isArray(data) ? data : data.results || [];
        // Sort by score descending
        setEntries([...raw].sort((a, b) => (b.score || 0) - (a.score || 0)));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard component: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <i className="me-2">&#127942;</i> Leaderboard
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
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">No entries found.</td>
                  </tr>
                ) : (
                  entries.map((entry, idx) => (
                    <tr key={entry._id || entry.id || idx}
                      className={idx === 0 ? 'table-warning fw-bold' : ''}>
                      <td>
                        <span className="rank-number">
                          {MEDAL[idx] || `#${idx + 1}`}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-primary octofit-badge">
                          {entry.username || (entry.user ? entry.user.username || entry.user : '—')}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success octofit-badge fs-6">
                          {entry.score}
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
        <small>{entries.length} competitor{entries.length !== 1 ? 's' : ''}</small>
      </div>
    </div>
  );
}

export default Leaderboard;
