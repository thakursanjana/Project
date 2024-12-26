import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import VIP from './pages/VIP';
import Recharge from './pages/Recharge';
import Withdrawal from './pages/Withdrawal';
import CustomerService from './pages/CustomerService';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="vip" element={<VIP />} />
          <Route path="recharge" element={<Recharge />} />
          <Route path="withdrawal" element={<Withdrawal />} />
          <Route path="customer-service" element={<CustomerService />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;