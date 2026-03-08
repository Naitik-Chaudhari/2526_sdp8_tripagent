import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Navbar from "./components/common/Navbar";
import AuthSync from "./components/common/AuthSync";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DiscoverForm from "./pages/DiscoverForm";
import DiscoverResult from "./pages/DiscoverResult";
import TripPlan from "./pages/TripPlan";
import FlightSearchForm from "./pages/FlightSearchForm";
import FlightResults from "./pages/FlightResults";
import HotelSearchForm from "./pages/HotelSearchForm";
import HotelResults from "./pages/HotelResults";

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Hide navbar on login and signup pages
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {!hideNavbar && (
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      {/* Ensure Clerk user is synced to backend when signed in */}
      <AuthSync />
      <main className="pt-20 px-6">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/discover"
            element={
              <>
                <SignedIn>
                  <DiscoverForm />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/discover-result"
            element={
              <>
                <SignedIn>
                  <DiscoverResult />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/plan-trip"
            element={
              <>
                <SignedIn>
                  <TripPlan />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route path="/flight-search" element={<FlightSearchForm />} />
          <Route path="/flight-results" element={<FlightResults />} />
          <Route path="/hotel-results" element={<HotelResults />} />
          <Route path="/hotel-search" element={<HotelSearchForm />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
