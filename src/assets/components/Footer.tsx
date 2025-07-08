import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Balanse
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your mind, body, and spirit with our expert-led yoga classes. 
              Find your inner balance and join our wellness community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Classes</a></li>
              <li><a href="#instructors" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Instructors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Schedule</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Classes</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Vinyasa Flow</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Hatha Yoga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Power Yoga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Restorative Yoga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Hot Yoga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">Meditation</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">123 Wellness Street</p>
                  <p className="text-gray-400">Mindful City, MC 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-400">(555) 123-YOGA</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-gray-400">hello@balanse.com</p>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Studio Hours</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Monday - Friday: 6:00 AM - 10:00 PM</p>
                <p>Saturday: 7:00 AM - 8:00 PM</p>
                <p>Sunday: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Balanse Yoga Studio. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;