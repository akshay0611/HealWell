'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, ChevronRight, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

const jobOpenings = [
  { id: 1, title: "Senior Cardiologist", department: "Cardiology", location: "Main Hospital", type: "Full-time" },
  { id: 2, title: "Registered Nurse", department: "Emergency", location: "Main Hospital", type: "Full-time" },
  { id: 3, title: "Medical Laboratory Technician", department: "Pathology", location: "Research Center", type: "Full-time" },
  { id: 4, title: "Pediatric Specialist", department: "Pediatrics", location: "Children's Wing", type: "Full-time" },
  { id: 5, title: "Physical Therapist", department: "Rehabilitation", location: "Outpatient Clinic", type: "Part-time" },
  { id: 6, title: "Radiologist", department: "Radiology", location: "Imaging Center", type: "Full-time" },
]

const CareersPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [searchTerm, setSearchTerm] = useState('')
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const filteredJobs = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitted(true); // Show confirmation message
  
    // Reset the form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      (e.currentTarget as HTMLFormElement).reset(); // Explicitly assert type
    }, 5000);
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
            Join Our <span className="text-blue-300">Team</span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto text-center leading-relaxed"
          >
            Discover rewarding career opportunities at Heal Well and make a difference in healthcare.
          </motion.p>
        </div>
      </motion.section>

      {/* Job Openings Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Current Openings</h2>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{job.title}</h3>
                    <p className="text-blue-600 mb-2">{job.department}</p>
                    <p className="text-blue-600/70 mb-4">{job.location} • {job.type}</p>
                    <div className="mt-auto">
                      <Link href={`/careers/${job.id}`}>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">Why Join Heal Well?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Professional Growth
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    We offer continuous learning opportunities and career advancement paths to help you reach your full potential.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Cutting-Edge Technology
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Work with state-of-the-art medical equipment and innovative technologies in healthcare.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
                    <ChevronRight className="w-6 h-6 mr-2 text-blue-500" />
                    Collaborative Environment
                  </h3>
                  <p className="text-blue-600/80 leading-relaxed">
                    Join a team of dedicated professionals committed to providing exceptional patient care and advancing medical research.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-white rounded-[2rem] transform rotate-3" />
              <div className="relative z-10 transform -rotate-3 transition-transform duration-300 hover:rotate-0">
                <Image
                  src="/images/team_collaboration.jpg"
                  alt="Team collaboration"
                  width={600}
                  height={400}
                  className="rounded-[2rem] shadow-lg shadow-blue-100/50 object-cover"
                />
                <div className="absolute inset-0 rounded-[2rem] ring-1 ring-blue-100" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Start Your Career at Heal Well
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Take the first step towards a rewarding career in healthcare. Explore our job openings and apply today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
           
              <Button
                size="lg"
                onClick={openModal}
                className="bg-white text-blue-600 hover:bg-blue-100 px-8 py-6 rounded-xl text-lg shadow-blue-800/50 shadow-lg transition-all duration-300 group"
              >
                <Briefcase className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Apply Now
              </Button>
          
          </motion.div>
        </div>
      </section>

       {/* Modal */}
{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Join us Application</h3>
            {isSubmitted ? (
              <p className="text-green-600 font-semibold">
                Thank you for applying! We&apos;ll get back to you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                 
                {/* Certifications */}
          <div className="mb-4">
            <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
              Upload Certifications
            </label>
            <input
              type="file"
              id="certifications"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              accept=".pdf,.doc,.docx"
            />
            <small className="text-gray-500">Please upload relevant certificates or medical degrees.</small>
          </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Why do you want to join our hospital?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CareersPage

