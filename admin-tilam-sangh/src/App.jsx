import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TenderList from './pages/Tenders/TenderList';
import GalleryList from './pages/Gallery/GalleryList';
import VideoList from './pages/Videos/VideoList';
import UserList from './pages/Users/UserList';
import FooterList from './pages/Footer/FooterList';
import NavbarList from './pages/Navbar/NavbarList';
import PagesList from './pages/Pages/PagesList';
import PageEditor from './pages/Pages/PageEditor';
import MediaLibrary from './pages/Media/MediaLibrary';

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
        <Route path="tenders" element={<TenderList />} />
        <Route path="gallery" element={<GalleryList />} />
        <Route path="videos" element={<VideoList />} />
        <Route path="users" element={<UserList />} />
        <Route path="footer" element={<FooterList />} />
        <Route path="navbar" element={<NavbarList />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/edit/:slug" element={<PageEditor />} />
        <Route path="pages/new" element={<PageEditor />} />
        <Route path="media" element={<MediaLibrary />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;