import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  name: string;
  age: number;
  contactNumber: string;
  homeCity: string;
  coachName: string;
  sessionStartTime: string;
  sessionEndTime: string;
  date: string;
  invoiceId: string;
}

interface ContinuousCalendarProps {
  events: CalendarEvent[];
  onClick: (day: number, month: number, year: number) => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ events, onClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get events for current month
  const monthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const hasEvents = (day: number) => {
    return monthEvents.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day;
    });
  };

  const isToday = (day: number) => {
    return today.getDate() === day && 
           today.getMonth() === currentMonth && 
           today.getFullYear() === currentYear;
  };

  const isPastDate = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    return dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-md mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h2 className="text-xl font-bold text-gray-900">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-10"></div>;
          }

          const hasEventsOnDay = hasEvents(day);
          const isTodayDate = isToday(day);
          const isPast = isPastDate(day);

          return (
            <button
              key={day}
              onClick={() => !isPast && onClick(day, currentMonth, currentYear)}
              disabled={isPast}
              className={`
                h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 relative
                ${isPast 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer'
                }
                ${isTodayDate 
                  ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200' 
                  : 'text-gray-700'
                }
                ${hasEventsOnDay && !isPast 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : ''
                }
              `}
            >
              {day}
              {hasEventsOnDay && !isPast && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 text-xs text-gray-600 space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span>Classes available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};