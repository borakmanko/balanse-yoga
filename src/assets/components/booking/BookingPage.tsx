import React, { useState, useEffect } from 'react';
import { ContinuousCalendar } from './ContinuousCalendar';
import WeekScheduler from './WeekScheduler';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { createBooking, getUserProfile } from '../../../services/database';
import { UserProfile, BookingEvent } from '../../../types/user';

// Sample booking events data (this would come from your MySQL database)
const sampleBookingEvents = [
  {
    key: '1',
    customerName: 'Available',
    instructorName: 'Sarah Chen',
    classType: 'Yoga',
    timeIn: '09:00',
    timeOut: '10:30',
    date: '2025-01-15'
  },
  {
    key: '2',
    customerName: 'John Smith',
    instructorName: 'Michael Rodriguez',
    classType: 'Calisthenics',
    timeIn: '10:00',
    timeOut: '11:00',
    date: '2025-01-15'
  },
  {
    key: '3',
    customerName: 'Available',
    instructorName: 'Emma Thompson',
    classType: 'Prenatal Yoga',
    timeIn: '14:00',
    timeOut: '15:00',
    date: '2025-01-15'
  },
  {
    key: '4',
    customerName: 'Available',
    instructorName: 'David Kim',
    classType: 'Kickboxing',
    timeIn: '18:00',
    timeOut: '19:30',
    date: '2025-01-16'
  },
  {
    key: '5',
    customerName: 'Available',
    instructorName: 'Sarah Chen',
    classType: 'Power Yoga',
    timeIn: '07:00',
    timeOut: '08:00',
    date: '2025-01-17'
  },
  {
    key: '6',
    customerName: 'Available',
    instructorName: 'Michael Rodriguez',
    classType: 'Meditation',
    timeIn: '19:00',
    timeOut: '20:00',
    date: '2025-01-17'
  },
  {
    key: '7',
    customerName: 'Available',
    instructorName: 'Emma Thompson',
    classType: 'Hot Yoga',
    timeIn: '11:00',
    timeOut: '12:30',
    date: '2025-01-18'
  },
  {
    key: '8',
    customerName: 'Available',
    instructorName: 'David Kim',
    classType: 'Pilates',
    timeIn: '16:00',
    timeOut: '17:00',
    date: '2025-01-19'
  }
];

// Convert booking events to calendar events format
const calendarEvents = sampleBookingEvents.map(event => ({
  name: event.customerName,
  age: 0,
  contactNumber: '',
  homeCity: '',
  coachName: event.instructorName,
  sessionStartTime: event.timeIn,
  sessionEndTime: event.timeOut,
  date: event.date,
  invoiceId: event.key
}));

interface BookingPageProps {}

