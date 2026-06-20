import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Does my child need any prior coding or robotics experience?',
      answer: 'No prior experience is needed! This workshop is designed specifically for complete beginners. We start with fundamental drag-and-drop block coding concepts and gradually advance to AI and physical logic, ensuring every child can follow along comfortably.',
    },
    {
      question: 'What hardware or software setup is required for the workshop?',
      answer: 'All your child needs is a computer (Windows PC, Mac, or Chromebook) with a working webcam, microphone, and a stable internet connection. All the visual coding platforms and virtual robot simulators we use are 100% web-based. We will provide free student accounts on the first day.',
    },
    {
      question: 'What happens if we miss a live class?',
      answer: 'Do not worry! Every session is recorded live. The HD class recording, coding worksheets, and project files are uploaded to our parent dashboard within 2 hours after the session. Your child can easily catch up, and our instructors are available on WhatsApp/Email to resolve any queries.',
    },
    {
      question: 'Will my child receive a certificate at the end?',
      answer: 'Yes! Upon successful completion of their visual coding and virtual robotics tasks, plus presenting their final graduation project, every student will receive an official Kidrove "AI & Robotics Coding Explorer" certificate.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-playful-100 text-playful-700 text-xs sm:text-sm font-semibold tracking-wide border border-playful-200 mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Have Questions?</span>
          </div>
          <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Find answers to the most common queries about our program schedule, prerequisites, and certifications.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-300 bg-brand-50/20 shadow-md shadow-brand-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-poppins font-bold text-slate-800 text-base sm:text-lg focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>
                
                {/* Expandable answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-slate-600 text-sm sm:text-base leading-relaxed font-sans bg-white/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
