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
  DetailPage,
  Maps,
  LoginPage,
  RegisterPage
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
      <Route
        path="/login"
        element={
          <Layout auth={true}>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout auth={true}>
            <RegisterPage />
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
      <Route
        path="/detail/restaurant/:restaurantId"
        element={
          <Layout showHero={false}>
            <DetailPage />
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

        <Route
          path="/admin/restaurant/:id"
          element={
            <Layout>
              <AdminRestaurantFullDetailsPage />
            </Layout>
          }
        />

        <Route
          path="/maps"
          element={
            <Layout>
              <Maps />
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
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
