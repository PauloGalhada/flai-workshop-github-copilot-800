import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import logo from './logo.svg';

const NAV_ITEMS = [
  { path: '/users',       label: 'Users' },
  { path: '/teams',       label: 'Teams' },
  { path: '/activities',  label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts',    label: 'Workouts' },
];

function App() {
  return (
    <Router>
      <div className="octofit-page">
        {/* ── Navbar ── */}
        <nav className="navbar navbar-expand-lg octofit-navbar">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} alt="OctoFit logo" />
              OctoFit Tracker
            </NavLink>
            <button
              className="navbar-toggler border-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
              aria-controls="mainNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNav">
              <ul className="navbar-nav ms-auto">
                {NAV_ITEMS.map(({ path, label }) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      className={({ isActive }) =>
                        'nav-link' + (isActive ? ' active' : '')
                      }
                      to={path}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ── Page content ── */}
        <main className="container py-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="octofit-hero text-center">
                  <img src={logo} alt="OctoFit" style={{ width: 80, marginBottom: 16 }} />
                  <h1>Welcome to OctoFit Tracker</h1>
                  <p className="lead mt-2">
                    Track your fitness activities, manage teams, and compete on the leaderboard.
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                    {NAV_ITEMS.map(({ path, label }) => (
                      <NavLink key={path} to={path} className="btn btn-light btn-sm fw-semibold">
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              }
            />
            <Route path="/users"       element={<Users />} />
            <Route path="/teams"       element={<Teams />} />
            <Route path="/activities"  element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts"    element={<Workouts />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer className="text-center text-muted py-3 border-top mt-auto">
          <small>OctoFit Tracker &copy; {new Date().getFullYear()}</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
