'use client'

import { motion } from 'framer-motion'
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";

const schedule = [
  {
    day: "Monday",
    timings: [
      { time: "9:00 AM - 12:00 PM", doctor: "Dr. Emily Johnson (Cardiology)" },
      { time: "1:00 PM - 4:00 PM", doctor: "Dr. Michael Lee (Neurology)" },
    ],
  },
  {
    day: "Tuesday",
    timings: [
      { time: "9:00 AM - 12:00 PM", doctor: "Dr. Sarah Parker (Pediatrics)" },
      { time: "2:00 PM - 5:00 PM", doctor: "Dr. David Kim (Orthopedics)" },
    ],
  },
  {
    day: "Wednesday",
    timings: [
      { time: "10:00 AM - 1:00 PM", doctor: "Dr. Rachel Green (Dermatology)" },
      { time: "3:00 PM - 6:00 PM", doctor: "Dr. James Wilson (Oncology)" },
    ],
  },
  {
    day: "Thursday",
    timings: [
      { time: "9:00 AM - 12:00 PM", doctor: "Dr. Emily Johnson (Cardiology)" },
      { time: "1:00 PM - 4:00 PM", doctor: "Dr. Michael Lee (Neurology)" },
    ],
  },
  {
    day: "Friday",
    timings: [
      { time: "9:00 AM - 12:00 PM", doctor: "Dr. Sarah Parker (Pediatrics)" },
      { time: "2:00 PM - 5:00 PM", doctor: "Dr. Rachel Green (Dermatology)" },
    ],
  },
  {
    day: "Saturday",
    timings: [
      { time: "10:00 AM - 2:00 PM", doctor: "Dr. James Wilson (Oncology)" },
    ],
  },
  {
    day: "Sunday",
    timings: [],
  },
];

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
      {/* TopBar and Navigation */}
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-24 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center"
      >
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Weekly <span className="text-blue-300">Time-Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl mb-6"
          >
            Plan your visits and appointments with ease
          </motion.p>
        </div>
      </motion.section>

      {/* Time-Table Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schedule.map((daySchedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="bg-blue-600 text-white text-center py-4">
                <h2 className="text-xl font-bold">{daySchedule.day}</h2>
              </div>
              <div className="p-6">
                {daySchedule.timings.length > 0 ? (
                  daySchedule.timings.map((timing, i) => (
                    <div key={i} className="mb-4">
                      <p className="text-lg font-semibold text-gray-800">{timing.time}</p>
                      <p className="text-gray-600">{timing.doctor}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No appointments available</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
