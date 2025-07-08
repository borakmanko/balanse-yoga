import React from 'react';

interface BookingEvent {
  key: string;
  customerName: string;
  instructorName: string;
  classType: string;
  timeIn: string;  // "HH:mm"
  timeOut: string; // "HH:mm"
  date: string;    // "YYYY-MM-DD"
}

interface WeekSchedulerProps {
  events: BookingEvent[];
  selectedDate: string | null;
  onClose: () => void;
  onBookClass: (event: BookingEvent) => void;
  loading?: boolean;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Helper to get the start (Monday) and end (Sunday) of the week for a given date
function getWeekRange(dateStr: string) {
  const date = new Date(dateStr);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d);
  }
  return week;
}

// Helper to format time as "h:mma/pm"
function formatTime12h(time: string) {
  if (!time) return '';
  const [hourStr, minStr] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const min = minStr;
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  return `${hour}:${min}${ampm}`;
}

// Helper to get time in minutes since 00:00
function timeToMinutes(time: string) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

// Scheduler time range (e.g., 6am to 10pm)
const START_HOUR = 6;
const END_HOUR = 22;

const timeSlots: string[] = [];
for (let h = START_HOUR; h < END_HOUR; h++) {
  timeSlots.push(`${h.toString().padStart(2, '0')}:00`);
  timeSlots.push(`${h.toString().padStart(2, '0')}:30`);
}
timeSlots.push(`${END_HOUR}:00`);

