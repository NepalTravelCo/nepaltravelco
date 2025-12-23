"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type FAQItem = {
  question: string
  answer: string
}

function FAQ() {
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

  const leftQuestions = faqData.filter((_, i) => i % 2 === 0)
  const rightQuestions = faqData.filter((_, i) => i % 2 === 1)

  const renderColumn = (questions: FAQItem[], startIndex: number) => (
    <div className="flex flex-col gap-4">
      {questions.map((faq, index) => {
        const actualIndex = startIndex === 0 ? index * 2 : index * 2 + 1
        const isActive = activeIndex === actualIndex

        return (
          <div
            key={actualIndex}
            className={`
              rounded-xl border transition-all duration-300 bg-gradient-to-br
              from-white to-[#f8fffe]
              ${isActive
                ? "border-primary shadow-[0_12px_30px_rgba(0,64,71,0.15)]"
                : "border-[rgba(0,64,71,0.08)] shadow-[0_2px_8px_rgba(0,64,71,0.04)]"}
              hover:-translate-y-0.5 hover:border-primary
              hover:shadow-[0_8px_25px_rgba(0,64,71,0.12)]
            `}
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(actualIndex)}
              className="
                w-full flex items-center justify-between gap-4
                px-6 py-6 text-left
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              "
            >
              <h3 className="font-body text-base font-semibold text-gray-800 leading-relaxed">
                {faq.question}
              </h3>

              <span
                className={`
                  flex h-6 w-6 items-center justify-center rounded-full
                  transition-all duration-300
                  ${isActive
                    ? "bg-primary text-white"
                    : "bg-[rgba(0,64,71,0.08)] text-primary"}
                `}
              >
                <svg
                  className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Answer */}
            <div
              className={`
                overflow-hidden transition-[max-height] duration-400 ease-in-out
                ${isActive ? "max-h-64" : "max-h-0"}
              `}
            >
              <div className="px-6 pb-6 border-t border-[rgba(0,64,71,0.08)]">
                <p className="pt-4 text-sm text-gray-500 leading-relaxed font-body">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <motion.section
      className="py-16 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-[90%] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-primary tracking-wide mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-body text-gray-500">
            Got Questions? We Have Answers
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderColumn(leftQuestions, 0)}
          {renderColumn(rightQuestions, 1)}
        </div>
      </div>
    </motion.section>
  )
}

export default FAQ
