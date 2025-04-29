import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/0.auth/Login';
import ForgotPassword from './pages/0.auth/ForgotPassword';
import Dashboard from './pages/1.Dashboard/Dashboard';
import StudentsManagement from './pages/2.StudentsManagement/StudentsManagement';
import Grades from './pages/3.Grades/Grades';
import DirectMessages from './pages/4.DirectMessages/DirectMessages';
import Notifications from './pages/5.Notifications/Notifications';
import Settings from './pages/6.Settings/Settings';

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