import React from 'react';
import { Bot, Code, Eye, Lightbulb, Presentation } from 'lucide-react';

export const Outcomes: React.FC = () => {
  const outcomes = [
    {
      icon: <BrainIcon />,
      title: 'Introduction to AI Concepts',
      desc: 'Understand machine learning, neural networks, and computer vision through fun, interactive games and simulations.',
      color: 'from-brand-500 to-blue-600',
      shadow: 'shadow-brand-100',
    },
    {
      icon: <Code className="w-6 h-6 text-white" />,
      title: 'Visual Block Coding',
      desc: 'Master foundational logic blocks like loops, variables, and conditions to control virtual devices and games.',
      color: 'from-playful-500 to-purple-600',
      shadow: 'shadow-playful-100',
    },
    {
      icon: <Bot className="w-6 h-6 text-white" />,
      title: 'Virtual Robot Navigation',
      desc: 'Program 3D simulated robots to solve mazes, sense and avoid obstacles, and clean up virtual playrooms.',
      color: 'from-growth-500 to-emerald-600',
      shadow: 'shadow-growth-100',
    },
    {
      icon: <Eye className="w-6 h-6 text-white" />,
      title: 'AI Smart Recognition',
      desc: 'Create mini-projects that recognize faces, detect emotions, and respond to custom voice commands.',
      color: 'from-creative-500 to-amber-600',
      shadow: 'shadow-creative-100',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      title: 'Problem-Solving Mindset',
      desc: 'Learn computational thinking by breaking complex projects down into smaller, logical steps.',
      color: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-100',
    },
    {
      icon: <Presentation className="w-6 h-6 text-white" />,
      title: 'Interactive Portfolio & Pitch',
      desc: 'Build a graduation project and present it to peers and parents, boosting confidence and communication.',
      color: 'from-indigo-500 to-violet-600',
      shadow: 'shadow-indigo-100',
    },
  ];

  return (
    <section id="outcomes" className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-60 h-60 bg-playful-200/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-3 sm:mb-4">
            What Your Child Will Learn
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Our curriculum focuses on hands-on creation rather than passive watching. Here are the key competencies they will gain:
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((outcome, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className={`bg-gradient-to-br ${outcome.color} p-4 rounded-2xl w-fit shadow-lg ${outcome.shadow} mb-6 flex items-center justify-center`}>
                {outcome.icon}
              </div>
              <h3 className="font-poppins font-bold text-slate-800 text-lg mb-3">
                {outcome.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {outcome.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

// Simple custom component for Brain icon
const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-white"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 6v12" />
    <path d="M8 10c1-1.5 2.5-2 4-2" />
    <path d="M16 10c-1-1.5-2.5-2-4-2" />
    <path d="M8 14c1 1.5 2.5 2 4 2" />
    <path d="M16 14c-1 1.5-2.5 2-4 2" />
  </svg>
);
