import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from './context/UserContext/UserContext'
import LoginPage from './pages/LoginPage/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';

function App() {

  return (
    <BrowserRouter>
      <UserStorage>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
