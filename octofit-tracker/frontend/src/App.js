import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';

const NAV_ITEMS = [
  { path: '/users',       label: 'Users',       icon: '👤' },
  { path: '/teams',       label: 'Teams',       icon: '👥' },
  { path: '/activities',  label: 'Activities',  icon: '🏃' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { path: '/workouts',    label: 'Workouts',    icon: '🏋️' },
];

const FEATURES = [
  { icon: '📊', title: 'Track Activities',  desc: 'Log runs, cycling, swimming and more with detailed stats.' },
  { icon: '👥', title: 'Build Teams',       desc: 'Create squads and compete together for the top spot.' },
  { icon: '🏆', title: 'Climb the Board',   desc: 'Earn points and rise through the competitive leaderboard.' },
  { icon: '💪', title: 'Get Workouts',      desc: 'Discover personalised workout suggestions to stay fit.' },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <div className="octofit-hero text-center">
        <div className="octofit-hero-glow" />
        <img src={logo} alt="OctoFit" className="octofit-hero-logo animate-float" />
        <h1 className="animate-fade-in">Welcome to OctoFit Tracker</h1>
        <p className="lead mt-2 animate-fade-in-delay">
          Track your fitness activities, manage teams, and compete on the leaderboard.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          {NAV_ITEMS.map(({ path, label, icon }) => (
            <NavLink key={path} to={path} className="btn btn-hero">
              <span className="me-1">{icon}</span> {label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="row g-4 mt-4 mb-3">
        {FEATURES.map(({ icon, title, desc }) => (
          <div className="col-sm-6 col-lg-3" key={title}>
            <div className="card octofit-feature-card h-100">
              <div className="card-body text-center">
                <div className="octofit-feature-icon">{icon}</div>
                <h5 className="mt-3">{title}</h5>
                <p className="text-secondary small mb-0">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="octofit-page">
        {/* ── Navbar ── */}
        <nav className="navbar navbar-expand-lg octofit-navbar sticky-top">
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
              <ul className="navbar-nav ms-auto gap-1">
                {NAV_ITEMS.map(({ path, label, icon }) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      className={({ isActive }) =>
                        'nav-link' + (isActive ? ' active' : '')
                      }
                      to={path}
                    >
                      <span className="nav-icon me-1">{icon}</span>{label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* ── Page content ── */}
        <main className="container py-4 animate-slide-up">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users"       element={<Users />} />
            <Route path="/teams"       element={<Teams />} />
            <Route path="/activities"  element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts"    element={<Workouts />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer className="octofit-footer text-center">
          <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <img src={logo} alt="" style={{ width: 24, borderRadius: '50%' }} />
              <small>OctoFit Tracker &copy; {new Date().getFullYear()}</small>
            </div>
            <small>Built with ❤️ by Mergington High</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
