'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function NewZealandChapterPage() {
  const [activeCity, setActiveCity] = useState('overview');

  const cities = [
    { id: 'overview', name: 'Overview', icon: '🇳🇿' },
    { id: 'auckland', name: 'Auckland', icon: '🏙️' },
    { id: 'hamilton', name: 'Hamilton', icon: '🌱' },
    { id: 'christchurch', name: 'Christchurch', icon: '⛪' },
    { id: 'wellington', name: 'Wellington', icon: '🏛️' }
  ];

  const leaders = [
    { name: 'Austin Chamberlain', city: 'Auckland', role: 'Auckland Meetup Leader' },
    { name: 'John DiLeo', city: 'Hamilton', role: 'Hamilton Meetup Leader' },
    { name: 'Pete Nicholls', city: 'Christchurch', role: 'Christchurch Meetup Leader' },
    { name: 'Kim Carter', city: 'Christchurch', role: 'Christchurch Leader' },
    { name: 'Matt Cotterell', city: 'Wellington', role: 'Wellington Meetup Leader' },
    { name: 'Kirk Jackson', city: 'Wellington', role: 'Wellington Support' }
  ];

  const upcomingEvents = [
    {
      title: 'OWASP Global AppSec-Auckland',
      date: '1-5 September 2025',
      location: 'Sir Owen G. Glenn Building, University of Auckland',
      description: 'Two-day conference with multiple tracks, plus pre-conference training',
      city: 'Auckland'
    },
    {
      title: 'Auckland Meetup',
      date: 'Tuesday, 19 November',
      location: 'The Corner Store, 25 Mount Eden Road',
      description: 'A05:2021 - Security Misconfiguration + Technical Presentation',
      city: 'Auckland'
    },
    {
      title: 'Hamilton Meetup',
      date: 'Tuesday, 19 November',
      location: 'LIC, 605 Ruakura Road, Newstead, Hamilton',
      description: 'A03:2021 - Injection + The Endlessly Singing Canaries',
      city: 'Hamilton'
    }
  ];

  const recentActivities = [
    {
      year: '2024',
      events: [
        'Fourteenth OWASP New Zealand Day conference (3-6 September)',
        'Matt Cotterell signs on as Wellington Meetup leader',
        'John DiLeo launches Hamilton Meetup',
        'Austin Chamberlain steps in as Auckland Meetup leader'
      ]
    },
    {
      year: '2023',
      events: [
        'Thirteenth OWASP New Zealand Day conference (4-7 July)',
        'Eight in-person training classes offered',
        'Second State of AppSec in New Zealand Survey conducted'
      ]
    },
    {
      year: '2022',
      events: [
        'Twelfth OWASP New Zealand Day conference (5-8 July)',
        'First time at AUT City Campus',
        'Inaugural State of AppSec in New Zealand Survey'
      ]
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
                <span className="text-6xl mr-4">🇳🇿</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP New Zealand</h1>
              <p className="text-xl mb-6">Active since 2007 | National Chapter</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Welcome to the OWASP New Zealand Chapter. We organize local meetups and training events 
                throughout the year, support the annual AppSec New Zealand Conference, and advance 
                application security across Aotearoa New Zealand.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:chapter-new-zealand@owasp.org" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Mailing List
                </a>
                <a href="https://twitter.com/owaspnz" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Follow @owaspnz
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* City Navigation */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setActiveCity(city.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeCity === city.id
                      ? 'bg-[#003594] text-white'
                      : 'bg-white text-[#003594] hover:bg-[#003594] hover:text-white'
                  }`}
                >
                  <span className="text-xl">{city.icon}</span>
                  <span>{city.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Overview Section */}
          {activeCity === 'overview' && (
            <div className="space-y-16">
              
              {/* About Section */}
              <section>
                <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP New Zealand</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg text-gray-700 mb-6">
                      The OWASP New Zealand Chapter has been active since 2007. In addition to supporting 
                      and participating in the annual AppSec New Zealand Conference, we organise local 
                      Meetups and training events throughout the year.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                      OWASP New Zealand currently has active Meetups in four cities - Auckland, Hamilton, 
                      Christchurch, and Wellington. We are always looking for additional organisers and 
                      would love to expand to other New Zealand cities.
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-[#003594] mb-4">State of AppSec in New Zealand</h3>
                      <p className="text-gray-700 mb-4">
                        In early 2022, we created the inaugural State of AppSec in New Zealand Survey to gain 
                        first-hand information from New Zealand organisations about how they manage, fund, and 
                        prioritise application security.
                      </p>
                      <div className="space-y-2">
                        <a href="#" className="block text-[#003594] hover:underline">
                          📊 Volume 1 - Executive Summary (PDF, 379 kB)
                        </a>
                        <a href="#" className="block text-[#003594] hover:underline">
                          📈 Volume 2 - Response Data (PDF, 526kB)
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#003594] mb-4">Quick Facts</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">📅</span>
                        <div>
                          <p className="font-semibold">Established</p>
                          <p className="text-gray-600">2007</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🏙️</span>
                        <div>
                          <p className="font-semibold">Active Cities</p>
                          <p className="text-gray-600">Auckland, Hamilton, Christchurch, Wellington</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <p className="font-semibold">Annual Conference</p>
                          <p className="text-gray-600">OWASP New Zealand Day (14 years running)</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">👥</span>
                        <div>
                          <p className="font-semibold">Community</p>
                          <p className="text-gray-600">Hundreds of security professionals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Leadership */}
              <section>
                <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leadership</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {leaders.map((leader, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                          <p className="text-sm text-gray-600">{leader.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#003594] font-medium">{leader.city}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Upcoming Events */}
              <section>
                <h2 className="text-3xl font-bold text-[#003594] mb-8">Upcoming Events</h2>
                <div className="space-y-6">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-[#003594]">{event.title}</h3>
                            <span className="bg-blue-100 text-[#003594] px-3 py-1 rounded-full text-sm font-medium">{event.city}</span>
                          </div>
                          <p className="text-gray-600 mb-2">📅 {event.date}</p>
                          <p className="text-gray-600 mb-2">📍 {event.location}</p>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activities */}
              <section>
                <h2 className="text-3xl font-bold text-[#003594] mb-8">Recent Activities</h2>
                <div className="space-y-8">
                  {recentActivities.map((year, index) => (
                    <div key={index}>
                      <h3 className="text-2xl font-semibold text-[#003594] mb-4">{year.year}</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {year.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                            <span className="text-green-500 mt-1">✓</span>
                            <p className="text-gray-700">{event}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* City-specific sections */}
          {activeCity === 'auckland' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#003594] mb-4">🏙️ Auckland Meetups</h2>
                <p className="text-xl text-gray-600">Led by Austin Chamberlain</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Next Meetup</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">A05:2021 - Security Misconfiguration</h4>
                    <p className="text-gray-700 mb-4">Technical Presentation TBC</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Date:</strong> Tuesday, 19 November</p>
                      <p><strong>Time:</strong> Doors open 6:00 PM, presentations start 6:30 PM</p>
                      <p><strong>Location:</strong> The Corner Store, 25 Mount Eden Road</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Global AppSec 2025</h3>
                  <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">OWASP Global AppSec-Auckland</h4>
                    <p className="mb-4">Two-day conference with multiple tracks</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Conference:</strong> 4-5 September 2025</p>
                      <p><strong>Training:</strong> 1-3 September 2025</p>
                      <p><strong>Venue:</strong> Sir Owen G. Glenn Building, University of Auckland</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Recent Auckland Events</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">How Many Mistakes Can You Make with One Web App?</h4>
                    <p className="text-gray-600">September 17, 2024 - Austin Chamberlain</p>
                    <p className="text-gray-700">A04:2021 - Insecure Design topic coverage</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">OWASP Training Day</h4>
                    <p className="text-gray-600">June 15, 2024 - 2Degrees Head Office</p>
                    <p className="text-gray-700">OWASP SAMM and ISO/IEC 27001 classes</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Get Involved</h3>
                <p className="text-gray-700 mb-4">
                  Join our Auckland meetup group and stay updated on upcoming events and presentations.
                </p>
                <div className="space-x-4">
                  <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Join Auckland Meetup Group
                  </a>
                  <a href="mailto:austin.chamberlain@owasp.org" className="inline-block border border-[#003594] text-[#003594] px-6 py-2 rounded-lg hover:bg-[#003594] hover:text-white transition-colors">
                    Contact Austin
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeCity === 'hamilton' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#003594] mb-4">🌱 Hamilton Meetups</h2>
                <p className="text-xl text-gray-600">Led by John DiLeo</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Next Meetup</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold mb-2">A03:2021 - Injection</h4>
                    <p className="text-gray-700 mb-4">The Endlessly Singing Canaries - Will and Taylor</p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Date:</strong> Tuesday, 19 November</p>
                      <p><strong>Time:</strong> Doors open 6:00 PM, presentations start 6:30 PM</p>
                      <p><strong>Location:</strong> LIC, 605 Ruakura Road, Newstead, Hamilton</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">About Hamilton Chapter</h3>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      The Hamilton meetup was launched in 2024 when John DiLeo relocated from Auckland to Hamilton. 
                      We're building a strong local security community in the Waikato region.
                    </p>
                    <p className="text-gray-700">
                      <strong>Focus:</strong> Application security, threat modeling, and OWASP SAMM
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Recent Hamilton Events</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Baking Security In: An AppSec 'critical path' for developers</h4>
                    <p className="text-gray-600">September 17, 2024 - John DiLeo</p>
                    <p className="text-gray-700">A02:2021 - Cryptographic Failures topic coverage</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Inaugural Hamilton Meetup</h4>
                    <p className="text-gray-600">July 16, 2024 - Gallagher World Headquarters</p>
                    <p className="text-gray-700">Introduction to OWASP and Hamilton Meetup plans</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">OWASP Training Day-Hamilton</h4>
                    <p className="text-gray-600">January 27, 2024</p>
                    <p className="text-gray-700">Threat Modelling: From none to done</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Get Involved</h3>
                <p className="text-gray-700 mb-4">
                  Join our growing Hamilton security community. Perfect for developers, security professionals, 
                  and anyone interested in application security.
                </p>
                <div className="space-x-4">
                  <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Join Hamilton Meetup Group
                  </a>
                  <a href="mailto:john.dileo@owasp.org" className="inline-block border border-[#003594] text-[#003594] px-6 py-2 rounded-lg hover:bg-[#003594] hover:text-white transition-colors">
                    Contact John
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeCity === 'christchurch' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#003594] mb-4">⛪ Christchurch Meetups</h2>
                <p className="text-xl text-gray-600">Led by Pete Nicholls & Kim Carter</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Current Status</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      The Christchurch chapter is actively organizing events and meetups. 
                      Check our meetup group for the latest updates and upcoming events.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Frequency:</strong> Regular meetups throughout the year</p>
                      <p><strong>Focus:</strong> Web application security, practical demonstrations</p>
                      <p><strong>Venue:</strong> Various locations around Christchurch</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Leadership Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold">
                        PN
                      </div>
                      <div>
                        <h4 className="font-semibold">Pete Nicholls</h4>
                        <p className="text-gray-600">Christchurch Meetup Leader</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold">
                        KC
                      </div>
                      <div>
                        <h4 className="font-semibold">Kim Carter</h4>
                        <p className="text-gray-600">Christchurch Leader</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Chapter History</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Kim Carter Leadership</h4>
                    <p className="text-gray-600">2013 onwards</p>
                    <p className="text-gray-700">Kim Carter came on board to lead Christchurch from New Zealand Day 2013 onwards</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Active Community Events</h4>
                    <p className="text-gray-600">Multiple years</p>
                    <p className="text-gray-700">Regular hosting of security workshops, training sessions, and community meetups</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Get Involved</h3>
                <p className="text-gray-700 mb-4">
                  Join the Christchurch security community and participate in our regular meetups and workshops.
                </p>
                <div className="space-x-4">
                  <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Join Christchurch Meetup Group
                  </a>
                  <a href="mailto:pete.nicholls@owasp.org" className="inline-block border border-[#003594] text-[#003594] px-6 py-2 rounded-lg hover:bg-[#003594] hover:text-white transition-colors">
                    Contact Leaders
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeCity === 'wellington' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#003594] mb-4">🏛️ Wellington Meetups</h2>
                <p className="text-xl text-gray-600">Led by Matt Cotterell & Kirk Jackson</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Current Status</h3>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-4">
                      We're looking for organizers! If you're in Wellington and would be willing to host 
                      a Meetup (at least four times per year), we'd love to hear from you.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Current Need:</strong> Active meetup organizers</p>
                      <p><strong>Support:</strong> Matt Cotterell & Kirk Jackson</p>
                      <p><strong>Goal:</strong> Regular quarterly meetups</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-[#003594] mb-4">Leadership Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold">
                        MC
                      </div>
                      <div>
                        <h4 className="font-semibold">Matt Cotterell</h4>
                        <p className="text-gray-600">Wellington Meetup Leader (2024)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold">
                        KJ
                      </div>
                      <div>
                        <h4 className="font-semibold">Kirk Jackson</h4>
                        <p className="text-gray-600">Wellington Support (2016 onwards)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Wellington History</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Matt Cotterell Signs On</h4>
                    <p className="text-gray-600">2024</p>
                    <p className="text-gray-700">Matt Cotterell signs on as leader for the OWASP NZ Wellington Meetup, with support from Kirk Jackson</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Kirk Jackson Leadership</h4>
                    <p className="text-gray-600">2016 onwards</p>
                    <p className="text-gray-700">Kirk Jackson stepped up to replace Adrian Hayes for Wellington from New Zealand day 2016 onwards</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Nick Malcolm Support</h4>
                    <p className="text-gray-600">2018</p>
                    <p className="text-gray-700">Nick Malcolm relocated from Auckland to Wellington and began assisting with the Wellington Meetup</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Opportunity to Lead</h3>
                <p className="text-gray-700 mb-4">
                  Wellington needs active meetup organizers! This is a great opportunity to lead the 
                  capital's application security community and make a real impact.
                </p>
                <div className="space-x-4">
                  <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Join Wellington Meetup Group
                  </a>
                  <a href="mailto:matt.cotterell@owasp.org" className="inline-block border border-[#003594] text-[#003594] px-6 py-2 rounded-lg hover:bg-[#003594] hover:text-white transition-colors">
                    Volunteer to Organize
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Involved with OWASP New Zealand</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community of security professionals, developers, and enthusiasts working 
              to improve application security across New Zealand.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:chapter-new-zealand@owasp.org" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Mailing List
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Become a Speaker
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Volunteer to Organize
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 