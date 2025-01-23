'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from "@/components/footer"
import ChatComponent from '@/components/ChatComponent';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Submit the form data to store it in MongoDB
      const response = await fetch('/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setResponseMessage('Your appointment request has been received. We will send you an email once your appointment is confirmed.');
      } else {
        setResponseMessage(result.message || 'Error booking appointment.');
      }
    } catch {
      setResponseMessage('Error booking appointment.');
    } finally {
      setIsSubmitting(false);

      // Reset form data and response message after 10 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          department: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
        setResponseMessage(''); // Clear response message
      }, 10000); // Reset after 10 seconds
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <TopBar />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-center"
          >
            Book an <span className="text-blue-300">Appointment</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Schedule a consultation with our expert medical professionals to ensure your health and well-being.
          </motion.p>
        </div>
      </motion.section>

      {/* Appointment Form Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-blue-600">
            Fill out the form below to schedule your visit with us.
          </p>
        </motion.div>

        {responseMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-center mb-6 text-xl font-semibold ${responseMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}
          >
            {responseMessage}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 (234) 567-8900" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="johndoe@example.com" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <div className="relative">
                  <Input 
                    id="date" 
                    type="date" 
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required 
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                <div className="relative">
                  <Input 
                    id="time" 
                    type="time" 
                    name="preferredTime" 
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required 
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Information</label>
              <div className="relative">
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Please provide any additional details..." 
                  value={formData.message}
                  onChange={handleChange} 
                  rows={4}
                />
                <MessageSquare className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? 'Submitting...' : 'Book Appointment'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      <Footer />
      <ChatComponent/>
    </div>
  )
}

export default AppointmentPage