import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';
import Auth from './pages/Auth';
import CreateTrip from './pages/CreateTrip';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Background Decorators */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>

        <Navbar />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/trips/create" element={
            <ProtectedRoute>
              <CreateTrip />
            </ProtectedRoute>
          } />
          <Route path="/trip/:id" element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
