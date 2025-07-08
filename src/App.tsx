
import Navigation  from "./assets/components/Navigation";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from "react";
import Hero from "./assets/components/Hero";
import Services from "./assets/components/Services";
import Instructors from "./assets/components/Instructors";
import Testimonials from "./assets/components/Testimonials";
import Footer from "./assets/components/Footer";
import BookingPage from "./assets/components/booking/BookingPage";
import { useState } from "react";
import AuthRoute from "./assets/components/auth/AuthRoute";

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleBookingClick = () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    setCurrentPage('booking');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your yoga journey...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'booking') {
    return (
      <AuthRoute>
        <div className="min-h-screen">
          <Navigation onHomeClick={handleHomeClick} />
          <BookingPage />
        </div>
      </AuthRoute>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation onBookingClick={handleBookingClick} />
      <Hero onBookingClick={handleBookingClick} />
      <Services onBookingClick={handleBookingClick} />
      <Instructors />
      <Testimonials onBookingClick={handleBookingClick} />
      <Footer />
    </div>
  );
}

export default App;