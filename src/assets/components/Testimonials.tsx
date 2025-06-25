import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  onBookingClick?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onBookingClick }) => {
  const testimonials = [
    {
      name: "Jessica Martinez",
      role: "Marketing Professional",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Balanse has completely transformed my relationship with stress and anxiety. The instructors are incredibly knowledgeable and create such a welcoming environment. I've been practicing here for 2 years and can't imagine my life without it."
    },
    {
      name: "Robert Chen",
      role: "Software Engineer",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "As someone who sits at a desk all day, I was dealing with chronic back pain. The therapeutic yoga classes at Balanse have not only eliminated my pain but also improved my posture and overall well-being. Highly recommend!"
    },
    {
      name: "Amanda Foster",
      role: "Teacher & Mother",
      image: "https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "The prenatal yoga classes were a lifesaver during my pregnancy. Emma's gentle guidance and expertise made me feel safe and supported. Now I bring my daughter to the mommy-and-me classes. We both love it!"
    },
    {
      name: "Mark Thompson",
      role: "Retired Veteran",
      image: "https://images.pexels.com/photos/3822652/pexels-photo-3822652.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "I was skeptical about yoga at first, but the community at Balanse welcomed me with open arms. The practice has helped me find peace and manage my PTSD symptoms. It's become an essential part of my healing journey."
    },
    {
      name: "Lisa Park",
      role: "Healthcare Worker",
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Working long shifts as a nurse, I needed something to help me unwind. The evening restore classes are perfect for releasing tension after difficult days. The instructors truly understand the healing power of yoga."
    },
    {
      name: "Carlos Rivera",
      role: "Professional Athlete",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Yoga at Balanse has become crucial for my athletic performance. The power yoga classes have improved my flexibility, balance, and mental focus. It's the perfect complement to my training regimen."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our amazing community of practitioners who have found 
            healing, strength, and peace through their yoga journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
              <div className="absolute top-6 right-6 text-emerald-200">
                <Quote size={32} />
              </div>
              
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied students who have discovered the transformative power of yoga at Balanse.
            </p>
            <button 
              onClick={onBookingClick}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
            >
              Book Your First Class
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;