import React from 'react';
import { Sunrise, Moon, Dumbbell, Heart, Users, Clock } from 'lucide-react';

interface ServicesProps {
  onBookingClick?: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBookingClick }) => {
  const services = [
    {
      icon: Sunrise,
      title: "Morning Flow",
      description: "Start your day with energizing sequences that awaken your body and mind",
      duration: "60 min",
      level: "All Levels",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Moon,
      title: "Evening Restore",
      description: "Gentle, restorative poses to unwind and prepare for peaceful sleep",
      duration: "45 min",
      level: "Beginner",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Dumbbell,
      title: "Power Yoga",
      description: "Dynamic, strength-building sequences for experienced practitioners",
      duration: "75 min",
      level: "Advanced",
      image: "https://images.pexels.com/photos/3822652/pexels-photo-3822652.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Heart,
      title: "Prenatal Yoga",
      description: "Safe, nurturing practice designed specifically for expecting mothers",
      duration: "50 min",
      level: "All Levels",
      image: "https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Users,
      title: "Partner Yoga",
      description: "Deepen connections through shared poses and breathing exercises",
      duration: "60 min",
      level: "Intermediate",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    },
    {
      icon: Clock,
      title: "Quick Flow",
      description: "Efficient 30-minute sessions perfect for busy schedules",
      duration: "30 min",
      level: "All Levels",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Classes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our diverse range of yoga classes, each designed to meet you where you are 
            in your practice and guide you toward your wellness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {service.level}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <service.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Clock size={14} className="mr-1" />
                      {service.duration}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <button 
                  onClick={onBookingClick}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
                >
                  Book Class
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;