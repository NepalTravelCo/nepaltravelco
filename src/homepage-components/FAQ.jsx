"use client"

import { useState } from "react"
import "./styles/FAQ.css"

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqData = [
    {
      question: "What is the best time to visit Nepal?",
      answer:
        "The best time to visit Nepal is during autumn (September-November) and spring (March-May). Autumn offers clear mountain views and stable weather, while spring brings blooming rhododendrons and moderate temperatures.",
    },
    {
      question: "Do I need a visa to visit Nepal?",
      answer:
        "Most visitors need a visa to enter Nepal. Tourist visas are available on arrival at Tribhuvan International Airport and major border crossings, or can be obtained in advance from Nepalese embassies.",
    },
    {
      question: "What should I pack for trekking in Nepal?",
      answer:
        "Essential trekking gear includes sturdy hiking boots, layered clothing system, warm sleeping bag, rain gear, sun protection, first aid kit, water purification tablets, and headlamp.",
    },
    {
      question: "Is it safe to travel solo in Nepal?",
      answer:
        "Nepal is generally safe for solo travelers. The Nepalese people are known for their hospitality. However, it's recommended to trek with a guide or in groups, especially on remote trails.",
    },
    {
      question: "What is altitude sickness and how to prevent it?",
      answer:
        "Altitude sickness occurs when ascending too quickly to high altitudes. Prevention includes gradual ascent, proper acclimatization days, staying hydrated, and listening to your body.",
    },
    {
      question: "What kind of accommodation is available during treks?",
      answer:
        "Accommodation ranges from basic teahouses to comfortable lodges depending on the trek route. Popular routes have well-established teahouses with beds, blankets, and meals.",
    },
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <p className="faq-subtitle">Got Questions? We Have Answers</p>
          <h2 className="faq-title">FREQUENTLY ASKED QUESTIONS</h2>
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <div className="faq-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`chevron ${activeIndex === index ? "rotated" : ""}`}
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className={`faq-answer ${activeIndex === index ? "expanded" : ""}`}>
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reach Us Section */}
        <div className="reach-us-section">
          <div className="reach-us-content">
            <h3 className="reach-us-title">Still have questions?</h3>
            <p className="reach-us-description">Get in touch with our travel experts</p>
            <button className="contact-btn">CONTACT US</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
