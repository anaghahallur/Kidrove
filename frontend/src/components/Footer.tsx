import React from 'react';
import { Cpu, Mail, MapPin, PhoneCall } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Footer Top: stacks to 1 col on mobile, 3 cols on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 border-b border-slate-800">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-500 text-white p-2 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-poppins font-bold text-xl text-white tracking-tight">
                Kid<span className="text-creative-500">rove</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Connecting families with top-tier kids events, summer camps, visual coding clubs, and sports training. Turn screen time into learning time!
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-poppins font-semibold text-white text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#details" className="hover:text-white transition-colors">Course Details</a></li>
              <li><a href="#outcomes" className="hover:text-white transition-colors">Learning Syllabus</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#register" className="hover:text-white transition-colors">Register Now</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-poppins font-semibold text-white text-sm tracking-wider uppercase">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <a href="mailto:support@kidrove.com" className="hover:text-white break-all">support@kidrove.com</a>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                <span>Burj Gate Tower, Downtown Dubai, UAE</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Kidrove Platform. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
