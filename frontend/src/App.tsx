import { Route, Routes } from "react-router";
import HomeView from "./views/HomeView";
import ProfileView from "./views/ProfileView";
import ProductView from "./views/ProductView";
import EditProductView from "./views/EditProductView";
import CreateProductView from "./views/CreateProductView";
import AppLayout from "./layouts/AppLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAppStore } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { theme } = useAppStore();


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeView />} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateProductView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditProductView />{" "}
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/auth/login" element={<LoginView  />} />
        <Route
          path="/auth/register"
          element={<RegisterView  />}
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
