import React from 'react';
import { Star, Quote, Heart } from 'lucide-react';

interface TestimonialsProps {
  onBookingClick: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onBookingClick }) => {
  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'Balanse has completely transformed my approach to wellness. The instructors are incredibly knowledgeable and the community is so supportive. I\'ve never felt stronger or more centered.',
      class: 'Vinyasa Flow'
    },
    {
      name: 'Robert Chen',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'As someone who sits at a desk all day, yoga has been a game-changer for my posture and stress levels. The flexibility in class scheduling makes it easy to maintain consistency.',
      class: 'Hatha Yoga'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Teacher',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The prenatal yoga classes here helped me through my entire pregnancy. The instructors are so caring and knowledgeable about modifications. Highly recommend!',
      class: 'Prenatal Yoga'
    },
    {
      name: 'Alex Thompson',
      role: 'Fitness Enthusiast',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'I was skeptical about yoga at first, but the power yoga classes have improved my athletic performance significantly. The strength and flexibility gains are incredible.',
      class: 'Power Yoga'
    },
    {
      name: 'Sarah Johnson',
      role: 'Nurse',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'After long shifts at the hospital, the restorative yoga classes help me unwind and recharge. It\'s become an essential part of my self-care routine.',
      class: 'Restorative Yoga'
    },
    {
      name: 'Michael Davis',
      role: 'Business Owner',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 5,
      text: 'The meditation and mindfulness aspects of the classes have helped me manage stress and make better decisions in my business. It\'s been life-changing.',
      class: 'Meditation & Yoga'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from our amazing community of yogis 
            who have transformed their lives through our classes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-emerald-500 opacity-50" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    {testimonial.class}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">1000+</div>
              <div className="text-gray-600">Classes Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Transformation?
            </h3>
            <p className="text-xl mb-6 opacity-90 max-w-2xl mx-auto">
              Join our community of wellness warriors and discover what yoga can do for you. 
              Your journey to better health and inner peace starts here.
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

export default Testimonials;