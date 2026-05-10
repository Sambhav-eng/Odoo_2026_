import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [formData, setFormData] = useState({ name: '', description: '', start_date: '', end_date: '', cover_photo: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const response = await fetch('http://localhost:5001/api/trips', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error creating trip');
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="gradient-text" style={{ marginBottom: '32px' }}>Plan a New Trip</h2>
      
      {error && <div className="error-card" style={{ padding: '12px', marginBottom: '24px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="text" name="name" placeholder="Trip Name (e.g. Summer in Paris)" value={formData.name} onChange={handleChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
        <textarea name="description" placeholder="Description or Notes" value={formData.description} onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', minHeight: '100px' }}></textarea>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Start Date</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>End Date</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
          </div>
        </div>

        <input type="url" name="cover_photo" placeholder="Cover Photo URL (optional)" value={formData.cover_photo} onChange={handleChange} style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />

        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTrip;
