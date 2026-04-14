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
import useUserSinc from "./hooks/useUserSinc";

const App = () => {
  const { theme } = useAppStore();
  const { refetch } = useUserSinc();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomeView />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/create" element={<CreateProductView />} />
          <Route path="/edit/:id" element={<EditProductView />} />
        </Route>
        <Route path="/auth/login" element={<LoginView refetch={refetch} />} />
        <Route
          path="/auth/register"
          element={<RegisterView refetch={refetch} />}
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;