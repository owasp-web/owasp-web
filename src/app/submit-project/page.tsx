'use client'

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

interface FormData {
  projectName: string;
  projectDescription: string;
  category: string;
  githubUrl: string;
  websiteUrl: string;
  submitterName: string;
  submitterEmail: string;
  submitterRole: string;
  teamMembers: string;
  projectGoals: string;
  technicalDetails: string;
  licenseType: string;
}

export default function SubmitProjectPage() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    category: '',
    githubUrl: '',
    websiteUrl: '',
    submitterName: '',
    submitterEmail: '',
    submitterRole: '',
    teamMembers: '',
    projectGoals: '',
    technicalDetails: '',
    licenseType: 'MIT'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const categories = [
    'Security Testing',
    'Asset Discovery',
    'Documentation',
    'Training',
    'Penetration Testing',
    'Supply Chain Security',
    'Vulnerability Assessment',
    'Secure Development',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-[1440px] mx-auto px-[120px] py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#28a745] rounded-full flex items-center justify-center mx-auto mb-8">
              <Image src="/images/icons/check.svg" alt="Success" width={32} height={32} className="filter brightness-0 invert" />
            </div>
            <h1 className="font-['Barlow'] font-medium text-[48px] text-[#101820] mb-6">
              Project Submitted Successfully!
            </h1>
            <p className="font-['Poppins'] text-[#757575] text-lg mb-8">
              Thank you for submitting your project idea. The OWASP review committee will evaluate your submission 
              and get back to you within 7-10 business days.
            </p>
            <div className="flex gap-4 justify-center">
              <Button text="Submit Another Project" variant="ghost-dark" size="48" />
              <Button text="View All Projects" variant="primary" size="48" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#101820] relative">
        <div className="max-w-[1440px] mx-auto px-[120px] py-24">
          <div className="max-w-4xl">
            <h1 className="font-['Barlow'] font-medium text-[56px] text-white leading-[56px] tracking-[-1.12px] mb-6">
              Submit a Project
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Have an innovative security tool or resource idea? Submit it to become an official OWASP project 
              and join our global community of developers working to secure the digital world.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Project Information */}
              <div>
                <h2 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-6">
                  Project Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="Enter your project name"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    placeholder="Provide a detailed description of your project..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="https://github.com/your-project"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Project Website
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="https://your-project-website.com"
                    />
                  </div>
                </div>
              </div>

              {/* Submitter Information */}
              <div>
                <h2 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-6">
                  Submitter Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="submitterName"
                      value={formData.submitterName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="submitterEmail"
                      value={formData.submitterEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                    Role/Title
                  </label>
                  <input
                    type="text"
                    name="submitterRole"
                    value={formData.submitterRole}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    placeholder="Security Engineer, Developer, Researcher, etc."
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h2 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-6">
                  Additional Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Project Goals & Objectives
                    </label>
                    <textarea
                      name="projectGoals"
                      value={formData.projectGoals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="What problems does your project solve? What are its main objectives?"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Technical Implementation
                    </label>
                    <textarea
                      name="technicalDetails"
                      value={formData.technicalDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="Technologies used, architecture, implementation details..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      Team Members
                    </label>
                    <textarea
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                      placeholder="List other team members involved in this project..."
                    />
                  </div>
                  
                  <div>
                    <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                      License Type
                    </label>
                    <select
                      name="licenseType"
                      value={formData.licenseType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    >
                      <option value="MIT">MIT License</option>
                      <option value="Apache 2.0">Apache 2.0</option>
                      <option value="GPL v3">GPL v3</option>
                      <option value="BSD 3-Clause">BSD 3-Clause</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <div className="flex gap-4 justify-end">
                  <Button text="Save as Draft" variant="ghost-dark" size="48" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-sm font-['Poppins'] font-semibold text-sm transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-[#003594] text-white hover:bg-[#004bbb] shadow-sm'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Project'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 