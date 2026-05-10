import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5001/api/trips/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Could not fetch trip details.');
        }
        const data = await response.json();
        setTrip(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container" style={{ minHeight: '60vh' }}>
        <div className="spinner"></div>
        <p>Loading trip details...</p>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="error-card" style={{ marginTop: '48px' }}>
        <h3>Trip Not Found</h3>
        <p>{error || "We couldn't find the trip you're looking for."}</p>
        <Link to="/" className="btn-outline" style={{ marginTop: '16px', display: 'inline-block', textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="trip-details-page">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      
      <div className="glass-card details-card">
        <div className="details-header" style={{
          backgroundImage: `linear-gradient(to bottom, transparent, rgba(15, 23, 42, 1)), url(${trip.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="details-title-container">
            <h1 className="gradient-text">{trip.place}</h1>
            <div className="details-badge">⭐ {trip.rating}</div>
          </div>
        </div>
        
        <div className="details-body">
          <div className="details-info">
            <h3>About this trip</h3>
            <p className="description">{trip.description}</p>
          </div>
          
          <div className="details-sidebar">
            <div className="glass-card price-card">
              <span className="price-label">Estimated Budget</span>
              <span className="price-value">₹{trip.budget.toLocaleString()}</span>
              <button className="btn-primary full-width" style={{ marginTop: '24px' }}>Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
