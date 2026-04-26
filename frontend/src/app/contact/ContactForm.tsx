"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Phone, MapPin, Calendar, Users, 
  Wallet, Home, Map as MapIcon, MessageSquare, ChevronDown, 
  Globe, Plane, CheckCircle2 
} from 'lucide-react'
import { getPublicBackendBaseUrl } from "@/lib/backend-url"

const nationalities = [
  "United States", "United Kingdom", "Australia", "Canada", "Germany", 
  "France", "Spain", "Italy", "India", "China", "Japan", "Other"
]

const destinations = [
  "Everest Base Camp", "Annapurna Circuit", "Kathmandu Valley", 
  "Pokhara", "Chitwan National Park", "Lumbini", "Mustang", "Other / Undecided"
]

const durations = [
  "1-5 Days", "6-10 Days", "11-15 Days", "16-20 Days", "21+ Days"
]

const budgets = [
  "Less than $500", "$500 - $1,000", "$1,000 - $2,000", "$2,000 - $5,000", "$5,000+"
]

const accommodations = [
  "Budget (Hostels / Teahouses)", "Standard (3-Star Hotels)", 
  "Comfort (4-Star Hotels)", "Luxury (5-Star Hotels)"
]

const tripTypes = [
  "Trekking / Hiking", "Cultural Tour", "Wildlife Safari", 
  "Adventure Sports", "Yoga / Wellness", "Custom Itinerary"
]

// Reusable Select Component
const CustomSelect = ({ 
  icon: Icon, label, options, value, onChange 
}: { 
  icon: React.ElementType, label: string, options: string[], value: string, onChange: (val: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full px-4 py-3 bg-white border border-stone-200 rounded-xl cursor-pointer hover:border-secondary/40 transition-all focus:ring-2 focus:ring-secondary/20"
      >
        <Icon className="w-5 h-5 text-secondary/60 mr-3" />
        <span className={`flex-1 ${!value ? 'text-stone-400' : 'text-stone-800'}`}>
          {value || `Select ${label}`}
        </span>
        <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute z-20 w-full mt-2 bg-white border border-stone-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className="px-4 py-3 hover:bg-stone-50 cursor-pointer text-stone-700 hover:text-secondary transition-colors flex items-center justify-between"
              >
                {option}
                {value === option && <CheckCircle2 className="w-4 h-4 text-secondary" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', nationality: '',
    destination: '', duration: '', groupSize: '', 
    budget: '', accommodation: '', tripType: '', message: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const steps = [
    { number: 1, title: 'Personal Details', icon: User },
    { number: 2, title: 'Trip Details', icon: Plane },
    { number: 3, title: 'Extra Info', icon: MessageSquare }
  ]

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep !== 3) {
      nextStep()
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${getPublicBackendBaseUrl()}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: '', email: '', phone: '', nationality: '',
          destination: '', duration: '', groupSize: '', 
          budget: '', accommodation: '', tripType: '', message: ''
        })
        setCurrentStep(1)
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Could not reach the server. Please check your internet connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
  }

  return (
    <section className="w-full py-24 md:py-32 overflow-hidden relative">
      <div className="container-max">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
        >
          Let&apos;s Plan Together
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary"
        >
          Plan Your <span className="italic font-normal">Adventure</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-stone-600 max-w-2xl mx-auto text-lg"
        >
          Provide us with details about your dream trip, and our travel experts will craft the perfect itinerary tailored just for you.
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 z-0 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-secondary"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div key={step.number} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                    ${isActive 
                      ? 'bg-secondary border-white text-white shadow-lg shadow-secondary/30' 
                      : isCompleted 
                        ? 'bg-secondary border-secondary text-white'
                        : 'bg-white border-stone-200 text-stone-400'
                    }`}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                >
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </motion.div>
                <span className={`text-sm font-medium transition-colors duration-300 hidden md:block
                  ${isActive ? 'text-secondary' : isCompleted ? 'text-stone-800' : 'text-stone-400'}`}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-200 p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <form onSubmit={handleSubmit} className="relative z-10 min-h-[400px] flex flex-col">
          
          <div className="flex-1">
            {/* 1. Personal Details */}
            {currentStep === 1 && (
              <motion.section
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-800 font-[var(--heading-font)]">Tell Us About Yourself</h3>
                    <p className="text-stone-500 text-sm mt-1">We need this to contact you back with the perfect itinerary.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-stone-800 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-stone-800 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-stone-800 outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <CustomSelect 
                    icon={Globe}
                    label="Country / Nationality"
                    options={nationalities}
                    value={formData.nationality}
                    onChange={(val) => updateField('nationality', val)}
                  />
                </div>
              </motion.section>
            )}

            {/* 2. Trip Preferences */}
            {currentStep === 2 && (
              <motion.section
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-800 font-[var(--heading-font)]">Craft Your Journey</h3>
                    <p className="text-stone-500 text-sm mt-1">Help us understand the kind of adventure you are looking for.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CustomSelect 
                    icon={MapPin}
                    label="Destination in Nepal"
                    options={destinations}
                    value={formData.destination}
                    onChange={(val) => updateField('destination', val)}
                  />
                  
                  <CustomSelect 
                    icon={MapIcon}
                    label="Trip Type"
                    options={tripTypes}
                    value={formData.tripType}
                    onChange={(val) => updateField('tripType', val)}
                  />

                  <CustomSelect 
                    icon={Calendar}
                    label="Duration of Trip"
                    options={durations}
                    value={formData.duration}
                    onChange={(val) => updateField('duration', val)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Group Size</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-secondary/60" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={formData.groupSize}
                        onChange={(e) => updateField('groupSize', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-stone-800 outline-none"
                        placeholder="Number of travelers"
                      />
                    </div>
                  </div>

                  <CustomSelect 
                    icon={Wallet}
                    label="Budget per Person"
                    options={budgets}
                    value={formData.budget}
                    onChange={(val) => updateField('budget', val)}
                  />

                  <CustomSelect 
                    icon={Home}
                    label="Accommodation Style"
                    options={accommodations}
                    value={formData.accommodation}
                    onChange={(val) => updateField('accommodation', val)}
                  />
                </div>
              </motion.section>
            )}

            {/* 3. Additional Information */}
            {currentStep === 3 && (
              <motion.section
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-800 font-[var(--heading-font)]">Any Special Requests?</h3>
                    <p className="text-stone-500 text-sm mt-1">Let us know of any dietary, fitness, or particular preferences.</p>
                  </div>
                </div>
                
                <div>
                  <textarea
                    rows={8}
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="w-full p-5 bg-stone-50/50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all text-stone-800 outline-none resize-none text-lg"
                    placeholder="Tell us about your fitness level, dietary requirements, or any specific places you want to visit..."
                  />
                </div>
              </motion.section>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 1 
                  ? 'opacity-0 pointer-events-none' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Previous Step
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all
                ${isSubmitting 
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : isSuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20 hover:-translate-y-0.5'
                }
              `}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Sent!
                </>
              ) : currentStep === 3 ? (
                <>
                  Submit Inquiry
                  <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Next Step
                  <motion.span 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
