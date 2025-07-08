import React, { useState, useEffect } from 'react';
import { Menu, X, User, UserPlus, Calendar, Heart, LogOut } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../types/user';
import { getUserProfile } from '../../services/database';
import ProfileEdit from './profile/ProfileEdit';

interface NavigationProps {
  onBookingClick?: () => void;
  onHomeClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onBookingClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  // Helper to scroll to section smoothly
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const getDisplayName = () => {
    if (userProfile) {
      return `${userProfile.firstName} ${userProfile.lastName}`;
    }
    return user?.displayName || user?.email || 'User';
  };

  const getGreeting = () => {
    if (userProfile) {
      return `Hi, ${userProfile.firstName}!`;
    }
    return 'Welcome!';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={onHomeClick}
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Balanse
              </span>
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
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Classes
              </button>
              <button
                onClick={() => scrollToSection('instructors')}
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Instructors
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Reviews
              </button>
              <button 
                onClick={onBookingClick}
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                <Calendar size={16} />
                <span>Book Class</span>
              </button>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 rounded-lg p-2 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-300">
                    {userProfile?.profilePicture ? (
                      <img
                        src={userProfile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-300 flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {getGreeting()}
                    </p>
                    <p className="text-xs text-gray-500">{getDisplayName()}</p>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={() => {
                        setShowProfileEdit(true);
                        setShowProfileMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a 
                  href="/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <User size={16} />
                  <span>Log In</span>
                </a>
                <a 
                  href="/signup"
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </a>
              </>
            )}
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
              <button
                onClick={() => scrollToSection('services')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full text-left"
              >
                Classes
              </button>
              <button
                onClick={() => scrollToSection('instructors')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full text-left"
              >
                Instructors
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full text-left"
              >
                Reviews
              </button>
              <button 
                onClick={onBookingClick}
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-emerald-600 w-full"
              >
                <Calendar size={16} />
                <span>Book Class</span>
              </button>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-300">
                        {userProfile?.profilePicture ? (
                          <img
                            src={userProfile.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-emerald-300 flex items-center justify-center">
                            <User className="w-4 h-4 text-emerald-600" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getGreeting()}</p>
                        <p className="text-xs text-gray-500">{getDisplayName()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileEdit(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <a 
                      href="/login"
                      className="flex items-center justify-center space-x-2 text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium"
                    >
                      <User size={16} />
                      <span>Log In</span>
                    </a>
                    <a 
                      href="/signup"
                      className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-800"
                    >
                      <UserPlus size={16} />
                      <span>Sign Up</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && userProfile && (
        <ProfileEdit
          profile={userProfile}
          onClose={() => setShowProfileEdit(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </nav>
  );
};

export default Navigation;