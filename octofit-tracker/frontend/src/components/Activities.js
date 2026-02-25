import React, { useState, useEffect } from 'react';

const ACTIVITY_COLORS = {
  Running: 'bg-success',
  Cycling: 'bg-warning text-dark',
  Swimming: 'bg-info text-dark',
  Weightlifting: 'bg-danger',
  Yoga: 'bg-purple',
  default: 'bg-secondary',
};

function activityBadgeClass(type) {
  return ACTIVITY_COLORS[type] || ACTIVITY_COLORS.default;
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities component: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities component: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <i className="me-2">&#127939;</i> Activities
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
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">No activities found.</td>
                  </tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity._id || activity.id}>
                      <td><span className="rank-number">{idx + 1}</span></td>
                      <td>
                        <span className="badge bg-primary octofit-badge">
                          {activity.user ? activity.user.username || activity.user : '—'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge octofit-badge ${activityBadgeClass(activity.activity_type)}`}>
                          {activity.activity_type}
                        </span>
                      </td>
                      <td>{activity.duration}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        <small>{activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} total</small>
      </div>
    </div>
  );
}

export default Activities;
