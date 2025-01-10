'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, ChevronRight, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TopBar } from "@/components/top-bar"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

const JobDetails: React.FC<{ job: Job; onClose: () => void }> = ({ job, onClose }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-blue-800">{job.title}</CardTitle>
        <Button variant="ghost" onClick={onClose} aria-label="Close job details">
          <X className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-blue-600 font-semibold">{job.department}</p>
          <p className="text-blue-600/70">{job.location} • {job.type}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const jobOpenings: Job[] = [
  { 
    id: 1, 
    title: "Senior Cardiologist", 
    department: "Cardiology", 
    location: "Main Hospital", 
    type: "Full-time",
    description: "We are seeking an experienced Senior Cardiologist to join our team at Heal Well. The ideal candidate will have a strong background in cardiovascular medicine and be committed to providing exceptional patient care.",
    requirements: [
      "Board certification in Cardiology",
      "Minimum of 5 years of experience as a practicing cardiologist",
      "Excellent communication and interpersonal skills",
      "Experience with advanced cardiac imaging techniques",
      "Ability to work collaboratively in a multidisciplinary team"
    ]
  },
  { 
    id: 2, 
    title: "Registered Nurse", 
    department: "Emergency", 
    location: "Main Hospital", 
    type: "Full-time",
    description: "We are looking for a dedicated Registered Nurse to join our Emergency Department. The successful candidate will play a crucial role in providing high-quality care to patients in critical situations.",
    requirements: [
      "Valid RN license",
      "BLS and ACLS certifications",
      "Minimum of 2 years of experience in emergency nursing",
      "Strong ability to work under pressure and make quick decisions",
      "Excellent teamwork and communication skills"
    ]
  },
  { 
    id: 3, 
    title: "Medical Laboratory Technician", 
    department: "Pathology", 
    location: "Research Center", 
    type: "Full-time",
    description: "We are seeking a skilled Medical Laboratory Technician to join our Pathology department. The ideal candidate will be responsible for conducting various laboratory tests and maintaining laboratory equipment.",
    requirements: [
      "Associate's degree in Medical Laboratory Technology or related field",
      "ASCP certification",
      "Experience with laboratory information systems",
      "Strong attention to detail and accuracy",
      "Ability to work independently and as part of a team"
    ]
  },
  { 
    id: 4, 
    title: "Pediatric Specialist", 
    department: "Pediatrics", 
    location: "Children's Wing", 
    type: "Full-time",
    description: "We are looking for a compassionate Pediatric Specialist to join our Children's Wing. The successful candidate will provide comprehensive care for infants, children, and adolescents.",
    requirements: [
      "Board certification in Pediatrics",
      "Minimum of 3 years of experience in pediatric care",
      "Excellent communication skills with children and parents",
      "Experience in managing complex pediatric cases",
      "Commitment to ongoing professional development"
    ]
  },
  { 
    id: 5, 
    title: "Physical Therapist", 
    department: "Rehabilitation", 
    location: "Outpatient Clinic", 
    type: "Part-time",
    description: "We are seeking a skilled Physical Therapist to join our Rehabilitation team. The ideal candidate will be responsible for assessing, planning, and providing physical therapy treatments to patients.",
    requirements: [
      "Doctor of Physical Therapy (DPT) degree",
      "Valid state physical therapy license",
      "Experience in outpatient rehabilitation settings",
      "Strong interpersonal and motivational skills",
      "Knowledge of current physical therapy techniques and practices"
    ]
  },
  { 
    id: 6, 
    title: "Radiologist", 
    department: "Radiology", 
    location: "Imaging Center", 
    type: "Full-time",
    description: "We are looking for an experienced Radiologist to join our Imaging Center. The successful candidate will be responsible for interpreting various diagnostic imaging studies and collaborating with other healthcare providers.",
    requirements: [
      "Board certification in Radiology",
      "Proficiency in interpreting CT, MRI, X-ray, and ultrasound images",
      "Experience with PACS and RIS systems",
      "Strong analytical and problem-solving skills",
      "Excellent communication skills for report writing and consultations"
    ]
  },
]

const CareersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<typeof jobOpenings[0] | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const filteredJobs = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Get form data
    const formData = new FormData(event.target as HTMLFormElement);
    const formObject = Object.fromEntries(formData.entries());
  
    // Make POST request to the backend
    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setIsSubmitted(true); // Show success message
      } else {
        setError(data.error || 'An unexpected error occurred.');
      }
    } catch (err) {
      // Use the 'err' variable in the catch block
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form.');
    }
  };  

  const handleViewDetails = (job: typeof jobOpenings[0]) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
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
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                        onClick={() => handleViewDetails(job)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <JobDetails job={selectedJob} onClose={closeJobDetails} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <h3 className="text-2xl font-bold mb-4">Join Us Application</h3>
      {isSubmitted ? (
        <p className="text-green-600 font-semibold">
          Thank you for applying! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position Applying For
            </label>
            <select
              id="position"
              name="positionApplied"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a position</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="administrator">Administrator</option>
              <option value="technician">Technician</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              min="0"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Why do you want to join our hospital?
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="references" className="block text-sm font-medium text-gray-700">
              References (Optional)
            </label>
            <textarea
              id="references"
              name="references"
              rows={3}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            <small className="text-gray-500">Provide references if available.</small>
          </div>

          {error && <p className="text-red-600">{error}</p>}

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