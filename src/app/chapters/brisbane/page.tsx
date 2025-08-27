'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BrisbaneChapterPage() {
  const leaders = [
    { name: 'Glyn Geoghegan', role: 'Chapter Leader' },
    { name: 'Dale Hewitson', role: 'Chapter Leader' },
    { name: 'Wade Alcorn', role: 'Chapter Leader' }
  ];

  const recentMeetings = [
    {
      date: 'May 14, 2024',
      speaker: 'Haoxi',
      title: 'Rethinking attack surface management for an entire country',
      type: 'recent'
    },
    {
      date: 'April 17, 2024',
      speaker: 'Colby Prior',
      title: 'Understanding the attack vectors in open-source packages',
      type: 'recent'
    },
    {
      date: 'March 14, 2024',
      speaker: 'Jack',
      title: 'AppSec: Where to Start, and Some Free, Easy Wins',
      type: 'recent'
    },
    {
      date: 'February 7, 2024',
      speaker: 'Jeremy Snyder',
      title: 'API Security Breach Analysis & Empowering Devs to Make Secure APIs',
      type: 'recent'
    },
    {
      date: 'December 4, 2023',
      speaker: 'Chapter',
      title: 'End of year celebration!',
      type: 'social'
    },
    {
      date: 'October 25, 2023',
      speaker: 'Colin',
      title: 'CSRF and CORS: $num.toString() Facts and a Lie',
      type: 'technical'
    }
  ];

  const pastHighlights = [
    {
      date: 'September 6, 2023',
      speaker: 'Haoxi',
      title: 'Dependable dependency systems and supply chain risk'
    },
    {
      date: 'July 25, 2023',
      speaker: 'Amir',
      title: 'Every action on every device tells a story'
    },
    {
      date: 'June 20, 2023',
      speaker: 'Craig Waterhouse',
      title: 'PCI - The Good, The Bad and the Ugly'
    },
    {
      date: 'May 16, 2023',
      speaker: 'Paul McCarty',
      title: 'The DevSecOps Playbook-step by step open source guide-building DevSecOps program'
    },
    {
      date: 'April 18, 2023',
      speaker: 'Andrew Wheatley',
      title: 'Vulnerability Management for Scalable Teams'
    },
    {
      date: 'March 23, 2023',
      speaker: 'Louis Nyffenegger',
      title: 'Introduction to SAML and its Security'
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇦🇺</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Brisbane</h1>
              <p className="text-xl mb-6">Queensland, Australia</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Welcome to the Brisbane chapter! We've been a bit quiet during the COVID-19 crisis, 
                but we're up and running again! Join Queensland's premier application security community.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🎉 Celebrating OWASP's 20th Anniversary!</h3>
                <p className="text-lg">OWASP Brisbane is proudly part of OWASP's global 20th anniversary celebration</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Meetup
                </a>
                <a href="mailto:brisbane@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Leaders
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Brisbane</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  The Brisbane chapter is an active part of Australia's cybersecurity community. 
                  We're committed to improving application security through education, collaboration, 
                  and knowledge sharing.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  All our events are vendor-agnostic and focus on practical security knowledge that 
                  you can apply in your daily work. Whether you're a developer, security professional, 
                  or just curious about application security, you're welcome here.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎤 Call for Speakers</h3>
                  <p className="text-gray-700 mb-4">
                    We're always looking for volunteers to present! Don't think your topic isn't interesting 
                    enough - as long as it's security related, we're all ears!
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Requirements:</strong> Vendor agnostic, security-focused content
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Chapter Facts</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-gray-600">Brisbane, Queensland, Australia</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-semibold">Leadership Team</p>
                      <p className="text-gray-600">3 Active Chapter Leaders</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-semibold">Meeting Frequency</p>
                      <p className="text-gray-600">Regular monthly meetups</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-semibold">Focus Areas</p>
                      <p className="text-gray-600">AppSec, DevSecOps, Vulnerability Management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leadership</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 text-lg">{leader.name}</h3>
                      <p className="text-sm text-gray-600">{leader.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#003594] font-medium">Brisbane Chapter</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Meetings */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Recent Meetings</h2>
            <div className="space-y-6">
              {recentMeetings.map((meeting, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#003594]">{meeting.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          meeting.type === 'recent' ? 'bg-green-100 text-green-800' :
                          meeting.type === 'social' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {meeting.type === 'recent' ? '2024' : 
                           meeting.type === 'social' ? 'Social' : 'Technical'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">📅 {meeting.date}</p>
                      <p className="text-gray-600 mb-2">🎤 Speaker: {meeting.speaker}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Highlights */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">2023 Highlights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastHighlights.map((meeting, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-[#003594] mb-2">{meeting.title}</h4>
                  <p className="text-gray-600 text-sm mb-1">{meeting.date}</p>
                  <p className="text-gray-700 text-sm">Speaker: {meeting.speaker}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Historical Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Notable Past Presentations</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#003594] pl-6 py-4">
                <h4 className="font-semibold">All your code repo are belong to us</h4>
                <p className="text-gray-600">March 31, 2021 - Paul McCarty</p>
                <p className="text-gray-700">What the Solarwinds hack should tell us about the state of software development</p>
              </div>
              <div className="border-l-4 border-[#003594] pl-6 py-4">
                <h4 className="font-semibold">Around the world in 80 commits</h4>
                <p className="text-gray-600">October 29, 2020</p>
                <p className="text-gray-700">A first-hand tale of contributing to the OWASP Web App Cheat sheets</p>
              </div>
              <div className="border-l-4 border-[#003594] pl-6 py-4">
                <h4 className="font-semibold">JSON Web Tokens from a Security Perspective</h4>
                <p className="text-gray-600">October 16, 2019 - Tim K</p>
                <p className="text-gray-700">Deep dive into JWT security considerations</p>
              </div>
              <div className="border-l-4 border-[#003594] pl-6 py-4">
                <h4 className="font-semibold">Deserialization and the Oracle WebLogic Vulnerability</h4>
                <p className="text-gray-600">June 7, 2019 - Timothy Hamer</p>
                <p className="text-gray-700">CVE-2019-2725 analysis and implications</p>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎤 Become a Speaker</h3>
                <p className="text-gray-700 mb-4">
                  We're always looking for presenters! Whether you have a new technique, 
                  research findings, or practical experience to share - we want to hear from you.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Don't think your topic isn't interesting enough!</strong> As long as it's 
                  security-related, we're all ears. We're just a bunch of nice people wanting to 
                  learn and share knowledge.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Vendor agnostic presentations only</p>
                  <p>• Review the Speaker Agreement</p>
                  <p>• Contact chapter leaders with your topic</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">👥 Join Our Community</h3>
                <p className="text-gray-700 mb-4">
                  All our projects, tools, documents, forums, and chapters are free and open 
                  to anyone interested in improving application security.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Join Meetup Group
                  </a>
                  <a href="#" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Follow on Social Media
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Brisbane</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Queensland's application security community. Learn, share, and grow 
              with fellow security professionals and developers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetup
              </a>
              <a href="mailto:brisbane@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Volunteer to Present
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 