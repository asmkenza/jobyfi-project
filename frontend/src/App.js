import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile/Profile';
import AddJob from './pages/AddJob/AddJob';
import AllJobs from './pages/AllJobs/AllJobs';
import Stats from './pages/Stats/Stats';

function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="profile" element={<Profile />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
