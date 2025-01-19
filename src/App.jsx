import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './components/Login';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Register from './components/Register';
import Chat from './components/Chat';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Перенаправление с корневого пути на страницу профиля */}
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
