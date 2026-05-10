import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="logo-icon">✈️</span>
          <h1>TravelLoop</h1>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        {token ? (
          <>
            <Link to="/trips/create" className={location.pathname === '/trips/create' ? 'active' : ''}>Plan Trip</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Hi, {user?.name?.split(' ')[0] || 'Traveler'}</span>
              <button onClick={handleLogout} className="btn-outline">Sign Out</button>
            </div>
          </>
        ) : (
          <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
