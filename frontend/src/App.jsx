import {  Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import HomeView from "./views/HomeView";
import ProfileView from "./views/ProfileView";
import ProductView from "./views/ProductView";
import EditProductView from "./views/EditProductView";
import CreateProductView from "./views/CreateProductView";

const App = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomeView/>} />
          <Route path="/product/:id" element={<ProductView/>} />
          <Route path="/profile" element={<ProfileView/>} />
          <Route path="/create" element={<CreateProductView/>} />
          <Route path="/edit/:id" element={<EditProductView/>} />
        </Routes>
      </main>
     
    </div>
  );
};

export default App;
