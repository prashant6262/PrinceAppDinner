import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Utensils, Calendar } from 'lucide-react';

const DinnerTrackerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dinnerDays, setDinnerDays] = useState(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dayToRemove, setDayToRemove] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const toggleDinner = (day) => {
    if (!day) return;
    
    const dateKey = formatDateKey(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      day
    );
    
    // If dinner is already marked, show confirmation modal
    if (dinnerDays.has(dateKey)) {
      setDayToRemove(dateKey);
      setShowConfirmModal(true);
    } else {
      // If not marked, add it directly
      const newDinnerDays = new Set(dinnerDays);
      newDinnerDays.add(dateKey);
      setDinnerDays(newDinnerDays);
    }
  };

  const confirmRemoveDinner = () => {
    if (dayToRemove) {
      const newDinnerDays = new Set(dinnerDays);
      newDinnerDays.delete(dayToRemove);
      setDinnerDays(newDinnerDays);
    }
    setShowConfirmModal(false);
    setDayToRemove(null);
  };

  const cancelRemoveDinner = () => {
    setShowConfirmModal(false);
    setDayToRemove(null);
  };

  const isDinnerDay = (day) => {
    if (!day) return false;
    const dateKey = formatDateKey(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      day
    );
    return dinnerDays.has(dateKey);
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getDinnerCount = () => {
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth() + 1;
    
    return Array.from(dinnerDays).filter(dateKey => {
      const [year, month] = dateKey.split('-');
      return parseInt(year) === currentYear && parseInt(month) === currentMonthNum;
    }).length;
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center justify-center mb-4">
            <Utensils className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">Dinner Tracker</h1>
          </div>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <p className="text-sm opacity-90">
                {getDinnerCount()} dinners this month
              </p>
            </div>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="p-6">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleDinner(day)}
                disabled={!day}
                className={`
                  aspect-square rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105
                  ${!day 
                    ? 'invisible' 
                    : isDinnerDay(day)
                      ? 'bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg shadow-green-200'
                      : isToday(day)
                        ? 'bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg shadow-blue-200'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent hover:border-orange-200'
                  }
                  ${day && 'active:scale-95'}
                `}
              >
                {day && (
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm font-semibold">{day}</span>
                    {isDinnerDay(day) && (
                      <Utensils className="w-3 h-3 mt-1 opacity-80" />
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend:</h3>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-green-500 mr-2"></div>
                <span className="text-gray-600">Dinner taken</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-gradient-to-br from-blue-400 to-blue-500 mr-2"></div>
                <span className="text-gray-600">Today</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded bg-gray-100 border mr-2"></div>
                <span className="text-gray-600">No dinner</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 space-y-4">
            {/* Monthly Summary Card */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-green-600">{getDinnerCount()}</p>
                  <p className="text-xs text-gray-500">dinners</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-2xl font-bold text-green-600">₹{getDinnerCount() * 70}</p>
                  <p className="text-xs text-gray-500">@ ₹70 per dinner</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-sm text-gray-700">
                  Tap on any day to mark your dinner!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-2xl transform scale-100 transition-all">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Remove Dinner?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure Prince??
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelRemoveDinner}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  No
                </button>
                <button
                  onClick={confirmRemoveDinner}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl font-semibold hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-200"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DinnerTrackerCalendar;