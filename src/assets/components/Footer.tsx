import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">Balanse</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your sanctuary for mindful movement, inner peace, and holistic wellness. 
              Join our community and discover the transformative power of yoga.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-emerald-400 transition-colors">Classes</a></li>
              <li><a href="#instructors" className="text-gray-300 hover:text-emerald-400 transition-colors">Instructors</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-emerald-400 transition-colors">Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Workshops</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-gray-300">123 Wellness Avenue</p>
                  <p className="text-gray-300">Mindful City, MC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-emerald-400" />
                <p className="text-gray-300">(555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-emerald-400" />
                <p className="text-gray-300">hello@balanse.com</p>
              </div>
            </div>
          </div>

          {/* Studio Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Studio Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock size={18} className="text-emerald-400" />
                <div>
                  <p className="text-gray-300 text-sm">Monday - Friday</p>
                  <p className="text-gray-300 text-sm">6:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="ml-6">
                <p className="text-gray-300 text-sm">Saturday - Sunday</p>
                <p className="text-gray-300 text-sm">7:00 AM - 7:00 PM</p>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-300 mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="bg-emerald-600 px-4 py-2 rounded-r-lg hover:bg-emerald-700 transition-colors">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Balanse Yoga Studio. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;