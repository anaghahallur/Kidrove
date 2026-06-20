import React from 'react';
import { Calendar, Cpu, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onEnrollClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnrollClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white py-10 sm:py-14 lg:py-20">
      {/* Decorative Background Blobs */}
      <div className="absolute top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-creative-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-0 w-48 h-48 sm:w-80 sm:h-80 bg-brand-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6">

            {/* Camp Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-brand-100/60 text-brand-700 text-xs sm:text-sm font-semibold tracking-wide border border-brand-200">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Summer Camp 2026</span>
            </div>

            {/* Headline */}
            <h1 className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
              AI & Robotics{' '}
              <span className="bg-gradient-to-r from-brand-500 via-playful-500 to-creative-500 bg-clip-text text-transparent">
                Summer Workshop
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-lg lg:text-xl max-w-2xl leading-relaxed font-sans">
              Ignite your child's curiosity! Explore Artificial Intelligence, programming, and virtual robotics — a hands-on, project-based online journey designed for future innovators aged 8–14.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-xs font-semibold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
                <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" />
                Live Interactive Classes
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-growth-500" />
                Certificate Included
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
              <button
                onClick={onEnrollClick}
                className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-poppins font-bold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-brand-200 hover:shadow-xl hover:shadow-brand-300 transform hover:-translate-y-1 transition-all duration-200"
              >
                Enroll Now • ₹2,999
              </button>
              <a
                href="#details"
                className="w-full sm:w-auto flex items-center justify-center text-slate-600 hover:text-slate-900 font-semibold px-6 py-3.5 transition-colors duration-200 text-sm sm:text-base"
              >
                View Details →
              </a>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            {/* Colourful backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-100 to-playful-100 rounded-3xl rotate-3 scale-95 opacity-40 blur-sm pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-bl from-creative-100 to-brand-100 rounded-3xl -rotate-2 scale-95 opacity-40 blur-sm pointer-events-none" />

            {/* Card */}
            <div className="relative bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-xs sm:max-w-sm md:max-w-md transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/assets/robot_hero_banner.png"
                alt="AI & Robotics coding workshop robot mascot"
                className="rounded-xl sm:rounded-2xl w-full object-cover aspect-square"
                loading="eager"
              />

              {/* Floating Badge — safely positioned inside card on all screens */}
              <div className="absolute -bottom-3 left-3 sm:-bottom-4 sm:-left-4 bg-white border border-slate-100 px-3 py-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3">
                <div className="bg-creative-100 text-creative-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg">
                  ✨
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-slate-800 text-xs leading-tight">Limited Seats</h4>
                  <p className="text-[10px] text-slate-500">Only 15 kids per batch</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
