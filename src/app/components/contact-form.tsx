'use client';

import { useState } from 'react';

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

  const services = [
    'Web Development',
    'Mobile App Development',
    'AI & Machine Learning',
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

  const handleSubmit = (e: React.FormEvent) => {
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
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  return (
    <section className="contact-section">
      {/* Background blurry circle */}
      <div className="contact-bg-circle"></div>
      
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">Ready To Get Started</h2>
            <p className="contact-description">
              Connect with us to explore how we can deliver exceptional IT solutions for your needs.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone number*</label>
              <div className="phone-input-group">
                <select name="countryCode" className="country-select">
                  <option value="+92">Pakistan (پاکستان)</option>
                  <option value="+1">United States</option>
                  <option value="+44">United Kingdom</option>
                  <option value="+91">India</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92"
                  className={errors.phone ? 'error' : ''}
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget*</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Your Budget"
                className={errors.budget ? 'error' : ''}
              />
              {errors.budget && <span className="error-message">{errors.budget}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company name*</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && <span className="error-message">{errors.companyName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="companyDomain">Company domain / URL</label>
              <input
                type="url"
                id="companyDomain"
                name="companyDomain"
                value={formData.companyDomain}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="region">Region*</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className={errors.region ? 'error' : ''}
              >
                <option value="">Please Select</option>
                <option value="north-america">North America</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="middle-east">Middle East</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
              {errors.region && <span className="error-message">{errors.region}</span>}
            </div>

            <div className="form-group">
              <label>Services you&apos;re looking for*</label>
              <div className="services-grid">
                {services.map((service) => (
                  <label key={service} className="service-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceChange(service)}
                    />
                    <span className="checkmark"></span>
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && <span className="error-message">{errors.services}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="projectDetails">Project Details*</label>
              <textarea
                id="projectDetails"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                rows={4}
                className={errors.projectDetails ? 'error' : ''}
              />
              {errors.projectDetails && <span className="error-message">{errors.projectDetails}</span>}
            </div>


            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        <div className="contact-sidebar">
          <div className="sidebar-content">
            <div className="sidebar-icon">🚀</div>
            <h3 className="sidebar-title">Why Choose Us?</h3>
            <p className="sidebar-description">
              As a dynamic startup, we bring fresh perspectives, cutting-edge technology, and personalized attention to every project.
            </p>
            <button className="sidebar-button">Our Story</button>
          </div>
        </div>
      </div>

    </section>
  );
}
