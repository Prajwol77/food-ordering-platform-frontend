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
  AdminRestaurantManagementPage,
  AdminRestaurantFullDetailsPage,
} from "./pages";
import AdminLayout from "./layouts/AdminLayout";
import SearchPage from "@/pages/SearchPage.tsx";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";

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
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />

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

        <Route element={<AdminProtectedRoute />}>
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
              <AdminLayout>
                <AdminUserManagementPage />
              </AdminLayout>
            }
          />

          <Route
            path="/admin/dashboard/restaurant"
            element={
              <AdminLayout>
                <AdminRestaurantManagementPage />
              </AdminLayout>
            }
          />
        </Route>
        
        <Route
          path="/admin/dashboard/restaurant/:id"
          element={
            <AdminLayout>
              <AdminRestaurantFullDetailsPage />
            </AdminLayout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
