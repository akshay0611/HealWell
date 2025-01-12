'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, UserIcon as UserMd, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Define types for the fetched data
type Timing = {
  startTime: string;
  endTime: string; 
}

type ScheduleDay = {
  timings: Timing[];
}

type Appointment = {
  id: string;
}

type Doctor = {
  _id: string;
}

type CareerApplication = {
  _id: string;
}

type Volunteer = {
  _id: string;
  name: string;
  email: string;
  message: string;
}

type Partner = {
  _id: string;
  name: string;
  email: string;
  message: string;
}

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
}

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [availableDays, setAvailableDays] = useState<number | null>(null)
  const [totalAppointments, setTotalAppointments] = useState<number | null>(null)
  const [totalDoctors, setTotalDoctors] = useState<number | null>(null)
  const [totalCareerApplications, setTotalCareerApplications] = useState<number | null>(null)
  const [totalVolunteerApplications, setTotalVolunteerApplications] = useState<number | null>(null) // New state for volunteer applications
  const [totalPartnerApplications, setTotalPartnerApplications] = useState<number | null>(null) // New state for volunteer applications
  const [totalContactRequests, setTotalContactRequests] = useState<number | null>(null); // New state for contact requests

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
          const numOfAvailableDays = (data.schedule as ScheduleDay[]).filter((day) => day.timings.length > 0).length
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
          setTotalAppointments((data.data as Appointment[]).length)
        } else {
          console.error('Failed to fetch appointments')
        }
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchTotalAppointments()
  }, [])

  useEffect(() => {
    async function fetchTotalDoctors() {
      try {
        const response = await fetch('/api/doctor')
        const data = await response.json()

        if (response.ok && data.success) {
          setTotalDoctors((data.data as Doctor[]).length)
        } else {
          console.error('Failed to fetch doctors')
        }
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    }

    fetchTotalDoctors()
  }, [])

  useEffect(() => {
    async function fetchTotalCareerApplications() {
      try {
        const response = await fetch('/api/careers')
        const data = await response.json()

        if (response.ok && data.success) {
          setTotalCareerApplications((data.data as CareerApplication[]).length)
        } else {
          console.error('Failed to fetch career applications')
        }
      } catch (error) {
        console.error('Error fetching career applications:', error)
      }
    }

    fetchTotalCareerApplications()
  }, [])

  useEffect(() => {
    async function fetchTotalVolunteerApplications() {
      try {
        const response = await fetch('/api/volunteer')
        const data = await response.json()

        if (response.ok && data.success) {
          setTotalVolunteerApplications((data.data as Volunteer[]).length)
        } else {
          console.error('Failed to fetch volunteer applications')
        }
      } catch (error) {
        console.error('Error fetching volunteer applications:', error)
      }
    }

    fetchTotalVolunteerApplications()
  }, [])

  useEffect(() => {
    async function fetchTotalPartnerApplications() {
      try {
        const response = await fetch('/api/partner')
        const data = await response.json()

        if (response.ok && data.success) {
          setTotalPartnerApplications((data.data as Partner[]).length)
        } else {
          console.error('Failed to fetch volunteer applications')
        }
      } catch (error) {
        console.error('Error fetching volunteer applications:', error)
      }
    }

    fetchTotalPartnerApplications()
  }, [])

  useEffect(() => {
    async function fetchTotalContactRequests() {
      try {
        const response = await fetch('/api/contact'); // Fetch all contact requests
        const data = await response.json();

        if (response.ok && data.success) {
          setTotalContactRequests((data.data as Contact[]).length);
        } else {
          console.error('Failed to fetch contact requests');
        }
      } catch (error) {
        console.error('Error fetching contact requests:', error);
      }
    }

    fetchTotalContactRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-purple-700 to-indigo-600 p-8 text-white">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold mb-4 md:mb-0"
            >
              Admin Dashboard
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-right"
            >
              <p className="text-lg font-medium opacity-80">
                {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-3xl font-bold mt-2">
                {currentTime.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            {/* Welcome Message */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 text-xl mb-12 text-center"
            >
              Welcome to the <span className="font-bold text-purple-700">HealWell</span> admin panel. Here&apos;s an overview of the hospital&apos;s current status.
            </motion.p>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <DashboardCard
                title="Available Days"
                value={availableDays}
                icon={Calendar}
                color="from-amber-400 to-orange-500"
              />
              <DashboardCard
                title="Total Appointments"
                value={totalAppointments}
                icon={Activity}
                color="from-emerald-400 to-green-500"
              />
              <DashboardCard
                title="Total Doctors"
                value={totalDoctors}
                icon={UserMd}
                color="from-blue-400 to-indigo-500"
              />
              <DashboardCard
                title="Total Career Applications"
                value={totalCareerApplications}
                icon={Users}
                color="from-pink-400 to-rose-500"
              />
              <DashboardCard
                title="Total Volunteer Applications"
                value={totalVolunteerApplications}
                icon={Users}
                 color="from-teal-400 to-cyan-500"
              />
              <DashboardCard
                title="Total Partner Applications"
                value={totalPartnerApplications}
                icon={Users}
                color="from-orange-400 to-yellow-500"
              />
              <DashboardCard
                title="Total Contact Requests"
                value={totalContactRequests}
                icon={Users}
                color="from-teal-400 to-cyan-500"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

type DashboardCardProps = {
  title: string
  value: number | null
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

function DashboardCard({ title, value, icon: Icon, color }: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className="overflow-hidden rounded-xl shadow-lg">
        <CardHeader className={`p-6 bg-gradient-to-r ${color}`}>
          <CardTitle className="flex items-center justify-between text-white">
            <span className="text-lg font-medium">{title}</span>
            <Icon className="h-8 w-8 opacity-75" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <AnimatePresence mode="wait">
            {value === null ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Skeleton className="h-12 w-24" />
              </motion.div>
            ) : (
              <motion.p
                key="value"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-4xl font-bold text-gray-800"
              >
                {value.toLocaleString()}
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}