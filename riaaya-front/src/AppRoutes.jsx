import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

import MainLayout from './Layouts/MainLayout';
import Login from './Components/Login';
import PrivateRoute from './PrivateRoute';
import DashBoardLayout from './Layouts/DashBoardLayout';
import AdminDashboard from './Components/Dashboard';
import DoctorDashboard from './Components/DoctorDashboard';
import Users from './Pages/users';
import Settings from './Pages/Settings';
import PublicRoute from './PublicRoutes';
import Appointments from './Components/Appointmenets';
import AcceptedAppointments from './Components/AppointmenetsAccepted';
import PaymentResult from './Pages/PaymentResult';

export default function AppRoutes() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Routes>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />} />
      </Route>
      
      <Route path="/payment-result" element={<PaymentResult />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" />
      </Route>

      {
        isLoggedIn && user?.role === 'Admin' && (
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        )
      }

      {
        isLoggedIn && user?.role === 'doctor' && (
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashBoardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DoctorDashboard />} />
            <Route path="rendez-vous" element={<Appointments />} />
            <Route path="rendez-vous-accepted" element={<AcceptedAppointments />} />
            <Route path="settings" element={<Settings />} />


            {/* Ajoute ici d’autres routes spécifiques au docteur */}
          </Route>
        )
      }
    </Routes >
  );
}