const BookingPage: React.FC<BookingPageProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleDateClick = (day: number, month: number, year: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setShowScheduler(true);
  };

  const handleCloseScheduler = () => {
    setShowScheduler(false);
    setSelectedDate(null);
  };

  const handleBookClass = async (event: any) => {
    if (!user || !userProfile) {
      alert('Please complete your profile first');
      return;
    }

    setLoading(true);
    try {
      // Create booking in database
      const bookingData: Omit<BookingEvent, 'id'> = {
        userId: user.uid,
        classId: event.key,
        instructorId: event.instructorName, // In real app, this would be instructor ID
        date: event.date,
        timeIn: event.timeIn,
        timeOut: event.timeOut,
        status: 'booked'
      };

      await createBooking(bookingData);

      // Update the event to show it's booked
      const updatedEvent = {
        ...event,
        customerName: `${userProfile.firstName} ${userProfile.lastName}`
      };

      // Update the sample data (in real app, this would be fetched from database)
      const eventIndex = sampleBookingEvents.findIndex(e => e.key === event.key);
      if (eventIndex !== -1) {
        sampleBookingEvents[eventIndex] = updatedEvent;
      }

      setBookingConfirmation({
        classType: event.classType,
        instructor: event.instructorName,
        date: event.date,
        time: `${event.timeIn} - ${event.timeOut}`,
        customerName: `${userProfile.firstName} ${userProfile.lastName}`
      });
      setShowScheduler(false);
    } catch (error) {
      console.error('Error booking class:', error);
      alert('Error booking class. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setBookingConfirmation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Your Class</h1>
              <p className="text-gray-600 mt-2">Select a date to view available classes and book your session</p>
              {userProfile && (
                <p className="text-emerald-600 mt-1">
                  Welcome, {userProfile.firstName}! Ready for your yoga journey?
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-emerald-600" />
                <span>Balanse Studio</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-emerald-600" />
                <span>6:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="mr-3 text-emerald-600" size={28} />
                Select a Date
              </h2>
              <p className="text-gray-600">
                Click on any date to view the weekly schedule and available classes for that week.
              </p>
            </div>
            
            <div className="flex justify-center">
              <ContinuousCalendar 
                events={calendarEvents}
                onClick={handleDateClick}
              />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* User Profile Card */}
            {userProfile && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <User className="mr-3 text-emerald-600" size={24} />
                  Your Profile
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-200">
                    {userProfile.profilePicture ? (
                      <img
                        src={userProfile.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                        <User className="w-8 h-8 text-emerald-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {userProfile.firstName} {userProfile.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {userProfile.preferences.experienceLevel} • {userProfile.city}, {userProfile.state}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {userProfile.preferences.yogaTypes.slice(0, 2).map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                      {userProfile.preferences.yogaTypes.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{userProfile.preferences.yogaTypes.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="mr-3 text-emerald-600" size={24} />
                How to Book
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs">1</div>
                  <p>Select a date from the calendar to view that week's schedule</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs">2</div>
                  <p>Browse available classes and instructors for the week</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-emerald-100 text-emerald-600 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs">3</div>
                  <p>Click on any available class to book your spot</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Class Types Available</h3>
              <div className="space-y-3">
                {[
                  { name: 'Yoga', color: 'bg-emerald-100 text-emerald-800' },
                  { name: 'Calisthenics', color: 'bg-blue-100 text-blue-800' },
                  { name: 'Kickboxing', color: 'bg-red-100 text-red-800' },
                  { name: 'Pilates', color: 'bg-purple-100 text-purple-800' },
                  { name: 'Meditation', color: 'bg-indigo-100 text-indigo-800' },
                  { name: 'Hot Yoga', color: 'bg-orange-100 text-orange-800' },
                  { name: 'Prenatal Yoga', color: 'bg-pink-100 text-pink-800' },
                  { name: 'Power Yoga', color: 'bg-yellow-100 text-yellow-800' }
                ].map((classType) => (
                  <div key={classType.name} className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classType.color}`}>
                      {classType.name}
                    </span>
                    {userProfile?.preferences.yogaTypes.includes(classType.name) && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Your preference</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
              <h3 className="text-lg font-bold text-emerald-900 mb-3">Studio Policies</h3>
              <ul className="space-y-2 text-sm text-emerald-800">
                <li>• Cancel up to 2 hours before class</li>
                <li>• Arrive 10 minutes early</li>
                <li>• Bring your own mat or rent one</li>
                <li>• Stay hydrated during class</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Week Scheduler Modal */}
      {showScheduler && (
        <WeekScheduler
          events={sampleBookingEvents}
          selectedDate={selectedDate}
          onClose={handleCloseScheduler}
          onBookClass={handleBookClass}
          loading={loading}
        />
      )}

      {/* Booking Confirmation Modal */}
      {bookingConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h3>
              <div className="space-y-2 text-gray-600 mb-6">
                <p><span className="font-semibold">Student:</span> {bookingConfirmation.customerName}</p>
                <p><span className="font-semibold">Class:</span> {bookingConfirmation.classType}</p>
                <p><span className="font-semibold">Instructor:</span> {bookingConfirmation.instructor}</p>
                <p><span className="font-semibold">Date:</span> {bookingConfirmation.date}</p>
                <p><span className="font-semibold">Time:</span> {bookingConfirmation.time}</p>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                A confirmation email has been sent to your registered email address.
              </p>
              <button
                onClick={handleCloseConfirmation}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Great! Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;