const WeekScheduler: React.FC<WeekSchedulerProps> = ({ events, selectedDate, onClose, onBookClass, loading = false }) => {
  if (!selectedDate) {
    return null;
  }

  // Get the week range for the selected date
  const weekDates = getWeekRange(selectedDate);

  // Map: dayIndex (0=Mon) -> bookings for that day
  const bookingsByDay: BookingEvent[][] = Array(7).fill(null).map(() => []);
  events.forEach(ev => {
    const evDate = new Date(ev.date);
    for (let i = 0; i < 7; i++) {
      if (
        evDate.getFullYear() === weekDates[i].getFullYear() &&
        evDate.getMonth() === weekDates[i].getMonth() &&
        evDate.getDate() === weekDates[i].getDate()
      ) {
        bookingsByDay[i].push(ev);
      }
    }
  });

  // Assign a color for each class type
  const classColors: Record<string, string> = {
    'Yoga': 'bg-emerald-200 border-emerald-300',
    'Calisthenics': 'bg-blue-200 border-blue-300',
    'Kickboxing': 'bg-red-200 border-red-300',
    'Pilates': 'bg-purple-200 border-purple-300',
    'Meditation': 'bg-indigo-200 border-indigo-300',
    'Hot Yoga': 'bg-orange-200 border-orange-300',
    'Prenatal Yoga': 'bg-pink-200 border-pink-300',
    'Power Yoga': 'bg-yellow-200 border-yellow-300'
  };

  // For each day, sort bookings by timeIn
  bookingsByDay.forEach(dayBookings => {
    dayBookings.sort((a, b) => timeToMinutes(a.timeIn) - timeToMinutes(b.timeIn));
  });

  // Helper to get the display date for the week header
  function getDisplayDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  // For each cell, check if a booking starts at this time
  function getBookingAt(dayIdx: number, time: string) {
    return bookingsByDay[dayIdx].find(
      b => b.timeIn === time
    );
  }

  // For each booking, calculate how many slots it spans
  function getBookingSpan(booking: BookingEvent) {
    const start = timeToMinutes(booking.timeIn);
    const end = timeToMinutes(booking.timeOut);
    return Math.max(1, Math.ceil((end - start) / 30));
  }

  // Track which slots are already rendered as part of a booking
  const renderedSlots: { [key: string]: boolean } = {};

  // Check if the selected date is in this week
  const selectedDateObj = new Date(selectedDate);
  const isSelectedWeek = weekDates.some(date => 
    date.getFullYear() === selectedDateObj.getFullYear() &&
    date.getMonth() === selectedDateObj.getMonth() &&
    date.getDate() === selectedDateObj.getDate()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Weekly Schedule
            </h2>
            <p className="text-gray-600 mt-1">
              {getDisplayDate(weekDates[0])} - {getDisplayDate(weekDates[6])}, {weekDates[0].getFullYear()}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Booking your class...</p>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-3 py-3 bg-gray-50 w-24 text-sm font-semibold text-gray-700">
                    Time
                  </th>
                  {weekDates.map((date, idx) => {
                    const isSelectedDay = isSelectedWeek && 
                      date.getFullYear() === selectedDateObj.getFullYear() &&
                      date.getMonth() === selectedDateObj.getMonth() &&
                      date.getDate() === selectedDateObj.getDate();
                    
                    return (
                      <th 
                        key={idx} 
                        className={`border border-gray-300 px-3 py-3 text-center min-w-[140px] ${
                          isSelectedDay ? 'bg-emerald-100' : 'bg-gray-50'
                        }`}
                      >
                        <div className="font-semibold text-gray-700">{daysOfWeek[idx]}</div>
                        <div className={`text-sm mt-1 ${isSelectedDay ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                          {getDisplayDate(date)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, rowIdx) => (
                  <tr key={slot}>
                    <td className="border border-gray-300 px-3 py-2 text-right font-mono bg-gray-50 text-sm text-gray-600">
                      {formatTime12h(slot)}
                    </td>
                    {weekDates.map((_, dayIdx) => {
                      const key = `${dayIdx}-${slot}`;
                      if (renderedSlots[key]) return null;
                      const booking = getBookingAt(dayIdx, slot);
                      
                      if (booking) {
                        const span = getBookingSpan(booking);
                        // Mark all slots covered by this booking as rendered
                        for (let i = 0; i < span; i++) {
                          const coveredSlotIdx = rowIdx + i;
                          if (coveredSlotIdx < timeSlots.length) {
                            renderedSlots[`${dayIdx}-${timeSlots[coveredSlotIdx]}`] = true;
                          }
                        }
                        
                        const bookingColor = classColors[booking.classType] || 'bg-gray-200 border-gray-300';
                        const isAvailable = !booking.customerName || booking.customerName === 'Available';
                        
                        return (
                          <td
                            key={key}
                            rowSpan={span}
                            className={`border border-gray-300 px-3 py-2 ${bookingColor} text-center relative group transition-all duration-200 ${
                              isAvailable && !loading 
                                ? 'cursor-pointer hover:shadow-lg hover:scale-105' 
                                : 'cursor-default'
                            } ${loading ? 'opacity-50' : ''}`}
                            style={{ minWidth: 140 }}
                            onClick={() => isAvailable && !loading && onBookClass(booking)}
                          >
                            <div className="space-y-1">
                              <div className="font-semibold text-sm text-gray-800">
                                {formatTime12h(booking.timeIn)} - {formatTime12h(booking.timeOut)}
                              </div>
                              <div className="text-xs font-medium text-gray-700">
                                {booking.classType}
                              </div>
                              <div className="text-xs text-gray-600">
                                Coach: {booking.instructorName}
                              </div>
                              {isAvailable && !loading && (
                                <div className="text-xs font-semibold text-emerald-600 mt-2 animate-pulse">
                                  Click to Book
                                </div>
                              )}
                              {!isAvailable && (
                                <div className="text-xs text-red-600 font-medium">
                                  Booked by {booking.customerName}
                                </div>
                              )}
                            </div>
                            
                            {/* Enhanced Tooltip */}
                            {!loading && (
                              <div className="absolute left-1/2 top-full z-20 hidden w-64 -translate-x-1/2 rounded-lg bg-white p-4 text-xs text-gray-800 shadow-xl border-2 border-gray-200 group-hover:block mt-2">
                                <div className="space-y-2">
                                  <div className="font-semibold text-sm border-b pb-2">Class Details</div>
                                  <div><span className="font-medium">Class:</span> {booking.classType}</div>
                                  <div><span className="font-medium">Instructor:</span> {booking.instructorName}</div>
                                  <div><span className="font-medium">Time:</span> {formatTime12h(booking.timeIn)} - {formatTime12h(booking.timeOut)}</div>
                                  <div><span className="font-medium">Status:</span> 
                                    <span className={isAvailable ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                                      {isAvailable ? ' Available' : ' Booked'}
                                    </span>
                                  </div>
                                  {isAvailable && (
                                    <div className="text-emerald-600 font-medium text-center pt-2 border-t">
                                      Click to book this class
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </td>
                        );
                      } else {
                        // Empty slot
                        return (
                          <td
                            key={key}
                            className="border border-gray-300 px-3 py-2 bg-white h-12"
                          >
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <div className="font-semibold">Legend:</div>
            <div className="flex flex-wrap gap-4">
              {Object.entries(classColors).map(([classType, color]) => (
                <div key={classType} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded ${color}`}></div>
                  <span>{classType}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 text-xs">
              * Click on available classes to book them. Hover over any class for more details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekScheduler;