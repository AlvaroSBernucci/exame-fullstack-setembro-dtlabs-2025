import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './context/UserContext/UserContext';
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import DevicesRegisterPage from './pages/DevicesRegisterPage/DevicesRegisterPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
                <DevicesRegisterPage />
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
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
