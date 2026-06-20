import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Details } from './components/Details';
import { Outcomes } from './components/Outcomes';
import { FAQ } from './components/FAQ';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const scrollToRegister = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased">
      {/* Navigation Header */}
      <Header onEnrollClick={scrollToRegister} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero onEnrollClick={scrollToRegister} />

        {/* Course Details Highlights */}
        <Details />

        {/* Interactive Curriculum Outcomes */}
        <Outcomes />

        {/* Lead Generation Registration Form */}
        <RegistrationForm />

        {/* Accordion FAQ Area */}
        <FAQ />
      </main>

      {/* Footer Branding Area */}
      <Footer />
    </div>
  );
};

export default App;
