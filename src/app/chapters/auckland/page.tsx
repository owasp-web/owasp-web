import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AucklandChapterPage() {
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
            <h1 className="text-5xl font-bold mb-4">OWASP Auckland</h1>
            <p className="text-xl mb-6">Auckland, New Zealand</p>
            <p className="text-lg max-w-3xl mx-auto">
              Join the most active OWASP chapter in New Zealand, advancing application security 
              through regular meetups, training, and the annual OWASP New Zealand Day conference.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#101820] mb-6">Welcome to OWASP Auckland</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  The OWASP Auckland Chapter has been the cornerstone of New Zealand's application 
                  security community. We organize regular meetups, training events, and host the 
                  prestigious OWASP New Zealand Day conference annually.
                </p>
                <p>
                  Our meetups feature presentations on the latest security research, OWASP projects, 
                  and practical security techniques that developers and security professionals can 
                  implement immediately.
                </p>
                <p>
                  Whether you're a developer, security professional, or simply interested in 
                  application security, our community welcomes all skill levels and backgrounds.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-[#003594] mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Active since 2007</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Monthly meetups at The Corner Store</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Hosts annual OWASP NZ Day conference</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Regular training workshops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#101820] mb-12">Chapter Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-[#003594] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">AC</span>
              </div>
              <h3 className="text-xl font-bold text-[#101820] mb-2">Austin Chamberlain</h3>
              <p className="text-[#003594] font-medium mb-4">Chapter Leader</p>
              <p className="text-gray-600 text-sm">
                Leading the Auckland meetups and coordinating with the broader OWASP New Zealand community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#101820] mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#003594] text-white p-4">
                <h3 className="text-xl font-bold">OWASP New Zealand Day 2025</h3>
                <p className="text-blue-200">September 2-5, 2025</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  The premier application security conference in New Zealand. Two-day conference 
                  with pre-conference training opportunities.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Venue:</strong> University of Auckland</p>
                  <p><strong>Training:</strong> September 2-3</p>
                  <p><strong>Conference:</strong> September 4-5</p>
                </div>
                <Link 
                  href="https://appsec.org.nz/conference/"
                  className="bg-[#003594] text-white px-4 py-2 rounded hover:bg-[#002d7a] transition-colors inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#757575] text-white p-4">
                <h3 className="text-xl font-bold">Monthly Auckland Meetup</h3>
                <p className="text-gray-200">Third Tuesday of each month</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Regular meetups featuring OWASP Top 10 topics and technical presentations 
                  from industry experts.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Location:</strong> The Corner Store, 25 Mount Eden Road</p>
                  <p><strong>Time:</strong> 6:00 PM (doors) - 6:30 PM (presentations)</p>
                  <p><strong>Format:</strong> In-person with networking</p>
                </div>
                <Link 
                  href="https://www.meetup.com/owasp-auckland"
                  className="bg-[#757575] text-white px-4 py-2 rounded hover:bg-[#606060] transition-colors inline-block"
                >
                  Join Meetup Group
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#101820] mb-12">Recent Activities</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#003594] text-white p-2 rounded">
                  <span className="font-bold text-sm">SEP</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#101820] mb-2">OWASP Top 10 2021: A05 - Security Misconfiguration</h3>
                  <p className="text-gray-600 mb-2">September 2024 • Austin Chamberlain</p>
                  <p className="text-gray-700">
                    Deep dive into security misconfiguration vulnerabilities and prevention strategies for modern applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#003594] text-white p-2 rounded">
                  <span className="font-bold text-sm">JUL</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#101820] mb-2">OWASP Training Day Auckland</h3>
                  <p className="text-gray-600 mb-2">July 2024 • Multiple Trainers</p>
                  <p className="text-gray-700">
                    Full-day training workshops covering threat modeling and application security verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Involved */}
      <section className="py-16 bg-gradient-to-r from-[#003594] to-[#0056b3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Get Involved</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our vibrant community of security professionals, developers, and enthusiasts. 
            Whether you're just starting out or are a seasoned expert, there's a place for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Join Our Meetup</h3>
              <p className="mb-4">
                Attend our monthly meetups for networking and learning opportunities.
              </p>
              <Link 
                href="https://www.meetup.com/owasp-auckland"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Join Meetup
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Mailing List</h3>
              <p className="mb-4">
                Stay updated with chapter news and announcements.
              </p>
              <Link 
                href="https://groups.google.com/a/owasp.org/forum/#!forum/new-zealand-chapter"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Subscribe
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Become a Speaker</h3>
              <p className="mb-4">
                Share your knowledge with the community by presenting at our events.
              </p>
              <Link 
                href="mailto:austin.chamberlain@owasp.org"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social */}
      <section className="py-12 bg-[#101820]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-300">
                <p>Chapter Leader: Austin Chamberlain</p>
                <p>Email: austin.chamberlain@owasp.org</p>
                <p>Location: The Corner Store, 25 Mount Eden Road, Auckland</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <Link href="https://twitter.com/owaspnz" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="https://www.linkedin.com/company/owasp-new-zealand" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="https://www.meetup.com/owasp-auckland" className="text-gray-300 hover:text-white transition-colors">
                  Meetup
                </Link>
              </div>
            </div>
          </div>
        </div>
              </section>
      </main>
      <Footer />
    </>
  );
} 