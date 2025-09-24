import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserStorage } from './context/UserContext/UserContext';
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import DevicesRegisterPage from './pages/DevicesRegisterPage/DevicesRegisterPage';
import { ToastContainer } from 'react-toastify';
import DeviceDataPage from './pages/DeviceDataPage/DeviceDataPage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';

function AppContent() {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

  return (
    <>
      {!hideHeader && <Header />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/devices"
          element={
            <PrivateRoute>
              <DevicesRegisterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/device-data"
          element={
            <PrivateRoute>
              <DeviceDataPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <AppContent />
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
