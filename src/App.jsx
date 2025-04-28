import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import StudentsManagement from './pages/StudentsManagement';
import Grades from './pages/Grades';
import DirectMessages from './pages/DirectMessages';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

// Layout
import Layout from './Layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsManagement />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/direct-messages" element={<DirectMessages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Redirect to login by default */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;