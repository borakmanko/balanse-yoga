import React from 'react';
import { Star, Award, Calendar } from 'lucide-react';

const Instructors: React.FC = () => {
  const instructors = [
    {
      name: "Sarah Chen",
      specialty: "Vinyasa & Power Yoga",
      experience: "8 years",
      certifications: ["RYT-500", "Yin Yoga Certified"],
      image: "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Sarah brings dynamic energy and precise alignment to every class, helping students build strength while finding inner peace.",
      rating: 4.9
    },
    {
      name: "Michael Rodriguez",
      specialty: "Hatha & Meditation",
      experience: "12 years",
      certifications: ["RYT-200", "Meditation Teacher"],
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "With over a decade of practice, Michael guides students through mindful movements and deep breathing techniques.",
      rating: 4.8
    },
    {
      name: "Emma Thompson",
      specialty: "Prenatal & Restorative",
      experience: "6 years",
      certifications: ["Prenatal Yoga Certified", "Restorative Yoga"],
      image: "https://images.pexels.com/photos/3822847/pexels-photo-3822847.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "Emma creates a nurturing space for all students, specializing in gentle practices that honor the body's natural rhythms.",
      rating: 5.0
    },
    {
      name: "David Kim",
      specialty: "Ashtanga & Hot Yoga",
      experience: "10 years",
      certifications: ["RYT-500", "Hot Yoga Certified"],
      image: "https://images.pexels.com/photos/3822652/pexels-photo-3822652.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
      bio: "David challenges students to push their boundaries while maintaining proper form and mindful awareness.",
      rating: 4.7
    }
  ];

  return (
    <section id="instructors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Instructors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from experienced, certified instructors who are passionate about sharing 
            the transformative power of yoga with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div key={index} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">{instructor.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{instructor.specialty}</p>
                
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {instructor.experience}
                  </div>
                  <div className="flex items-center">
                    <Award size={14} className="mr-1" />
                    {instructor.certifications.length} Certs
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {instructor.bio}
                </p>
                
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Certifications
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {instructor.certifications.map((cert, certIndex) => (
                      <span key={certIndex} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;