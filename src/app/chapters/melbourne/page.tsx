'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MelbourneChapterPage() {
  const leaders = [
    { name: 'Daniel Ting', role: 'Chapter Leader', twitter: '@hellodanielting' },
    { name: 'Gyle dela Cruz', role: 'Chapter Leader', twitter: '@GyledC' }
  ];

  const communicationChannels = [
    { name: 'Twitter', handle: '@OWASPmelbourne', icon: '🐦', url: 'https://twitter.com/OWASPmelbourne' },
    { name: 'Meetup.com', handle: 'OWASP Melbourne', icon: '📅', url: '#' },
    { name: 'YouTube', handle: 'OWASP Melbourne Channel', icon: '📹', url: '#' },
    { name: 'Slack', handle: '#chapter-melbourne', icon: '💬', url: '#' },
    { name: 'Discord', handle: 'Melbourne Community', icon: '🎮', url: '#' }
  ];

  const appSecDayStats = [
    { year: '2017', attendees: '300', note: 'First major event' },
    { year: '2018', attendees: '650', note: 'Doubled in size, sold out' },
    { year: '2019', attendees: '800+', note: 'Continued growth' }
  ];

  const pastTopics = [
    'Implementation of Security in the Software Development Lifecycle',
    'Creating secure code requires more than just good intentions',
    'Top Ten Web Defences',
    'Introduction to Buffer Overflows',
    'DevSecOps practices for fast Agile software delivery',
    'Building and deploying secure web and mobile applications'
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
              <h1 className="text-5xl font-bold mb-4">OWASP Melbourne</h1>
              <p className="text-xl mb-6">Victoria, Australia</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Welcome to the Melbourne chapter! Home of the renowned OWASP AppSec Day conference and 
                one of Australia's most active application security communities. We look forward to 
                welcoming you at our events.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🎯 Host of OWASP AppSec Day</h3>
                <p className="text-lg">Australia's only conference dedicated entirely to building and deploying secure web and mobile applications</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Meetup
                </a>
                <a href="https://twitter.com/OWASPmelbourne" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Follow @OWASPmelbourne
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Melbourne</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  The Melbourne chapter is one of Australia's most vibrant application security communities. 
                  We're volunteer-run and focus on providing a welcoming environment for developers, testers, 
                  DevOps engineers, students, and security professionals.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Our mission is to improve knowledge and skills in building secure web and mobile applications, 
                  covering DevSecOps practices for fast Agile software delivery environments. We're passionate 
                  about making security accessible to everyone.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">💡 Community Values</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Welcoming environment for all skill levels</p>
                    <p>• Vendor-neutral, educational focus</p>
                    <p>• Volunteer-driven community</p>
                    <p>• Practical, actionable security knowledge</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Chapter Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-semibold">AppSec Day Conference</p>
                      <p className="text-gray-600">Australia's premier AppSec conference (800+ attendees)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📹</span>
                    <div>
                      <p className="font-semibold">YouTube Channels</p>
                      <p className="text-gray-600">OWASP Melbourne + AppSec Day recordings</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <p className="font-semibold">Major Sponsors</p>
                      <p className="text-gray-600">Commonwealth Bank & 15+ corporate supporters</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-semibold">Multi-Platform Community</p>
                      <p className="text-gray-600">Twitter, Meetup, Slack, Discord presence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Leadership */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leadership</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-[#003594] text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 text-lg">{leader.name}</h3>
                      <p className="text-sm text-gray-600">{leader.role}</p>
                      {leader.twitter && (
                        <p className="text-sm text-[#003594] font-medium">{leader.twitter}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#003594] font-medium">Melbourne Chapter</p>
                </div>
              ))}
            </div>
          </section>

          {/* OWASP AppSec Day */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">OWASP AppSec Day Conference</h2>
            <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Australia's Premier AppSec Conference</h3>
              <p className="text-lg mb-6">
                OWASP AppSec Day is Australia's only conference dedicated entirely to building and 
                deploying secure web and mobile applications, covering DevSecOps practices for fast 
                Agile software delivery environments.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {appSecDayStats.map((stat, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <h4 className="text-3xl font-bold mb-2">{stat.attendees}</h4>
                    <p className="text-lg font-semibold mb-1">{stat.year}</p>
                    <p className="text-sm opacity-90">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-[#003594] mb-4">Conference Growth</h4>
                <p className="text-gray-700 mb-4">
                  Starting with 300 tickets in 2017, AppSec Day has experienced tremendous growth. 
                  In 2018, we doubled our venue size and sold out with 650 attendees. By 2019, 
                  we welcomed over 800 delegates.
                </p>
                <p className="text-gray-700 mb-4">
                  The positive feedback from our 15+ sponsors has been consistent year after year, 
                  with our major sponsor Commonwealth Bank supporting us from the start.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-[#003594] mb-4">What to Expect</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-gray-700">Expert speakers from around the world</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-gray-700">Practical DevSecOps workshops and training</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-gray-700">Networking with 800+ security professionals</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <p className="text-gray-700">Latest trends in application security</p>
                  </div>
                </div>
                <div className="mt-6">
                  <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Watch Past Presentations
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Communication Channels */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Stay Connected</h2>
            <p className="text-lg text-gray-700 mb-8">
              Melbourne has one of the most active OWASP communities globally. Join us across multiple platforms:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communicationChannels.map((channel, index) => (
                <a 
                  key={index} 
                  href={channel.url}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow hover:border-[#003594]"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{channel.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                      <p className="text-sm text-gray-600">{channel.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#003594] font-medium">Join Community →</p>
                </a>
              ))}
            </div>
            
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-[#003594] mb-3">💬 Most Active on Discord</h3>
              <p className="text-gray-700">
                While we're present on all platforms, the Melbourne Chapter is most social on Discord. 
                Come say hi and join the conversation!
              </p>
            </div>
          </section>

          {/* Meetup Topics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Our Meetup Topics</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our talks cover any aspect of application security. Here are some examples of our past presentations:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {pastTopics.map((topic, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <span className="text-[#003594] mt-1">📚</span>
                    <p className="text-gray-800 font-medium">{topic}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-700 mb-4">
                Want to see more? Check out our upcoming meetups and past recordings.
              </p>
              <div className="space-x-4">
                <a href="#" className="inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                  View Meetup Page
                </a>
                <a href="#" className="inline-block border border-[#003594] text-[#003594] px-6 py-2 rounded-lg hover:bg-[#003594] hover:text-white transition-colors">
                  YouTube Channel
                </a>
              </div>
            </div>
          </section>

          {/* Speaking & Sponsorship */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎤 Speaking at a Meetup</h3>
                <p className="text-gray-700 mb-4">
                  Want to share your knowledge? To be a speaker at the next Melbourne Chapter event, 
                  simply message the local chapter leader on Meetup.com with details of your talk.
                </p>
                <p className="text-gray-700 mb-4">
                  You can also reach out via Twitter DMs, or email one of our Chapter leads directly.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Any aspect of application security</p>
                  <p>• Vendor-neutral content preferred</p>
                  <p>• All skill levels welcome</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🤝 Chapter Sponsorship</h3>
                <p className="text-gray-700 mb-4">
                  Like most chapters, we're volunteer-run and typically pay for everything ourselves. 
                  If you like what we do and would like to show your support, consider sponsoring 
                  our events or becoming an OWASP member.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Sponsor Our Events
                  </a>
                  <a href="#" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Become OWASP Member
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Melbourne</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Australia's most active application security community. Network with 800+ 
              professionals, attend world-class events, and advance your security skills.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetup
              </a>
              <a href="https://twitter.com/OWASPmelbourne" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Follow on Twitter
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