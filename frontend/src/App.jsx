import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Loader from './components/common/Loader';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
    </Route>

    <Route
      path="/admin/login"
      element={
        <Suspense fallback={<Loader fullScreen />}>
          <AdminLogin />
        </Suspense>
      }
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route
        path="dashboard"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminDashboard />
          </Suspense>
        }
      />
      <Route
        path="products"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminProducts />
          </Suspense>
        }
      />
      <Route
        path="products/new"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminProductForm />
          </Suspense>
        }
      />
      <Route
        path="products/:id/edit"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminProductForm />
          </Suspense>
        }
      />
      <Route
        path="categories"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminCategories />
          </Suspense>
        }
      />
      <Route
        path="messages"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminMessages />
          </Suspense>
        }
      />
      <Route
        path="settings"
        element={
          <Suspense fallback={<Loader fullScreen />}>
            <AdminSettings />
          </Suspense>
        }
      />
    </Route>

    <Route path="*" element={<Layout />}>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
