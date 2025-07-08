import React from 'react';
import { Star, Award, Heart, Users } from 'lucide-react';

const Instructors: React.FC = () => {
  const instructors = [
    {
      name: 'Sarah Chen',
      specialty: 'Vinyasa Flow & Meditation',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Sarah brings mindfulness and grace to every class, helping students find their inner strength.',
      certifications: ['RYT-500', 'Meditation Teacher', 'Prenatal Yoga'],
      students: 200
    },
    {
      name: 'Michael Rodriguez',
      specialty: 'Ashtanga & Power Yoga',
      experience: '10 years',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Michael challenges students to push their limits while maintaining proper alignment and breath.',
      certifications: ['RYT-500', 'Ashtanga Certified', 'Anatomy Specialist'],
      students: 180
    },
    {
      name: 'Emma Thompson',
      specialty: 'Hatha & Restorative Yoga',
      experience: '6 years',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Emma creates a nurturing environment where students can heal and restore their bodies and minds.',
      certifications: ['RYT-200', 'Yin Yoga', 'Trauma-Informed Yoga'],
      students: 150
    },
    {
      name: 'David Kim',
      specialty: 'Hot Yoga & Flexibility',
      experience: '7 years',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'David helps students build strength and flexibility through challenging yet accessible sequences.',
      certifications: ['RYT-300', 'Hot Yoga Certified', 'Flexibility Coach'],
      students: 170
    }
  ];

  return (
    <section id="instructors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from certified yoga professionals who are passionate about guiding 
            you on your wellness journey with expertise, compassion, and dedication.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2 border border-gray-100"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {instructor.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-600">
                      {instructor.rating}
                    </span>
                  </div>
                </div>

                <p className="text-emerald-600 font-medium mb-2">
                  {instructor.specialty}
                </p>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {instructor.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span>{instructor.experience}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{instructor.students}+ students</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Certifications
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.certifications.map((cert, certIndex) => (
                      <span
                        key={certIndex}
                        className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
            <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Become an Instructor?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our team of passionate yoga instructors and help others discover 
              the transformative power of yoga. We offer comprehensive training programs.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-colors duration-200">
              Learn More
              <Award className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructors;