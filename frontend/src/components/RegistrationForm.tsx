import React, { useState } from 'react';
import { CheckCircle2, Loader2, Mail, Phone, Sparkles, User, AlertCircle } from 'lucide-react';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // General format validation (7 to 15 digits, spaces, hyphens, and + allowed)
      const phoneRegex = /^\+?[0-9\s\-]{7,15}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number (7 to 15 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setServerError(null);

    try {
      // Use environment variable for API URL, fallback to localhost for local dev if not set
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      
      const response = await fetch(`${apiUrl}/api/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        // Validation errors returned from Express API
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Failed to submit enquiry.');
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setServerError('Could not connect to the registration server. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register" className="py-12 sm:py-16 bg-slate-50 relative overflow-hidden">
      {/* Playful backgrounds */}
      <div className="absolute top-0 right-10 w-48 h-48 bg-creative-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-48 h-48 bg-brand-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Header decoration */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-500 via-playful-500 to-creative-500" />
          
          {isSuccess ? (
            /* SUCCESS FEEDBACK STATE */
            <div className="text-center py-8 flex flex-col items-center justify-center space-y-6">
              <div className="bg-growth-100 text-growth-600 p-4 rounded-full shadow-lg shadow-growth-50 flex items-center justify-center animate-bounce-slow">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <div className="space-y-2">
                <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-slate-800">
                  Registration Successful!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
                  Thank you for enrolling in the AI & Robotics Summer Workshop. We have received your inquiry and our academic advisor will call you within 24 hours.
                </p>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-brand-500 hover:bg-brand-600 text-white font-poppins font-semibold px-6 py-2.5 rounded-full transition-all duration-200 text-sm"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            /* REGISTRATION FORM STATE */
            <div>
              <div className="text-center mb-8 space-y-2">
                <div className="inline-flex items-center gap-1 bg-creative-100/80 text-creative-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Book Your Spot
                </div>
                <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-slate-800">
                  Register for the Batch
                </h3>
                <p className="text-slate-500 text-sm sm:text-base">
                  Fill in the details below, and our team will get in touch with you.
                </p>
              </div>

              {serverError && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
                  <div>
                    <span className="font-bold">Registration Error: </span>
                    {serverError}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700">
                    Child's / Parent's Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 ${errors.name ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="Enter Full Name"
                      className={`block w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                          : 'border-slate-200 focus:ring-brand-100 focus:border-brand-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="e.g., parent@example.com"
                      className={`block w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                          : 'border-slate-200 focus:ring-brand-100 focus:border-brand-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Input */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className={`w-5 h-5 ${errors.phone ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      placeholder="e.g., +91 98765 43210"
                      className={`block w-full pl-12 pr-4 py-3.5 text-slate-800 placeholder-slate-400 bg-slate-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
                          : 'border-slate-200 focus:ring-brand-100 focus:border-brand-500 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-poppins font-bold text-lg py-4 rounded-2xl shadow-lg shadow-brand-100 hover:shadow-xl hover:shadow-brand-200 transform transition-all duration-200 disabled:opacity-75 disabled:pointer-events-none disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-400 font-sans mt-2">
                  🔒 Your data is fully encrypted and never shared.
                </p>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
