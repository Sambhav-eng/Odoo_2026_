import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const [tripsRes, recsRes] = await Promise.all([
          fetch('http://localhost:5001/api/trips', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5001/api/recommendations')
        ]);

        if (tripsRes.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }

        if (!tripsRes.ok) throw new Error('Failed to fetch trips');
        
        const tripsData = await tripsRes.json();
        const recsData = await recsRes.json();

        setTrips(tripsData);
        setRecommendations(recsData.recommended);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <main className="main-content">
      <header className="hero-section">
        <h2 className="gradient-text">Your Travel Dashboard</h2>
        <p>Manage your upcoming trips or get inspired by AI recommendations.</p>
        <Link to="/trips/create" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px', textDecoration: 'none' }}>
          + Plan New Trip
        </Link>
      </header>

      {error && <div className="error-card" style={{ marginBottom: '32px' }}>{error}</div>}

      <div className="dashboard-grid">
        <section className="trips-section">
          <div className="section-header">
            <h3>My Trips</h3>
            <span className="badge">{trips.length} planned</span>
          </div>
          
          {trips.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🧳</span>
              <h4 style={{ marginBottom: '8px' }}>No trips planned yet</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Click 'Plan New Trip' to start your first adventure!</p>
            </div>
          ) : (
            <div className="cards-grid">
              {trips.map(trip => (
                <div key={trip.id} className="glass-card trip-card">
                  <div className="card-image-placeholder" style={{
                    backgroundImage: trip.cover_photo ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${trip.cover_photo})` : 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                    {!trip.cover_photo && <span className="emoji">🗺️</span>}
                  </div>
                  <div className="card-content">
                    <div className="card-top">
                      <h4>{trip.name}</h4>
                      {trip.start_date && <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</div>}
                    </div>
                    <div className="card-bottom">
                      <Link to={`/trip/${trip.id}`} className="btn-outline" style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}>
                        Manage Trip
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="recommendations-section">
          <div className="glass-card ai-card">
            <div className="ai-header">
              <span className="ai-icon">✨</span>
              <h3>AI Inspirations</h3>
            </div>
            <p className="ai-subtitle">Trending global destinations</p>
            <ul className="recs-list">
              {recommendations.map((rec, index) => (
                <li key={index} className="rec-item">
                  <span className="rec-number">{index + 1}</span>
                  <span className="rec-name">{rec}</span>
                  <button className="btn-icon">→</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Home;
