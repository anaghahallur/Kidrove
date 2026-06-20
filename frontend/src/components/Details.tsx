import React from 'react';
import { Award, Calendar, Clock, Laptop, Tag } from 'lucide-react';

export const Details: React.FC = () => {
  const items = [
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 text-brand-500" />,
      title: 'Age Group',
      value: '8–14 Years',
      description: 'Specially designed content suitable for middle schoolers.',
      bg: 'bg-brand-50/50',
      border: 'border-brand-100',
      iconBg: 'bg-brand-50',
    },
    {
      icon: <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-playful-500" />,
      title: 'Duration',
      value: '4 Weeks',
      description: '2 live sessions per week + hands-on projects.',
      bg: 'bg-playful-50/50',
      border: 'border-playful-100',
      iconBg: 'bg-playful-50',
    },
    {
      icon: <Laptop className="w-6 h-6 sm:w-7 sm:h-7 text-growth-500" />,
      title: 'Mode',
      value: 'Online Live',
      description: 'Interactive Zoom classrooms with expert instructors.',
      bg: 'bg-growth-50/50',
      border: 'border-growth-100',
      iconBg: 'bg-growth-50',
    },
    {
      icon: <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-creative-500" />,
      title: 'Start Date',
      value: '15 July 2026',
      description: 'Batch registrations close on 12 July.',
      bg: 'bg-creative-50/50',
      border: 'border-creative-100',
      iconBg: 'bg-creative-50',
    },
    {
      icon: <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />,
      title: 'Fee',
      value: '₹2,999',
      description: 'One-time fee, including software access and certificate.',
      bg: 'bg-red-50/50',
      border: 'border-red-100',
      iconBg: 'bg-red-50',
    },
  ];

  return (
    <section id="details" className="py-12 sm:py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-3 sm:mb-4">
            Workshop Quick Details
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Everything you need to know about the AI & Robotics Summer Camp at a glance.
          </p>
        </div>

        {/* 
          Mobile: 1 col stacked with horizontal layout
          Tablet (sm): 2 col
          Large tablet (md): 3 col
          Desktop (lg): all 5 in a row
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-row sm:flex-col gap-4 sm:gap-0 p-4 sm:p-6 rounded-2xl border ${item.border} ${item.bg} hover:shadow-xl hover:shadow-slate-100/50 transform hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon */}
              <div className={`shrink-0 mb-0 sm:mb-4 ${item.iconBg} p-2.5 sm:p-3 rounded-xl w-fit shadow-sm border border-slate-100`}>
                {item.icon}
              </div>
              {/* Text */}
              <div className="flex flex-col">
                <h3 className="font-poppins font-semibold text-slate-500 text-xs tracking-wider uppercase mb-0.5 sm:mb-1">
                  {item.title}
                </h3>
                <p className="font-poppins font-extrabold text-slate-800 text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">
                  {item.value}
                </p>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
