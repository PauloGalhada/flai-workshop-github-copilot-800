import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts component: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts component: error fetching data', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <i className="me-2">&#127947;</i> Workouts
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
                  <th>Workout Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">No workouts found.</td>
                  </tr>
                ) : (
                  workouts.map((workout, idx) => (
                    <tr key={workout._id || workout.id}>
                      <td><span className="rank-number">{idx + 1}</span></td>
                      <td>
                        <strong>{workout.name}</strong>
                      </td>
                      <td className="text-muted">{workout.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted text-end">
        <small>{workouts.length} workout{workouts.length !== 1 ? 's' : ''} total</small>
      </div>
    </div>
  );
}

export default Workouts;
