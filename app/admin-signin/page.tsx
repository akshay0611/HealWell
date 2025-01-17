'use client'

import { Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminSignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 justify-center mb-6">
          <Stethoscope className="w-10 h-10 text-blue-500" />
          <h1 className="text-2xl font-bold text-blue-900">Heal Well Admin</h1>
        </div>

        {/* Form */}
        <form>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Sign In Button */}
            <div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-200">
                Sign In
              </Button>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Forgot your password?{' '}
            <Link href="/reset-password" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
              Reset here
            </Link>
          </p>
          <p className="mt-2">
            Return to{' '}
            <Link href="/" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
