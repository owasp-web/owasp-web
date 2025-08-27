import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WellingtonChapterPage() {
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
            <h1 className="text-5xl font-bold mb-4">OWASP Wellington</h1>
            <p className="text-xl mb-6">Wellington, New Zealand</p>
            <p className="text-lg max-w-3xl mx-auto">
              New Zealand's capital chapter focusing on cutting-edge application security research, 
              enterprise security practices, and fostering the next generation of security professionals.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#101820] mb-6">Welcome to OWASP Wellington</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  OWASP Wellington serves New Zealand's capital and surrounding regions with 
                  regular meetups, technical workshops, and industry collaboration. Our chapter 
                  bridges the gap between academic research and practical security implementation.
                </p>
                <p>
                  We focus on emerging threats, modern security architectures, and building 
                  security into the software development lifecycle. Our events feature both 
                  local and international speakers covering the full spectrum of application security.
                </p>
                <p>
                  Located in the heart of New Zealand's technology and government sector, 
                  we provide unique insights into enterprise security challenges and solutions.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-[#003594] mb-4">Chapter Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Active since 2016</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Regular evening meetups</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>Enterprise security focus</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-[#003594] rounded-full mr-3"></span>
                  <span>University partnerships</span>
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
                <span className="text-white text-2xl font-bold">MC</span>
              </div>
              <h3 className="text-xl font-bold text-[#101820] mb-2">Matt Cotterell</h3>
              <p className="text-[#003594] font-medium mb-4">Chapter Leader</p>
              <p className="text-gray-600 text-sm">
                Leading Wellington's security community with expertise in authentication, OAuth, and secure web development.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-[#757575] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">KJ</span>
              </div>
              <h3 className="text-xl font-bold text-[#101820] mb-2">Kirk Jackson</h3>
              <p className="text-[#757575] font-medium mb-4">Co-Leader</p>
              <p className="text-gray-600 text-sm">
                Co-leading the Wellington chapter with extensive experience in web security fundamentals and OWASP projects.
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
                <h3 className="text-xl font-bold">Wellington Security Meetup</h3>
                <p className="text-blue-200">Monthly • Evenings</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Regular meetups featuring technical presentations, case studies, and 
                  networking opportunities for Wellington's security community.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Format:</strong> Technical presentations + networking</p>
                  <p><strong>Time:</strong> 5:30 PM start</p>
                  <p><strong>Audience:</strong> Security professionals & developers</p>
                </div>
                <Link 
                  href="https://www.meetup.com/owasp-wellington"
                  className="bg-[#003594] text-white px-4 py-2 rounded hover:bg-[#002d7a] transition-colors inline-block"
                >
                  Join Meetup Group
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-[#757575] text-white p-4">
                <h3 className="text-xl font-bold">OWASP Training Workshops</h3>
                <p className="text-gray-200">Quarterly events</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Hands-on training workshops covering practical application security 
                  topics, from secure development to penetration testing.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><strong>Duration:</strong> Half-day to full-day sessions</p>
                  <p><strong>Topics:</strong> Threat modeling, secure coding, OWASP tools</p>
                  <p><strong>Level:</strong> Beginner to advanced</p>
                </div>
                <Link 
                  href="mailto:matt.cotterell@owasp.org"
                  className="bg-[#757575] text-white px-4 py-2 rounded hover:bg-[#606060] transition-colors inline-block"
                >
                  Get Notified
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
                  <span className="font-bold text-sm">AUG</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#101820] mb-2">Move Fast and Secure Things: A Guide to Scaling Security</h3>
                  <p className="text-gray-600 mb-2">August 2024 • Greg Sienkiewicz, Rewind</p>
                  <p className="text-gray-700">
                    Practical guidance on evolving security programs from startup survival mode to mature, resilient practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#003594] text-white p-2 rounded">
                  <span className="font-bold text-sm">JUN</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#101820] mb-2">Federated Logins with OAuth 2, OpenID Connect, and JWTs</h3>
                  <p className="text-gray-600 mb-2">June 2024 • Matt Cotterell</p>
                  <p className="text-gray-700">
                    Deep dive into modern authentication protocols and implementation best practices for secure federated login systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#003594] text-white p-2 rounded">
                  <span className="font-bold text-sm">FEB</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#101820] mb-2">Same-origin policy: The Core of Web Security</h3>
                  <p className="text-gray-600 mb-2">February 2024 • Kirk Jackson</p>
                  <p className="text-gray-700">
                    Fundamental web security concepts exploring how same-origin policy protects web applications and users.
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
            Join Wellington's premier application security community. Connect with like-minded 
            professionals, learn from industry experts, and advance your security knowledge.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Attend Meetups</h3>
              <p className="mb-4">
                Join our monthly meetups for technical talks and networking.
              </p>
              <Link 
                href="https://www.meetup.com/owasp-wellington"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Join Meetup
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
              <p className="mb-4">
                Subscribe to our mailing list for event updates and security news.
              </p>
              <Link 
                href="https://groups.google.com/a/owasp.org/forum/#!forum/new-zealand-chapter"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Subscribe
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Present or Sponsor</h3>
              <p className="mb-4">
                Share your expertise or support our community as a presenter or sponsor.
              </p>
              <Link 
                href="mailto:matt.cotterell@owasp.org"
                className="bg-white text-[#003594] px-6 py-2 rounded font-bold hover:bg-gray-100 transition-colors inline-block"
              >
                Get in Touch
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
                <p>Chapter Leaders: Matt Cotterell & Kirk Jackson</p>
                <p>Email: matt.cotterell@owasp.org</p>
                <p>Location: Wellington, New Zealand</p>
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
                <Link href="https://www.meetup.com/owasp-wellington" className="text-gray-300 hover:text-white transition-colors">
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