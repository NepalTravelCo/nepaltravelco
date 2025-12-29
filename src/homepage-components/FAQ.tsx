"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

function FAQ() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqData: FAQItem[] = [
    {
      question: "What is the best time to visit Nepal?",
      answer:
        "The best time to visit Nepal is during autumn (September–November) and spring (March–May). Autumn offers clear mountain views and stable weather, while spring brings blooming rhododendrons and moderate temperatures.",
    },
    {
      question: "Do I need a visa to visit Nepal?",
      answer:
        "Most visitors need a visa to enter Nepal. Tourist visas are available on arrival at Tribhuvan International Airport and major border crossings, or can be obtained in advance from Nepalese embassies.",
    },
    {
      question: "What should I pack for trekking in Nepal?",
      answer:
        "Essential trekking gear includes sturdy hiking boots, layered clothing, a warm sleeping bag, rain gear, sun protection, a first aid kit, water purification tablets, and a headlamp.",
    },
    {
      question: "Is it safe to travel solo in Nepal?",
      answer:
        "Nepal is generally safe for solo travelers. The Nepalese people are known for their hospitality. However, trekking with a guide or group is recommended on remote trails.",
    },
    {
      question: "What is altitude sickness and how to prevent it?",
      answer:
        "Altitude sickness occurs when ascending too quickly. Prevent it by ascending gradually, acclimatizing properly, staying hydrated, and listening to your body.",
    },
    {
      question: "What kind of accommodation is available during treks?",
      answer:
        "Accommodation ranges from basic teahouses to comfortable lodges depending on the route. Popular routes have well-established teahouses with beds, blankets, and meals.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section
      className="sticky top-0 z-0 min-h-screen flex items-center bg-stone-50 overflow-hidden py-24"
    >
      <div
        className="container-max w-full"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Your Questions Answered
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary"
          >
            Frequently <span className="italic font-normal">Asked Questions</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"
          />
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4">
            {faqData.filter((_, i) => i % 2 === 0).map((faq, index) => {
              const actualIndex = index * 2
              return (
                <div
                  key={actualIndex}
                  className={`
                    group rounded-xl border transition-all duration-300
                    ${activeIndex === actualIndex
                      ? "bg-white border-secondary/30 shadow-md scale-[1.02]"
                      : "bg-white/50 border-stone-200 hover:border-secondary/20 hover:shadow-sm"}
                  `}
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0
                        ${activeIndex === actualIndex ? "bg-secondary text-white" : "bg-stone-100 text-stone-400 group-hover:text-secondary"}
                      `}>
                        <HelpCircle size={16} />
                      </div>
                      <h3 className="font-semibold text-primary text-sm md:text-base">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`
                      w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center transition-all duration-300 shrink-0
                      ${activeIndex === actualIndex ? "rotate-180 bg-primary text-white border-primary" : "text-stone-400 group-hover:border-stone-300"}
                    `}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === actualIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 ml-12">
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqData.filter((_, i) => i % 2 !== 0).map((faq, index) => {
              const actualIndex = index * 2 + 1
              return (
                <div
                  key={actualIndex}
                  className={`
                    group rounded-xl border transition-all duration-300
                    ${activeIndex === actualIndex
                      ? "bg-white border-secondary/30 shadow-md scale-[1.02]"
                      : "bg-white/50 border-stone-200 hover:border-secondary/20 hover:shadow-sm"}
                  `}
                >
                  <button
                    onClick={() => toggleFAQ(actualIndex)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0
                        ${activeIndex === actualIndex ? "bg-secondary text-white" : "bg-stone-100 text-stone-400 group-hover:text-secondary"}
                      `}>
                        <HelpCircle size={16} />
                      </div>
                      <h3 className="font-semibold text-primary text-sm md:text-base">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`
                      w-6 h-6 rounded-full border border-stone-200 flex items-center justify-center transition-all duration-300 shrink-0
                      ${activeIndex === actualIndex ? "rotate-180 bg-primary text-white border-primary" : "text-stone-400 group-hover:border-stone-300"}
                    `}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === actualIndex && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 ml-12">
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
