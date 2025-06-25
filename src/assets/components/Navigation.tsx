import React, { useState } from 'react';
import { Menu, X, User, UserPlus, Calendar } from 'lucide-react';

interface NavigationProps {
  onBookingClick?: () => void;
  onHomeClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onBookingClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={onHomeClick}
              className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Balanse
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={onHomeClick}
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <a href="#services" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                Classes
              </a>
              <a href="#instructors" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                Instructors
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
                Reviews
              </a>
              <button 
                onClick={onBookingClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Calendar size={16} />
                <span>Book Class</span>
              </button>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">
              <User size={16} />
              <span>Log In</span>
            </button>
            <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              <UserPlus size={16} />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={onHomeClick}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full text-left"
              >
                Home
              </button>
              <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
                Classes
              </a>
              <a href="#instructors" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
                Instructors
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600">
                Reviews
              </a>
              <button 
                onClick={onBookingClick}
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full"
              >
                <Calendar size={16} />
                <span>Book Class</span>
              </button>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <button className="flex items-center justify-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium">
                    <User size={16} />
                    <span>Log In</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;