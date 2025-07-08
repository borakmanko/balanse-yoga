import React from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Rated #1 Yoga Studio
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Inner Balance
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your mind, body, and spirit with our expert-led yoga classes. 
              Join thousands who have discovered their path to wellness and inner peace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onBookingClick}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-full hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Book Your First Class
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-full hover:bg-emerald-50 transition-all duration-200">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Expert Instructors</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">4.9</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Yoga practice"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-emerald-600 fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9/5 Rating</div>
                    <div className="text-sm text-gray-600">From 500+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;