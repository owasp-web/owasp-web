'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BueaChapterPage() {
  const leaders = [
    { name: 'Kouti Divine', role: 'Chapter Leader', description: 'Founding Leader' },
    { name: 'Ramsey Ibe Bende Ndive', role: 'Chapter Leader', description: 'Co-Leader' },
    { name: 'Tambe Salome Ntoh', role: 'Chapter Leader', description: 'Co-Leader' }
  ];

  const upcomingEvent = {
    title: 'OWASP Buea Chapter Meeting - June 2025',
    date: 'June 2025',
    time: '21:00 (WAT)',
    type: 'Online',
    description: 'First session of the year focusing on web and mobile application security, featuring a deliberately vulnerable banking application demo'
  };

  const agenda = [
    'Welcome & Chapter Vision for 2025',
    'Meet the OWASP Buea Chapter leaders',
    'What is OWASP? Introduction for newcomers',
    'Demo Session – Exploring OWASP Top 10 Vulnerabilities',
    'Real-world banking app security issues walkthrough',
    'Practical examples of Insecure APIs, Broken access controls, Injection vulnerabilities'
  ];

  const focusAreas = [
    {
      icon: '🏦',
      title: 'Banking & Fintech Security',
      description: 'Securing financial applications and services as they move online'
    },
    {
      icon: '📱',
      title: 'Mobile App Security',
      description: 'Protecting mobile applications in API-based architectures'
    },
    {
      icon: '🔧',
      title: 'Practical Workshops',
      description: 'Hands-on training with real-world security scenarios'
    },
    {
      icon: '🌍',
      title: 'Community Building',
      description: 'Growing Cameroon\'s application security community'
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
                <span className="text-6xl mr-4">🇨🇲</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Buea</h1>
              <p className="text-xl mb-6">Cameroon</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Established in 2024 with the aim of promoting secure software development practices 
                in the local tech community. We focus on application security, sharing best practices, 
                and fostering collaboration to build a diverse and vibrant security community.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🚀 New Chapter 2024</h3>
                <p className="text-lg">Building Cameroon's first dedicated application security community with workshops, meetups, and hackathons</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="https://www.meetup.com/owasp-buea-chapter" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Meetup
                </a>
                <a href="mailto:buea@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Leaders
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Buea</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  The OWASP Buea Chapter was established in 2024 as Cameroon's first dedicated 
                  application security community. We're committed to promoting secure software 
                  development practices and building a diverse, inclusive security ecosystem.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our mission centers on sharing best practices, fostering collaboration, and 
                  organizing workshops, meetups, and hackathons targeted at different experience 
                  levels - from beginners to security professionals.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Chapter Goals</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Promote secure software development practices</p>
                    <p>• Build a diverse and vibrant security community</p>
                    <p>• Organize workshops, meetups, and hackathons</p>
                    <p>• Foster collaboration across experience levels</p>
                    <p>• Focus on practical, hands-on learning</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Chapter Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏗️</span>
                    <div>
                      <p className="font-semibold">New Foundation</p>
                      <p className="text-gray-600">Established 2024 - Building from ground up</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <p className="font-semibold">Strong Leadership</p>
                      <p className="text-gray-600">3 dedicated founding leaders</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-semibold">Focused Mission</p>
                      <p className="text-gray-600">Banking, fintech, and mobile app security</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <p className="font-semibold">Inclusive Community</p>
                      <p className="text-gray-600">Welcoming developers, students, professionals</p>
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
                      <p className="text-sm text-[#003594] font-medium">{leader.description}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#003594] font-medium">Buea Chapter</p>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Event */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Upcoming Event</h2>
            <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">{upcomingEvent.title}</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-lg mb-2">📅 <strong>Date:</strong> {upcomingEvent.date}</p>
                      <p className="text-lg mb-2">🕘 <strong>Time:</strong> {upcomingEvent.time}</p>
                      <p className="text-lg mb-2">💻 <strong>Format:</strong> {upcomingEvent.type}</p>
                    </div>
                    <div>
                      <p className="text-lg">{upcomingEvent.description}</p>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                    <h4 className="text-xl font-bold mb-4">🗓️ Event Agenda</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {agenda.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-green-300 mt-1">✓</span>
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#003594] mb-4">Why Attend?</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <span className="text-3xl mb-4 block">🔍</span>
                  <h4 className="font-semibold mb-2">Hands-on Exposure</h4>
                  <p className="text-sm text-gray-600">Real security issues developers and testers face today</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <span className="text-3xl mb-4 block">🛠️</span>
                  <h4 className="font-semibold mb-2">OWASP Tools</h4>
                  <p className="text-sm text-gray-600">Learn how OWASP projects support your learning</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <span className="text-3xl mb-4 block">🤝</span>
                  <h4 className="font-semibold mb-2">Network</h4>
                  <p className="text-sm text-gray-600">Meet like-minded professionals in security</p>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <span className="text-3xl mb-4 block">📈</span>
                  <h4 className="font-semibold mb-2">Contribute</h4>
                  <p className="text-sm text-gray-600">Learn how to contribute to OWASP projects</p>
                </div>
              </div>
            </div>
          </section>

          {/* Focus Areas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Our Focus Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {focusAreas.map((area, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{area.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-[#003594] mb-3">{area.title}</h3>
                      <p className="text-gray-700">{area.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Community Vision */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Building Cameroon's Security Community</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌟 Our Vision</h3>
                <p className="text-lg text-gray-700 mb-6">
                  As the banking and fintech space grows in Cameroon, understanding how to secure 
                  applications is no longer optional. We're building a strong security community 
                  that addresses real-world challenges facing our region.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Financial Services Security</h4>
                    <p className="text-gray-700">Focus on banking and fintech applications moving online</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Mobile-First Approach</h4>
                    <p className="text-gray-700">API-based architectures and mobile security best practices</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Practical Learning</h4>
                    <p className="text-gray-700">Real-world scenarios and vulnerable applications for training</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">📊 Chapter Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Established</span>
                    <span className="font-semibold text-[#003594]">2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Leaders</span>
                    <span className="font-semibold text-[#003594]">3 Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Focus</span>
                    <span className="font-semibold text-[#003594]">Banking & Mobile</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Meeting Format</span>
                    <span className="font-semibold text-[#003594]">Virtual & In-Person</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Target Audience</span>
                    <span className="font-semibold text-[#003594]">All Levels</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎤 Join Our Community</h3>
                <p className="text-gray-700 mb-4">
                  Whether you're a developer, security professional, student, or tech enthusiast, 
                  we welcome you to join our growing community. No prior security experience required!
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Perfect for:</strong> Developers wanting to learn security, security 
                  professionals looking to network, students exploring cybersecurity careers, 
                  and anyone curious about application security.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Monthly meetups and workshops</p>
                  <p>• Hands-on security training</p>
                  <p>• Networking opportunities</p>
                  <p>• OWASP project contributions</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Grow With Us</h3>
                <p className="text-gray-700 mb-4">
                  As a new chapter, we're building something special together. Your participation 
                  helps shape the future of application security in Cameroon and across Central Africa.
                </p>
                <div className="space-y-3">
                  <a href="https://www.meetup.com/owasp-buea-chapter" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Join Our Meetup Group
                  </a>
                  <a href="mailto:buea@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Contact Chapter Leaders
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Buea</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Cameroon's first dedicated application security community. Together, 
              we're building a strong foundation for secure software development across Central Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.meetup.com/owasp-buea-chapter" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetup
              </a>
              <a href="mailto:buea@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contribute to Community
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 