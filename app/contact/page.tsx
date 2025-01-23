'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/top-bar";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import Footer from "@/components/footer"
import ChatComponent from "@/components/ChatComponent"; 

const ContactPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const contactInfo = [
    { 
      icon: Phone, 
      title: "Phone", 
      content: "+91 9876543210", 
      link: "tel:+919876543210"  
    },
    { 
      icon: Mail, 
      title: "Email", 
      content: "info@healwell.com", 
      link: "mailto:info@healwell.com" 
    },
    { 
      icon: MapPin, 
      title: "Address", 
      content: "123 Safdurjung, New Delhi", 
      link: "https://www.google.com/maps/search/123+Safdurjung,+New+Delhi"  
    },
    { 
      icon: Clock, 
      title: "Hours", 
      content: "Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm" 
    },
  ];

  // State for form fields and errors
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // State for confirmation message
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    let formValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formData.name) {
      newErrors.name = 'Name is required.';
      formValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
      formValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      formValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required.';
      formValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required.';
      formValid = false;
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validateForm()) {
      // Submit form data to the API
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (result.success) {
          setConfirmationMessage('Thank you for your message! We will get back to you shortly.');
          
          // Clear form fields after submission
          setFormData({ name: '', email: '', subject: '', message: '' });

          // Set a timeout to remove the confirmation message after 10 seconds
          setTimeout(() => {
            setConfirmationMessage('');
          }, 10000);
        } else {
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">
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
            Contact <span className="text-blue-300">Heal Well</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            We&apos;re here to help. Reach out to us for any inquiries or to schedule an appointment.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <info.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{info.title}</h3>
                    <p className="text-blue-600/70 group-hover:text-blue-600/90 transition-colors duration-300">
                      {info.link ? (
                        <a href={info.link} className="hover:underline">
                          {info.content}
                        </a>
                      ) : (
                        info.content
                      )}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Send Us a Message</h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-blue-700 mb-1">Name</label>
                      <Input
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1">Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-blue-700 mb-1">Subject</label>
                    <Input
                      id="subject"
                      placeholder="Message Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                    {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-blue-700 mb-1">Message</label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full min-h-[150px]"
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
                {confirmationMessage && (
                  <div className="mt-6 text-green-600 font-semibold text-center">
                    {confirmationMessage}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Our Location</h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] bg-gray-100 rounded-lg"
          >
            {/* Embed Google Map */}
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.504818553374!2d78.1320427149986!3d28.585297086106122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747ad7cce35c19%3A0xd53e788273287604!2sHealWell%20Clinic!5e0!3m2!1sen!2sin!4v1633127398741!5m2!1sen!2sin"
  className="w-full h-full border-0 rounded-lg"
  allowFullScreen={true}  // Corrected here
  loading="lazy"
/>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatComponent/>
    </div>
  );
};

export default ContactPage;
