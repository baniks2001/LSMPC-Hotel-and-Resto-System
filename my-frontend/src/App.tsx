import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Reserve from "./pages/Reserve";
import Order from "./pages/Order";
import AboutUs from "./pages/AboutUs";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import { useAuthStore } from "./components/store/authStore";
import SalesReport from "./pages/admin/Sales";

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);



  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Render Navbar only if not authenticated */}
        {!isAuthenticated && <Navbar />}

        <main>
          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                <Hero
                  firstPhrase="L-Live and S-Stay M-Make you this P-Place C-Comfortable."
                  secondPhrase="The Place Where You'd Rather be to Stay"
                />
              }
            />

            {/* Other Routes */}
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="/admin/sales" element={<SalesReport />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}
