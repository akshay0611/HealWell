'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, MessageSquare, Phone, User, CheckCircle } from 'lucide-react'

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    comments: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.comments,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setIsSuccess(true);
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          phone: '', // Keeping the phone in case it's needed in future
          comments: '',
        });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error('Failed to send message:', result.message);
        alert('Failed to send your message. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-blue-600 font-semibold uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-blue-600"></span>
              CONTACT US
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8">
              Make An Appointment<br />
              <span className="text-blue-600">Apply For Treatments</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="relative">
      <Input 
        type="text" 
        placeholder="Your name" 
        required 
        className="pl-10" 
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
    </div>
    <div className="relative">
      <Input 
        type="email" 
        placeholder="your@email.com" 
        required 
        className="pl-10" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
    </div>
  </div>
  <div className="relative">
    <Input 
      type="text" 
      placeholder="Message Subject" 
      required 
      className="pl-10" 
      name="subject"
      value={formData.subject}
      onChange={handleInputChange}
    />
    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
  </div>
  <div className="relative">
    <Textarea 
      placeholder="Your message here..." 
      rows={4} 
      required 
      className="pl-10 pt-3" 
      name="comments"
      value={formData.comments}
      onChange={handleInputChange}
    />
    <Calendar className="absolute left-3 top-3 text-blue-400 w-5 h-5" />
  </div>
  <Button 
    type="submit" 
    className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Sending..." : "Send Request"}
  </Button>
</form>
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Your appointment request has been sent. We&apos;ll contact you shortly.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Image
              src="/images/contactus.jpg"
              alt="Medical Professionals Meeting"
              width={600}
              height={400}
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl flex items-end justify-center p-8">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-2">Expert Care, Always There</h3>
                <p className="text-sm">Our team of medical professionals is ready to provide you with the best care possible.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs