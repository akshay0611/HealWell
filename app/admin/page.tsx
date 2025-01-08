'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Clock, Calendar, Users } from 'lucide-react'

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [availableDays, setAvailableDays] = useState<number | null>(null)
  const [totalAppointments, setTotalAppointments] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function fetchAvailableDays() {
      try {
        const response = await fetch('/api/time-table')
        const data = await response.json()

        if (response.ok && data.schedule) {
          const numOfAvailableDays = data.schedule.filter((day: { timings: any[] }) => day.timings.length > 0).length
          setAvailableDays(numOfAvailableDays)
        } else {
          console.error('Failed to fetch schedule')
        }
      } catch (error) {
        console.error('Error fetching schedule:', error)
      }
    }

    fetchAvailableDays()
  }, [])

  useEffect(() => {
    async function fetchTotalAppointments() {
      try {
        const response = await fetch('/api/appointment')
        const data = await response.json()

        if (response.ok && data.success) {
          setTotalAppointments(data.data.length)
        } else {
          console.error('Failed to fetch appointments')
        }
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchTotalAppointments()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
            <div className="text-right">
              <p className="text-lg font-medium opacity-80">
                {currentTime.toLocaleDateString()}
              </p>
              <p className="text-2xl font-bold">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Welcome Message */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 text-lg mb-8"
            >
              Welcome to the <span className="font-bold text-indigo-600">HealWell</span> admin panel. Here's an overview of the platform's current status.
            </motion.p>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DashboardCard
                title="Available Days"
                value={availableDays !== null ? availableDays.toString() : 'Loading...'}
                icon={Calendar}
                color="from-yellow-400 to-orange-500"
              />
              <DashboardCard
                title="Total Appointments"
                value={totalAppointments !== null ? totalAppointments.toString() : 'Loading...'}
                icon={Users}
                color="from-green-400 to-emerald-500"
              />
             
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden rounded-xl shadow-lg">
        <div className={`p-4 bg-gradient-to-r ${color}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <Icon className="h-8 w-8 text-white opacity-75" />
          </div>
        </div>
        <div className="p-4 bg-white">
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </Card>
    </motion.div>
  )
}