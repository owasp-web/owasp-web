'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CotonouChapterPage() {
  const leaders = [
    { name: 'Emery Kouassi Assogba', role: 'Chapter Leader', credentials: 'PMP, ISO 27001 LA, PhD' },
    { name: 'Orace Kpakpo', role: 'Chapter Leader', credentials: 'Networks and Systems Engineer, Cybersecurity Analyst' },
    { name: 'Célia Abla Kassa', role: 'Chapter Leader', credentials: 'Network Engineer, Performance Analysis Expert' },
    { name: 'Nonfodji Janvier Ahouansou', role: 'Chapter Leader', credentials: 'Chapter Board Member' }
  ];

  const upcomingEvents = [
    {
      title: 'AI in the service of threat detection: myth or reality',
      date: 'July 3, 2025',
      venue: 'PIGIER Cotonou',
      description: 'Exploring the role of artificial intelligence in cybersecurity threat detection'
    },
    {
      title: 'AI and Privacy: How to avoid data leaks',
      date: 'May 2, 2025',
      venue: 'APDP (Personal Data Protection Authority)',
      description: 'Impact of AI on privacy protection and strategies to prevent data leaks',
      speakers: ['Emery K. ASSOGBA', 'Ing. Célia KASSA']
    }
  ];

  const pastEvents = [
    {
      title: 'IT security awareness',
      date: 'July 25, 2024',
      venue: 'IFRI',
      speaker: 'Adonis HOMEVO, Cybersecurity Analyst',
      description: 'Importance of IT security awareness within organizations'
    },
    {
      title: 'The job of the IT auditor: Challenges and Opportunities',
      date: 'October 19, 2023',
      venue: 'APDP BENIN',
      speakers: ['Dr Emery ASSOGBA', 'Dr Evariste SONGBE']
    },
    {
      title: 'Web applications: improving or endangering the lives of users?',
      date: 'April 20, 2023',
      venue: 'PIGIER BENIN',
      speakers: ['Orace KPAKPO', 'Victor OYETOLA']
    },
    {
      title: 'Personal data protection: challenges and opportunities',
      date: 'December 1, 2022',
      venue: 'APDP',
      speakers: ['Dr Arnaud Ahouandjinou', 'Dr Lionel Metongnon', 'Dr Emery ASSOGBA']
    },
    {
      title: 'Tools and best practices for securing information systems in Benin',
      date: 'July 7, 2022',
      venue: 'ENEAM',
      description: 'First OWASP Cotonou chapter meeting',
      speakers: ['Orace KPAKPO', 'Célia KASSA', 'Caleb K. Sambienou', 'Emery ASSOGBA']
    }
  ];

  const partnerships = [
    'ASIN BENIN (Information Systems Security Agency)',
    'APDP BENIN (Personal Data Protection Authority)', 
    'EMES SARL',
    'IFRI (Regional Institute of Industrial Engineering)',
    'PIGIER BENIN',
    'ENEAM',
    'ANSSI'
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇧🇯</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Cotonou</h1>
              <p className="text-xl mb-6">Benin</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                West Africa's cybersecurity awareness champion. OWASP Cotonou drives digital transformation 
                and application security awareness across Benin, building bridges between academia, 
                government, and industry for a more secure digital future.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌍 Regional Gateway</h3>
                <p className="text-lg">Positioned between Nigeria and Togo, fostering cybersecurity awareness across West Africa</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="https://www.meetup.com/owasp-cotonou-chapter/" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Meetup
                </a>
                <a href="mailto:emery.assogba@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Cotonou</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Benin is located in West Africa between Nigeria and Togo. At one time, in Benin, 
                  computer security was just a matter of science fiction, but in recent years there 
                  has been a growing focus on information system security through the creation of 
                  government agencies and university programs dedicated to cybersecurity.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  As e-services are deployed in public and private administrations across the country, 
                  OWASP Cotonou aims to contribute to software security awareness in Benin through 
                  the vast resources and activities offered by the OWASP foundation.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Create cybersecurity awareness in Cotonou and Benin</p>
                    <p>• Bridge academia, government, and industry</p>
                    <p>• Promote OWASP tools and best practices</p>
                    <p>• Support digital transformation security</p>
                    <p>• Foster regional collaboration</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Strategic Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Government Partnership</p>
                      <p className="text-gray-600">Working with APDP and national agencies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🎓</span>
                    <div>
                      <p className="font-semibold">Academic Collaboration</p>
                      <p className="text-gray-600">Partnerships with IFRI, ENEAM, PIGIER</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Regional Influence</p>
                      <p className="text-gray-600">Between Nigeria and Togo, serving West Africa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leadership</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{leader.name}</h3>
                      <p className="text-sm text-gray-600">{leader.role}</p>
                      {leader.credentials && (
                        <p className="text-xs text-[#003594] font-medium mt-1">{leader.credentials}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003594] mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <span>📅 {event.date}</span>
                        <span>📍 {event.venue}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      {event.speakers && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Speakers:</p>
                          <div className="flex flex-wrap gap-2">
                            {event.speakers.map((speaker, i) => (
                              <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-[#003594] font-medium">
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Events */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Past Events & Activities</h2>
            <div className="space-y-6">
              {pastEvents.map((event, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#003594] mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <span>📅 {event.date}</span>
                        <span>📍 {event.venue}</span>
                      </div>
                      {event.description && (
                        <p className="text-gray-700 mb-3">{event.description}</p>
                      )}
                      {event.speaker && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Speaker:</strong> {event.speaker}
                        </p>
                      )}
                      {event.speakers && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">Speakers:</p>
                          <div className="flex flex-wrap gap-2">
                            {event.speakers.map((speaker, i) => (
                              <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                {speaker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Partnerships */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Strategic Partnerships</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🤝 Key Partners</h3>
                <p className="text-lg mb-6">
                  OWASP Cotonou collaborates with leading government agencies, academic institutions, 
                  and industry partners to advance cybersecurity awareness across Benin.
                </p>
                <div className="space-y-3">
                  {partnerships.slice(0, 4).map((partner, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-green-300">✓</span>
                      <p>{partner}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌟 Collaboration Impact</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Government Engagement</h4>
                    <p className="text-gray-700">Direct partnership with data protection authorities</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Academic Excellence</h4>
                    <p className="text-gray-700">Training programs with leading universities</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Industry Collaboration</h4>
                    <p className="text-gray-700">Private sector cybersecurity initiatives</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Topics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Key Focus Areas</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <span className="text-4xl mb-4 block">🤖</span>
                <h3 className="text-xl font-semibold text-[#003594] mb-3">AI & Privacy</h3>
                <p className="text-gray-700">Exploring artificial intelligence impact on privacy protection and data leak prevention strategies.</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <span className="text-4xl mb-4 block">🛡️</span>
                <h3 className="text-xl font-semibold text-[#003594] mb-3">IT Security Awareness</h3>
                <p className="text-gray-700">Building cybersecurity awareness within organizations and society through training and education.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-[#003594] mb-3">IT Auditing</h3>
                <p className="text-gray-700">Advancing IT auditing practices, standards, and opportunities within organizations.</p>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎤 Call for Speakers</h3>
                <p className="text-gray-700 mb-4">
                  We welcome speakers to present on application security, cybersecurity topics, 
                  OWASP projects, or independent research. Join our vibrant community of experts 
                  and professionals.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Review and accept the OWASP Speaker Agreement</p>
                  <p>• Contact chapter leaders with your proposal</p>
                  <p>• Present to our growing community</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">📅 Join Our Meetings</h3>
                <p className="text-gray-700 mb-4">
                  Our meetings are open to the public and free of charge. You don't need to be 
                  a member to attend. Join us for engaging discussions on cybersecurity topics.
                </p>
                <div className="space-y-3">
                  <a href="https://www.meetup.com/owasp-cotonou-chapter/" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Visit Our Meetup Page
                  </a>
                  <a href="mailto:emery.assogba@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Contact Leaders
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Cotonou</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Benin's cybersecurity transformation. Join us in building awareness, 
              fostering collaboration, and securing the digital future of West Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.meetup.com/owasp-cotonou-chapter/" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetup
              </a>
              <a href="mailto:emery.assogba@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Become a Speaker
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 