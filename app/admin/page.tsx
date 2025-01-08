'use client'

import { Card } from "@/components/ui/card"
import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-semibold text-indigo-700">Admin Dashboard</h1>
        <div className="text-right">
          <p className="text-lg font-medium text-gray-500">
            {currentTime.toLocaleDateString()} 
          </p>
          <p className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <p className="mt-6 text-gray-600 text-lg">
        Welcome to the <span className="font-bold text-indigo-600">HealWell</span> admin panel. Here’s an overview of the platform’s current status.
      </p>

      {/* Dashboard Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Total Appointments" value="152" iconColor="bg-green-500" />
        <DashboardCard title="Doctors" value="24" iconColor="bg-blue-500" />
        <DashboardCard title="Today's Appointments" value="18" iconColor="bg-indigo-500" />
      </div>
    </div>
  )
}

function DashboardCard({ title, value, iconColor }: { title: string; value: string; iconColor: string }) {
  return (
    <Card className="overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center">
          {/* Icon Container */}
          <div className="flex-shrink-0">
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${iconColor}`}>
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>

          {/* Card Content */}
          <div className="ml-6 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
              <dd className="text-4xl font-bold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  )
}