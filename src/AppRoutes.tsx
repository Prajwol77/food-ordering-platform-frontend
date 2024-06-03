import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/layouts/layout.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import {
  AdminPage,
  AuthCallbackPage,
  UserProfilePage,
  HomePage,
  ManageRestaurantPage,
  AdminUserManagementPage,
} from "./pages";
import AdminLayout from "./layouts/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <AdminPage />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/dashboard/user"
          element={
            <Layout>
              <AdminUserManagementPage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
