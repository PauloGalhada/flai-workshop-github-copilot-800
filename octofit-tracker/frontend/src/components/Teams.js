import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams component: fetched data', data);
        const rawTeams = Array.isArray(data) ? data : data.results || [];
        // members may come back as a Python-list string e.g. "['ironman', 'thor']"
        const normalizedTeams = rawTeams.map((team) => ({
          ...team,
          members: Array.isArray(team.members)
            ? team.members
            : typeof team.members === 'string'
            ? team.members
                .replace(/^\[|\]$/g, '')
                .split(',')
                .map((m) => m.trim().replace(/^['"]|['"]$/g, ''))
                .filter(Boolean)
            : [],
        }));
        setTeams(normalizedTeams);
      })
      .catch((err) => {
        console.error('Teams component: error fetching data', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">Error: {error}</div>}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id || team.id || team.name}>
              <td>{team.name}</td>
              <td>
                {team.members
                  ? team.members.map((m) => m.username || m).join(', ')
                  : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
