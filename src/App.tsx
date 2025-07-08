
import Navigation  from "./assets/components/Navigation";
import Hero from "./assets/components/Hero";
import Services from "./assets/components/Services";
import Instructors from "./assets/components/Instructors";
import Testimonials from "./assets/components/Testimonials";
import Footer from "./assets/components/Footer";
import BookingPage from "./assets/components/booking/BookingPage";
import { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'booking'>('home');

  const handleBookingClick = () => {
    setCurrentPage('booking');
  };

  const handleHomeClick = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'booking') {
    return (
      <div className="min-h-screen">
        <Navigation onHomeClick={handleHomeClick} />
        <BookingPage />
      </div>
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