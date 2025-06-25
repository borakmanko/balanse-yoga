import React, { useMemo, useRef, useState } from 'react';

export interface BookingEvent {
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

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface ContinuousCalendarProps {
  events?: BookingEvent[];
  onClick?: (day: number, month: number, year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({ events = [], onClick }) => {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleDayClick = (day: number, month: number, year: number) => {
    if (onClick) onClick(day, month, year);
  };

  // Only show the selected month
  const generateMonthCalendar = useMemo(() => {
    const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, selectedMonth, 1).getDay();

    // Fill initial empty days
    const daysArray: { day: number | null, month: number }[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push({ day: null, month: selectedMonth });
    }
    // Fill days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ day, month: selectedMonth });
    }
    // Fill trailing empty days to complete the last week
    while (daysArray.length % 7 !== 0) {
      daysArray.push({ day: null, month: selectedMonth });
    }

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < daysArray.length; i += 7) {
      weeks.push(daysArray.slice(i, i + 7));
    }

    return (
      <div className="grid grid-rows-[repeat(auto-fit,minmax(0,1fr))] grid-cols-7 gap-2">
        {weeks.map((week, weekIdx) =>
          week.map(({ day, month }, dayIdx) => {
            const isToday =
              day &&
              today.getDate() === day &&
              today.getMonth() === selectedMonth &&
              today.getFullYear() === year;

            const hasEvent =
              day &&
              events.some(
                (ev) =>
                  ev.date ===
                  `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              );

            return (
              <div
                key={`${weekIdx}-${dayIdx}-${day ?? 'empty'}`}
                ref={(el) => {
                  if (day) dayRefs.current[weekIdx * 7 + dayIdx] = el;
                }}
                data-month={month}
                data-day={day ?? ''}
                onClick={() => day && handleDayClick(day, month, year)}
                className={`relative z-10 aspect-square w-full cursor-pointer rounded-xl border-2 font-medium transition-all hover:z-20 hover:border-emerald-400 hover:shadow-lg ${
                  day 
                    ? 'bg-white border-gray-200 hover:bg-emerald-50' 
                    : 'bg-gray-50 cursor-default border-gray-100'
                }`}
              >
                {day && (
                  <span
                    className={`absolute left-2 top-2 flex size-6 items-center justify-center rounded-full text-sm font-semibold ${
                      isToday 
                        ? 'bg-emerald-500 text-white' 
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </span>
                )}
                {hasEvent && (
                  <span className="absolute bottom-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  }, [year, selectedMonth, events]);

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select 
              name="month" 
              value={`${selectedMonth}`} 
              options={monthOptions} 
              onChange={handleMonthChange} 
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevYear}
                className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100 hover:border-gray-400"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-900 min-w-[80px] text-center">{year}</h1>
              <button
                onClick={handleNextYear}
                className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100 hover:border-gray-400"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid w-full grid-cols-7 gap-2 text-gray-500">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-semibold py-2 text-sm">
              {day}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        {generateMonthCalendar}
      </div>
    </div>
  );
};

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { 'name': string, 'value': string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({ name, value, label, options = [], onChange, className }: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-gray-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <svg className="w-4 h-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);