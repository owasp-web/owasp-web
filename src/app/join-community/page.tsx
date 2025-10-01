'use client'

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    interests: '',
    experience: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const membershipTypes = [
    {
      title: "Individual Member",
      price: "Free",
      features: [
        "Access to OWASP resources and tools",
        "Participation in local chapter events",
        "Networking opportunities",
        "Educational content and training",
        "Community forum access"
      ]
    },
    {
      title: "Chapter Leader",
      price: "Free",
      features: [
        "Lead a local OWASP chapter",
        "Access to leadership resources",
        "Monthly leader calls",
        "Event planning support",
        "Speaker bureau access"
      ]
    },
    {
      title: "Project Contributor",
      price: "Free",
      features: [
        "Contribute to OWASP projects",
        "Access to development resources",
        "Project team collaboration",
        "Technical mentorship",
        "Recognition for contributions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#101820] relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="font-['Barlow'] font-medium text-[32px] sm:text-[40px] lg:text-[56px] text-white leading-tight lg:leading-[56px] tracking-[-0.64px] lg:tracking-[-1.12px] mb-4 sm:mb-6">
              Join the OWASP Community
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-base sm:text-lg leading-7 mb-6 sm:mb-8">
              Connect with 50,000+ security professionals worldwide. Whether you're a developer, security researcher, 
              or just passionate about application security, there's a place for you in the OWASP community.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <Button text="Start Your Journey" variant="light-blue" size="56" />
              <Button text="Find Local Chapter" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="font-['Barlow'] font-medium text-[28px] sm:text-[36px] lg:text-[48px] text-[#101820] leading-tight lg:leading-[48px] tracking-[-0.56px] lg:tracking-[-0.96px] mb-4 lg:mb-6">
            Why Join OWASP?
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 max-w-3xl mx-auto">
            OWASP membership is free and open to all. Join our global movement to make software security visible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#003594] rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/images/icons/check.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
            </div>
            <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] mb-3">Free Membership</h3>
            <p className="font-['Poppins'] text-[#757575] text-sm">All OWASP resources are free and open to everyone in the security community.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#003594] rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/images/icons/check.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
            </div>
            <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] mb-3">Global Network</h3>
            <p className="font-['Poppins'] text-[#757575] text-sm">Connect with professionals in 275+ chapters across 80+ countries worldwide.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#003594] rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/images/icons/check.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
            </div>
            <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] mb-3">Career Growth</h3>
            <p className="font-['Poppins'] text-[#757575] text-sm">Advance your career through learning, networking, and contributing to projects.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#003594] rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/images/icons/check.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
            </div>
            <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] mb-3">Make Impact</h3>
            <p className="font-['Poppins'] text-[#757575] text-sm">Contribute to open-source security tools used by millions of developers.</p>
          </div>
        </div>
      </div>

      {/* Membership Types */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="font-['Barlow'] font-medium text-[28px] sm:text-[36px] lg:text-[48px] text-[#101820] leading-tight lg:leading-[48px] tracking-[-0.56px] lg:tracking-[-0.96px] mb-4 lg:mb-6">
              How You Can Participate
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base lg:text-lg leading-6 lg:leading-8 max-w-3xl mx-auto">
              Choose the level of involvement that fits your interests and schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {membershipTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] mb-3">
                  {type.title}
                </h3>
                <div className="text-[#003594] text-[32px] font-bold mb-6">{type.price}</div>
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Image src="/images/icons/check.svg" alt="" width={16} height={16} className="mt-1 shrink-0" />
                      <span className="font-['Poppins'] text-[#757575] text-sm text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button text="Get Started" variant="primary" size="48" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-4">
                Join OWASP Today
              </h2>
              <p className="font-['Poppins'] text-[#757575] text-base">
                Fill out this form to become a member of the OWASP community.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                    Professional Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="developer">Software Developer</option>
                    <option value="security">Security Professional</option>
                    <option value="researcher">Security Researcher</option>
                    <option value="student">Student</option>
                    <option value="manager">Manager/Executive</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              
              <div>
                <label className="block font-['Poppins'] text-[#101820] text-sm font-medium mb-2">
                  Areas of Interest
                </label>
                <textarea
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="Web security, mobile security, DevSecOps, etc."
                />
              </div>
              
              <div className="pt-4">
                <Button text="Join OWASP Community" variant="primary" size="56" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 