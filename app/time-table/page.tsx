'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TopBar } from '@/components/top-bar';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { Calendar, Clock, User, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type Timing = {
  from: string;
  to: string;
  doctor: string;
  specialty: string;
};

type DaySchedule = {
  day: string;
  timings: Timing[];
};

const formatTimeRange = (from: string, to: string): string => {
  const formatTime = (time: string) => {
    if (!time) return 'Not set';
    const [hours, minutes] = time.split(':');
    const parsedHours = parseInt(hours, 10);
    const ampm = parsedHours >= 12 ? 'PM' : 'AM';
    const formattedHours = parsedHours % 12 || 12;
    return `${formattedHours}:${minutes.padStart(2, '0')} ${ampm}`;
  };
  
  return `${formatTime(from)} - ${formatTime(to)}`;
};

export default function TimetablePage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/time-table');
        if (!response.ok) throw new Error('Failed to fetch timetable.');
        const data = await response.json();
        setSchedule(data.schedule || []);
        setSelectedDay(data.schedule[0]?.day || '');
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const filteredSchedule = searchTerm
    ? schedule.filter((day) =>
        day.timings.some(
          (timing) =>
            timing.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            timing.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : schedule;

  console.log('Schedule:', schedule);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <p>Loading timetable...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat bg-center"
            style={{ backgroundImage: "url('/images/medical-pattern.png')" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Heal Well <span className="text-blue-300">Time-Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-8"
          >
            Plan your visits and appointments with our expert doctors
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center bg-white text-blue-800 rounded-full px-6 py-3 font-semibold shadow-lg"
          >
            <Calendar className="mr-2" />
            Updated Weekly
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by doctor or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {schedule.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 px-6 py-4 text-center focus:outline-none transition-colors duration-200 ${
                  selectedDay === day.day
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <p className="font-semibold">{day.day}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchedule.map((daySchedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-3xl shadow-lg overflow-hidden border border-blue-100 transition-all duration-300 ${
                selectedDay === daySchedule.day
                  ? 'ring-4 ring-blue-400 transform scale-105'
                  : ''
              }`}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6 relative">
                <h2 className="text-2xl font-bold">{daySchedule.day}</h2>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Calendar className="text-blue-600" />
                </div>
              </div>
              <div className="p-6 pt-10">
                {daySchedule.timings && daySchedule.timings.length > 0 ? (
                  daySchedule.timings.map((timing, i) => (
                    <motion.div
                      key={i}
                      className="mb-6 last:mb-0 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div className="flex items-center mb-2">
                        <Clock className="text-blue-600 mr-2" />
                        <p className="text-lg font-semibold text-blue-800">
                          {timing.from && timing.to ? formatTimeRange(timing.from, timing.to) : 'Time not set'}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <User className="text-blue-600 mr-2" />
                        <div>
                          <p className="text-gray-800 font-medium">{timing.doctor}</p>
                          <p className="text-blue-600 text-sm">{timing.specialty}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Calendar className="inline-block mb-2 text-blue-300" size={40} />
                    <p>No appointments available</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}