'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Chapter } from '@/lib/types';

interface ChapterPageLayoutProps {
  chapter: Chapter;
}

export default function ChapterPageLayout({ chapter }: ChapterPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                {chapter.country_flag && (
                  <span className="text-6xl mr-4">{chapter.country_flag}</span>
                )}
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">{chapter.name}</h1>
              <p className="text-xl mb-6">{chapter.country}</p>
              {chapter.hero_description && (
                <p className="text-lg max-w-4xl mx-auto mb-8">
                  {chapter.hero_description}
                </p>
              )}
              {chapter.hero_highlight_title && (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                  <h3 className="text-2xl font-bold mb-4">{chapter.hero_highlight_title}</h3>
                  {chapter.hero_highlight_description && (
                    <p className="text-lg">{chapter.hero_highlight_description}</p>
                  )}
                </div>
              )}
              <div className="flex justify-center space-x-4">
                {chapter.meetup_url && (
                  <a href={chapter.meetup_url} className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Join Our Meetup
                  </a>
                )}
                {chapter.website_url && (
                  <a href={chapter.website_url} className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                    Official Chapter Page
                  </a>
                )}
                {chapter.contact_email && (
                  <a href={`mailto:${chapter.contact_email}`} className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                    Contact Chapter
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About {chapter.name}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                {chapter.about_content && (
                  <div className="space-y-6">
                    {chapter.about_content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-lg text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {chapter.mission_points && chapter.mission_points.length > 0 && (
                  <div className="bg-green-50 p-6 rounded-lg mt-6">
                    <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                    <div className="space-y-2 text-gray-700">
                      {chapter.mission_points.map((point, index) => (
                        <p key={index}>• {point}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {chapter.economic_impact && (
                  <div>
                    <h3 className="text-xl font-semibold text-[#003594] mb-4">Why {chapter.city} Leads</h3>
                    <div className="space-y-4">
                      {chapter.economic_impact.people_protected && (
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl mt-1">👥</span>
                          <div>
                            <p className="font-semibold">Community Impact</p>
                            <p className="text-gray-600">{chapter.economic_impact.people_protected}</p>
                          </div>
                        </div>
                      )}
                      {chapter.economic_impact.economy_secured && (
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl mt-1">💰</span>
                          <div>
                            <p className="font-semibold">Economic Security</p>
                            <p className="text-gray-600">{chapter.economic_impact.economy_secured}</p>
                          </div>
                        </div>
                      )}
                      {chapter.economic_impact.regional_influence && chapter.economic_impact.regional_influence.length > 0 && (
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl mt-1">🌍</span>
                          <div>
                            <p className="font-semibold">Regional Influence</p>
                            <p className="text-gray-600">{chapter.economic_impact.regional_influence.join(', ')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Tech Ecosystem */}
          {chapter.tech_ecosystem && chapter.tech_ecosystem.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#003594] mb-8">{chapter.city} Tech Ecosystem</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {chapter.tech_ecosystem.map((company, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-[#003594]">{company.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {company.sector}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{company.description}</p>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Impact: {company.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Focus Areas */}
          {chapter.focus_areas && chapter.focus_areas.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#003594] mb-8">Our Focus Areas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {chapter.focus_areas.map((area, index) => (
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
          )}

          {/* Upcoming Events */}
          {chapter.next_event && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#003594] mb-8">Next Event</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#003594] mb-2">{chapter.next_event.title}</h3>
                <p className="text-gray-700 mb-2">{chapter.next_event.date} {chapter.next_event.time && `at ${chapter.next_event.time}`}</p>
                {chapter.next_event.description && (
                  <p className="text-gray-700 mb-3">{chapter.next_event.description}</p>
                )}
                {chapter.next_event.speaker && (
                  <p className="text-gray-700"><strong>Speaker:</strong> {chapter.next_event.speaker}</p>
                )}
                {chapter.next_event.registration_url && (
                  <a href={chapter.next_event.registration_url} className="inline-block mt-4 bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors">
                    Register Now
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Events */}
          {chapter.events && chapter.events.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#003594] mb-8">Recent Events</h2>
              <div className="space-y-6">
                {chapter.events.slice(0, 3).map((event, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#003594] mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.date} {event.time && `at ${event.time}`}</p>
                    {event.description && (
                      <p className="text-gray-700 mb-3">{event.description}</p>
                    )}
                    {event.speaker && (
                      <p className="text-gray-700"><strong>Speaker:</strong> {event.speaker}</p>
                    )}
                    {event.speaker_bio && (
                      <p className="text-sm text-gray-600 mt-2">{event.speaker_bio}</p>
                    )}
                    {event.video_url && (
                      <a href={event.video_url} className="inline-block mt-3 text-[#003594] underline">
                        View Recording
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership */}
          {chapter.leadership_team && chapter.leadership_team.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Leaders</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapter.leadership_team.map((leader, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    {leader.image && (
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                        <Image src={leader.image} alt={leader.name} width={80} height={80} className="object-cover" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-[#003594] text-center">{leader.name}</h3>
                    {leader.role && (
                      <p className="text-gray-600 text-center mb-2">{leader.role}</p>
                    )}
                    {leader.bio && (
                      <p className="text-sm text-gray-700 text-center">{leader.bio}</p>
                    )}
                    {leader.contact && (
                      <p className="text-sm text-center mt-2">
                        <a href={`mailto:${leader.contact}`} className="text-[#003594] underline">
                          Contact
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Social Links */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Connect With Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {chapter.meetup_url && (
                <a href={chapter.meetup_url} className="bg-[#003594] text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-[#002d7a] transition-colors">
                  Meetup
                </a>
              )}
              {chapter.linkedin_url && (
                <a href={chapter.linkedin_url} className="bg-blue-800 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-900 transition-colors">
                  LinkedIn
                </a>
              )}
              {chapter.twitter_url && (
                <a href={chapter.twitter_url} className="bg-blue-500 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
                  Twitter
                </a>
              )}
              {chapter.facebook_url && (
                <a href={chapter.facebook_url} className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors">
                  Facebook
                </a>
              )}
              {chapter.youtube_url && (
                <a href={chapter.youtube_url} className="bg-red-600 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-red-700 transition-colors">
                  YouTube
                </a>
              )}
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join {chapter.name}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {chapter.tagline || `Be part of ${chapter.region}'s cybersecurity community. Join us in advancing application security and fostering collaboration in ${chapter.city}.`}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {chapter.meetup_url && (
                <a href={chapter.meetup_url} className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
              )}
              {chapter.contact_email && (
                <a href={`mailto:${chapter.contact_email}`} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Leaders
                </a>
              )}
              {chapter.website_url && (
                <a href={chapter.website_url} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Learn More
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
