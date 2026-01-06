import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/Users/UserList';
import FooterList from './pages/Footer/FooterList';
import NavbarList from './pages/Navbar/NavbarList';
import PagesList from './pages/Pages/PagesList';
import PageEditor from './pages/Pages/PageEditor';
import MediaLibrary from './pages/Media/MediaLibrary';
import SiteSettings from './pages/Settings/SiteSettings';

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={
          <ProtectedRoute permission="users">
            <UserList />
          </ProtectedRoute>
        } />
        <Route path="footer" element={
          <ProtectedRoute permission="footer">
            <FooterList />
          </ProtectedRoute>
        } />
        <Route path="navbar" element={
          <ProtectedRoute permission="navbar">
            <NavbarList />
          </ProtectedRoute>
        } />
        <Route path="pages" element={
          <ProtectedRoute permission="pages">
            <PagesList />
          </ProtectedRoute>
        } />
        <Route path="pages/edit/:slug" element={
          <ProtectedRoute permission="pages">
            <PageEditor />
          </ProtectedRoute>
        } />
        <Route path="pages/new" element={
          <ProtectedRoute permission="pages">
            <PageEditor />
          </ProtectedRoute>
        } />
        <Route path="media" element={
          <ProtectedRoute permission="media">
            <MediaLibrary />
          </ProtectedRoute>
        } />
        <Route path="settings" element={
          <ProtectedRoute permission="settings">
            <SiteSettings />
          </ProtectedRoute>
        } />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;