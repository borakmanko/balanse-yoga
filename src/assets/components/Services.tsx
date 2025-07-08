import React from 'react';
import { Heart, Users, Clock, Award, Zap, Moon } from 'lucide-react';

interface ServicesProps {
  onBookingClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookingClick }) => {
  const services = [
    {
      icon: Heart,
      title: 'Hatha Yoga',
      description: 'Gentle, slow-paced yoga focusing on basic postures and breathing techniques.',
      duration: '60 min',
      level: 'Beginner',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Vinyasa Flow',
      description: 'Dynamic sequences that link movement and breath in a flowing practice.',
      duration: '75 min',
      level: 'Intermediate',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Ashtanga',
      description: 'Traditional, vigorous style of yoga with a set sequence of poses.',
      duration: '90 min',
      level: 'Advanced',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Moon,
      title: 'Restorative Yoga',
      description: 'Relaxing practice using props to support the body in restful poses.',
      duration: '60 min',
      level: 'All Levels',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Users,
      title: 'Hot Yoga',
      description: 'Yoga practiced in a heated room to enhance flexibility and detoxification.',
      duration: '60 min',
      level: 'Intermediate',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Power Yoga',
      description: 'Fitness-based vinyasa practice with strength-building poses.',
      duration: '45 min',
      level: 'Advanced',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Yoga Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect class for your journey. From gentle beginners' sessions 
            to challenging advanced practices, we have something for everyone.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {service.duration}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${service.color} text-white`}>
                        {service.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of students who have transformed their lives through yoga
            </p>
            <button
              onClick={onBookingClick}
              className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Book Your First Class
              <Heart className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;