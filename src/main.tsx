import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "@/AppRoutes.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
// import AuthRouteProtected from "./auth/AuthRouteProtected";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        {/* <AuthRouteProtected> */}
        <AppRoutes />
        <Toaster visibleToasts={1} position="top-right" richColors />
        {/* </AuthRouteProtected> */}
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
