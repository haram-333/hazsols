'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    companyName: '',
    companyDomain: '',
    region: '',
    services: [] as string[],
    projectDetails: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    'Web Development',
    'Mobile App Development',
    'Gen AI',
    'E-commerce Solutions',
    'WordPress Development',
    'Shopify Development',
    'SEO Services'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName) newErrors.firstName = 'Please complete this required field.';
    if (!formData.lastName) newErrors.lastName = 'Please complete this required field.';
    if (!formData.email) newErrors.email = 'Please complete this required field.';
    if (!formData.phone) newErrors.phone = 'Please complete this required field.';
    if (!formData.budget) newErrors.budget = 'Please complete this required field.';
    if (!formData.companyName) newErrors.companyName = 'Please complete this required field.';
    if (!formData.region) newErrors.region = 'Please complete this required field.';
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service.';
    if (!formData.projectDetails) newErrors.projectDetails = 'Please complete this required field.';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        // Prepare email template parameters for both emails
        const templateParams = {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          phone: formData.phone,
          company_name: formData.companyName,
          company_domain: formData.companyDomain || 'Not provided',
          budget: formData.budget,
          region: formData.region,
          services: formData.services.join(', '),
          project_details: formData.projectDetails,
          to_email: 'hazsolssolution@gmail.com'
        };

        // Initialize EmailJS
        emailjs.init('96tNctYJk2XNrx0h0');
        
        // Test with just one email first
        console.log('Testing EmailJS connection...');
        console.log('Service ID: service_r6zkxtd');
        console.log('Template ID: template_doitlxq');
        console.log('API Key: 96tNctYJk2XNrx0h0');
        
        // Try sending just the form data email first
        console.log('Sending form data email...');
        console.log('Template params:', templateParams);
        
        try {
          const formDataResult = await emailjs.send(
            'service_r6zkxtd',
            'template_doitlxq',
            templateParams
          );
          console.log('Form data email SUCCESS:', formDataResult);
        } catch (formError) {
          console.error('Form data email FAILED:', formError);
          throw formError;
        }
        
        // Send confirmation email to user
        console.log('Sending confirmation email to user...');
        console.log('User email:', formData.email);
        console.log('Confirmation template params:', {
          user_name: `${formData.firstName} ${formData.lastName}`,
          user_email: formData.email,
          to_email: formData.email,
          company_name: 'HazSols',
          company_email: 'hazsolssolution@gmail.com',
          website_link: 'https://hazsols.com'
        });
        
        try {
          const confirmationResult = await emailjs.send(
            'service_r6zkxtd',
            'template_ywm0y4p',
            {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              user_name: `${formData.firstName} ${formData.lastName}`,
              user_email: formData.email,
              to_email: formData.email,
              company_name: 'HazSols',
              company_email: 'hazsolssolution@gmail.com',
              website_link: 'https://hazsols.com'
            }
          );
          console.log('Confirmation email SUCCESS:', confirmationResult);
        } catch (confirmError) {
          console.error('Confirmation email FAILED:', confirmError);
          console.error('This means the user will NOT receive a confirmation email');
          // Still continue - form data email is more important
        }

        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          budget: '',
          companyName: '',
          companyDomain: '',
          region: '',
          services: [],
          projectDetails: ''
        });
        
      } catch (error) {
        console.error('Email sending failed:', error);
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          status: (error as { status?: unknown })?.status,
          text: (error as { text?: unknown })?.text,
          response: (error as { response?: unknown })?.response
        });
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="relative w-full bg-[#020202] py-24 md:py-32 lg:py-48 border-t border-white/5 overflow-hidden">
      {/* Mesh Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#c8f04a]/[0.02] blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Fixed Typography & Info */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="lg:sticky lg:top-32">
              {/* Tech Pill */}
              <div className="flex items-center gap-3 mb-8 w-fit backdrop-blur-md bg-white/5 border border-white/10 px-5 py-2.5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                <div className="flex items-center justify-center w-3 h-3 rounded-full bg-[#c8f04a]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c8f04a] animate-pulse"></div>
                </div>
                <span className="text-white/80 font-inter font-semibold tracking-[0.25em] uppercase text-xs">
                  Get in Touch // 05
                </span>
              </div>

              <h2 className="font-outfit font-medium text-5xl md:text-6xl lg:text-[72px] text-white tracking-tight leading-[1.1] mb-8">
                Ready to get <br />
                <span className="text-[#c8f04a] drop-shadow-[0_0_15px_rgba(200,240,74,0.2)]">started.</span>
              </h2>
              
              <p className="font-inter text-white/70 text-lg md:text-xl leading-relaxed max-w-md mb-16">
                Connect with us to explore how we can architect and deliver exceptional IT solutions for your enterprise infrastructure.
              </p>

              {/* Direct Inquiries Panel */}
              <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-10 bg-[#050505] border border-white/5 rounded-3xl relative overflow-hidden shadow-2xl">
                
                {/* Email */}
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-inter text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-semibold">Direct Email</span>
                  <a href="mailto:hazsolssolution@gmail.com" className="font-outfit text-lg sm:text-xl md:text-2xl text-white font-medium hover:text-[#c8f04a] transition-colors duration-300 w-fit break-all sm:break-normal">
                    hazsolssolution@gmail.com
                  </a>
                </div>

                <div className="w-full h-[1px] bg-white/5"></div>

                {/* Location */}
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-inter text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-semibold">Global Headquarters</span>
                  <p className="font-inter text-white/80 text-base md:text-lg">
                    Operating remotely worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-[#050505] border border-white/5 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
                
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="firstName" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                    />
                    {errors.firstName && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.firstName}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label htmlFor="lastName" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                    />
                    {errors.lastName && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.lastName}</span>}
                  </div>
                </div>

                {/* Email Row */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                  />
                  {errors.email && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.email}</span>}
                </div>

                {/* Phone Row */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="phone" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Phone Number *</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      name="countryCode"
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white/80 font-inter outline-none focus:border-[#c8f04a]/50 transition-all sm:w-[160px] appearance-none cursor-pointer"
                    >
                      <option value="+92" className="bg-[#050505] text-white">Pakistan (+92)</option>
                      <option value="+1" className="bg-[#050505] text-white">USA (+1)</option>
                      <option value="+44" className="bg-[#050505] text-white">UK (+44)</option>
                      <option value="+91" className="bg-[#050505] text-white">India (+91)</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className={`flex-1 bg-white/5 border ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                    />
                  </div>
                  {errors.phone && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.phone}</span>}
                </div>

                {/* Budget & Company Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="budget" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Budget *</label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="$50k - $100k"
                      className={`w-full bg-white/5 border ${errors.budget ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                    />
                    {errors.budget && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.budget}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label htmlFor="companyName" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Company Name *</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${errors.companyName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10`}
                    />
                    {errors.companyName && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.companyName}</span>}
                  </div>
                </div>

                {/* Domain & Region Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="companyDomain" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Company Domain</label>
                    <input
                      type="url"
                      id="companyDomain"
                      name="companyDomain"
                      value={formData.companyDomain}
                      onChange={handleInputChange}
                      placeholder="https://"
                      className="w-full bg-white/5 border border-white/10 focus:border-[#c8f04a]/50 rounded-xl px-6 py-4 text-white font-inter transition-all outline-none focus:bg-white/10"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <label htmlFor="region" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Region *</label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className={`w-full bg-white/5 border ${errors.region ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-4 text-white/80 font-inter transition-all outline-none appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-[#050505] text-white">Select Region</option>
                      <option value="north-america" className="bg-[#050505] text-white">North America</option>
                      <option value="europe" className="bg-[#050505] text-white">Europe</option>
                      <option value="asia" className="bg-[#050505] text-white">Asia</option>
                      <option value="middle-east" className="bg-[#050505] text-white">Middle East</option>
                      <option value="africa" className="bg-[#050505] text-white">Africa</option>
                      <option value="oceania" className="bg-[#050505] text-white">Oceania</option>
                    </select>
                    {errors.region && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.region}</span>}
                  </div>
                </div>

                {/* Services Pills */}
                <div className="flex flex-col gap-4">
                  <label className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Required Services *</label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceChange(service)}
                          className={`px-5 py-2.5 rounded-full font-inter text-sm transition-all duration-300 border ${
                            isSelected 
                              ? 'bg-[#c8f04a]/10 border-[#c8f04a] text-[#c8f04a] shadow-[0_0_15px_rgba(200,240,74,0.15)] scale-[1.02]' 
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.services}</span>}
                </div>

                {/* Project Details */}
                <div className="flex flex-col gap-3">
                  <label htmlFor="projectDetails" className="font-inter text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">Project Scope *</label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder="Briefly describe your objectives and technical requirements..."
                    className={`w-full bg-white/5 border ${errors.projectDetails ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#c8f04a]/50'} rounded-xl px-6 py-5 text-white font-inter transition-all outline-none resize-y focus:bg-white/10`}
                  />
                  {errors.projectDetails && <span className="text-red-400 text-xs font-inter uppercase tracking-wider">{errors.projectDetails}</span>}
                </div>

                {/* Submit Action */}
                <div className="mt-4 flex flex-col gap-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-4 px-10 py-5 bg-transparent border border-[#c8f04a] text-[#c8f04a] font-inter font-bold uppercase tracking-[0.2em] text-sm rounded-xl overflow-hidden transition-all hover:bg-[#c8f04a] hover:text-black hover:shadow-[0_0_40px_rgba(200,240,74,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <div className="absolute inset-0 bg-[#c8f04a]/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-12"></div>
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className="px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-inter text-sm flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Message sent successfully. Our team will contact you shortly.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="px-6 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-inter text-sm flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Message failed to send. Please verify your connection or contact us directly.
                    </div>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
