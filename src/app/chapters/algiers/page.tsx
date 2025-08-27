'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AlgiersChapterPage() {
  const leaders = [
    { name: 'Taher Amine ELHOUARI', role: 'Founding President / Leader', description: 'CISO, CISSP, CCSP' },
    { name: 'Hichem BELGUENDOUZ', role: 'Vice President / Co-Leader', description: 'Operations Manager' },
    { name: 'Meriem Marwa MAHDI', role: 'Board Secretary', description: 'General Secretary' },
    { name: 'Yasmine AZZAZ', role: 'Board Member', description: 'Chapter Board Member' },
    { name: 'Abdou SOUDAKI', role: 'Board Member', description: 'Chapter Board Member' },
    { name: 'Adel BOUROUIS', role: 'Board Member', description: 'Chapter Board Member' }
  ];

  const recentEvents = [
    {
      date: 'October 25, 2024',
      title: 'OWASP Algiers @ OWASP Tunisia: IOT & OT Security',
      type: 'Conference',
      speakers: 'Mehdi Kerker & Helmi Rais',
      description: 'Insightful webinar on OT and Drone Security covering cybersecurity challenges reshaping critical infrastructure'
    },
    {
      date: 'October 1, 2024',
      title: 'Unifying Web and Network Defense Mastering WAF Deployment Part 2',
      type: 'Online Training',
      speakers: 'Mehdi Sammar',
      description: 'Advanced WAF deployment and configuration strategies with hands-on exercises'
    },
    {
      date: 'September 27, 2024',
      title: 'Identify CVE in Open Source Projects',
      type: 'Online Webinar',
      speakers: 'Ahmed Hassan',
      description: 'Methodologies for vulnerability identification and best practices for open-source security'
    },
    {
      date: 'September 24, 2024',
      title: 'Unifying Web and Network Defense Mastering WAF Deployment Part 1',
      type: 'Online Training',
      speakers: 'Mehdi Sammar',
      description: 'Web Application Firewalls fundamentals and configuration best practices'
    },
    {
      date: 'June 14, 2024',
      title: 'DevSecOps: Bridging DevOps and Security',
      type: 'Online Webinar',
      speakers: 'Djelloul Bouida',
      description: 'Integrating security into DevOps pipeline and transforming workflows'
    }
  ];

  const pastHighlights = [
    {
      date: 'May 25, 2024',
      title: 'Free Training Initiative - ISC2 Certified in CyberSecurity "CC"',
      trainer: 'Taher Amine ELHOUARI',
      description: 'Comprehensive ISC2 CC training fostering cybersecurity awareness and skill-building'
    },
    {
      date: 'May 11, 2024',
      title: 'Multi-Level Crisis Simulation',
      trainer: 'Jose Julian Fuentes Medina (EY)',
      description: 'Engaging crisis simulation showcasing response to multi-layered cyber threats'
    },
    {
      date: 'April 26, 2024',
      title: 'Whoami to ROOT: Your Guide Beyond Hacking Web Applications',
      trainer: 'Muhammed Nassef',
      description: 'Deep dive into Linux privilege escalation and command injection exploitation'
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
                <span className="text-6xl mr-4">🇩🇿</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Algiers</h1>
              <p className="text-xl mb-6">Algeria</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Your gateway to the world of application security and cybersecurity in Algeria. 
                Enriching Algeria's application security community and strengthening the 
                cybersecurity landscape across the nation.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌟 Mission</h3>
                <p className="text-lg">Knowledge sharing, collaboration, and cutting-edge practices to empower individuals and organizations in their cybersecurity journey</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Meetup
                </a>
                <a href="mailto:contact@owaspalgiers.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Algiers</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Algiers Chapter is your gateway to the world of application security 
                  and cybersecurity in Algeria. We believe in the power of collective knowledge 
                  and the importance of building a strong cybersecurity community.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our events, workshops, and activities provide a platform for professionals, 
                  enthusiasts, and beginners to learn, connect, and contribute to the 
                  ever-evolving field of cybersecurity.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Goals</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Organize at least 4 local chapter meetings per year</p>
                    <p>• Foster inclusivity and diversity in cybersecurity</p>
                    <p>• Provide free education and training opportunities</p>
                    <p>• Build Algeria's cybersecurity community</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Chapter Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="font-semibold">Comprehensive Training</p>
                      <p className="text-gray-600">ISC2 CC, WAF deployment, DevSecOps</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <p className="font-semibold">Regional Collaboration</p>
                      <p className="text-gray-600">Partnership with OWASP Tunisia and other African chapters</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎤</span>
                    <div>
                      <p className="font-semibold">Expert Speakers</p>
                      <p className="text-gray-600">Industry leaders from EY, security professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <p className="font-semibold">Hands-on Learning</p>
                      <p className="text-gray-600">Crisis simulations, practical workshops</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leadership</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 text-lg">{leader.name}</h3>
                      <p className="text-sm text-gray-600">{leader.role}</p>
                      {leader.description && (
                        <p className="text-sm text-[#003594] font-medium">{leader.description}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#003594] font-medium">Algiers Chapter</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Events */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Recent Events & Training</h2>
            <div className="space-y-6">
              {recentEvents.map((event, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#003594]">{event.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          event.type === 'Conference' ? 'bg-purple-100 text-purple-800' :
                          event.type === 'Online Training' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">📅 {event.date}</p>
                      <p className="text-gray-600 mb-2">🎤 Speaker: {event.speakers}</p>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Highlights */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">2024 Training Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastHighlights.map((event, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-[#003594] mb-2">{event.title}</h4>
                  <p className="text-gray-600 text-sm mb-1">{event.date}</p>
                  <p className="text-gray-700 text-sm mb-2">Trainer: {event.trainer}</p>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Community & Partnerships */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Community & Partnerships</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌍 Regional Collaboration</h3>
                <p className="text-lg mb-6">
                  OWASP Algiers actively collaborates with other African chapters including 
                  OWASP Tunisia, participating in joint conferences and knowledge sharing initiatives.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Joint conferences with OWASP Tunisia</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cross-border speaker exchanges</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Shared resources and best practices</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎯 Chapter Impact</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Free Training Programs</h4>
                    <p className="text-gray-700">ISC2 Certified in CyberSecurity training with global certification opportunities</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Industry Partnerships</h4>
                    <p className="text-gray-700">Collaboration with EY, Mile2, and other security organizations</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Media Presence</h4>
                    <p className="text-gray-700">Regular appearances on Radio Medea and TechVerse events</p>
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
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎤 Call for Speakers</h3>
                <p className="text-gray-700 mb-4">
                  We're always looking for presenters on Application Security or Cybersecurity topics. 
                  Whether you're an experienced expert or someone with practical insights to share, 
                  we'd love to have you join us!
                </p>
                <p className="text-gray-700 mb-4">
                  We care deeply about inclusivity and diversity, ensuring OWASP is a comfortable 
                  and welcoming community for everyone.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Application security topics welcome</p>
                  <p>• Cybersecurity best practices</p>
                  <p>• Technical demonstrations and workshops</p>
                  <p>• Industry trends and case studies</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🤝 Sponsorship Opportunities</h3>
                <p className="text-gray-700 mb-4">
                  Support the growth of Algeria's cybersecurity community through our sponsorship 
                  programs. We offer meeting presenter sponsorship and various partnership opportunities.
                </p>
                <div className="space-y-3">
                  <a href="mailto:contact@owaspalgiers.org" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Become a Sponsor
                  </a>
                  <a href="#" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Join OWASP Foundation
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Algiers</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Algeria's cybersecurity transformation. Learn from experts, contribute 
              to the community, and help build a more secure digital future for North Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetup
              </a>
              <a href="mailto:contact@owaspalgiers.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Volunteer to Speak
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 