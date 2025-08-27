'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import { createClientComponentClient } from '@/lib/supabase';
import type { Event } from '@/lib/types';

interface EventCardProps {
  date: string;
  month: string;
  year: string;
  time: string;
  title: string;
  location: string;
  type: 'Conference' | 'Chapter Meeting' | 'Training' | 'Workshop';
  image: string;
  price?: string;
  registrationUrl?: string;
}

const EventCard = ({ date, month, year, time, title, location, type, image, price, registrationUrl }: EventCardProps) => {
  const typeColors = {
    'Conference': 'bg-[#dc3545] text-white',
    'Chapter Meeting': 'bg-[#28a745] text-white',
    'Training': 'bg-[#ffc107] text-[#101820]',
    'Workshop': 'bg-[#6f42c1] text-white'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeColors[type]}`}>
            {type}
          </span>
        </div>
        {price && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-[#ffb81b] text-[#101820] rounded-full text-sm font-semibold">
              {price}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="font-['Barlow'] font-medium text-[32px] text-[#003594] tracking-[-0.64px] leading-8">
              {date}
            </div>
            <div className="flex flex-col font-['Poppins'] text-[#101820] text-sm">
              <div className="leading-5 font-semibold">{month}</div>
              <div className="leading-5 text-gray-600">{year}</div>
            </div>
          </div>
          <div className="text-[#757575] text-sm">
            {time}
          </div>
        </div>
        
        <h3 className="font-['Barlow'] font-medium text-xl text-[#101820] mb-2 group-hover:text-[#003594] transition-colors">
          {title}
        </h3>
        
        <p className="font-['Poppins'] text-[#757575] text-sm mb-4 flex items-center gap-2">
          <Image src="/images/icons/marker.svg" alt="" width={16} height={16} className="opacity-60" />
          {location}
        </p>
        
        <div className="flex gap-3">
          <Button text="Learn More" variant="ghost-dark" size="40" />
          {registrationUrl && (
            <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button text="Register" variant="primary" size="40" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const eventsList = (data as unknown as Event[]) || [];
      setEvents(eventsList);
      
      // Find featured event
      const featured = eventsList.find(event => event.is_featured);
      setFeaturedEvent(featured || eventsList[0] || null);
    } catch (err: any) {
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const eventTypes = [
    "All Events",
    "Conferences", 
    "Chapter Meetings",
    "Training",
    "Workshops"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {error && (
        <ResponsiveContainer size="full" className="mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </ResponsiveContainer>
      )}
      
      {/* Hero Section */}
      <div className="bg-white">
        <ResponsiveContainer size="full" className="py-16 sm:py-20 lg:py-32">
          <div className="text-center space-y-8 lg:space-y-16">
            <div className="space-y-6 lg:space-y-8">
              <h1 className="font-['Barlow'] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-[#101820] tracking-[-0.48px] sm:tracking-[-0.64px] md:tracking-[-0.8px] xl:tracking-[-1.28px] leading-tight xl:leading-[64px]">
                Global and Regional Events
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 text-left lg:text-left">
                <div>
                  <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6 sm:leading-7">
                    Ever wanted to network and learn along with other AppSec
                    professionals? We host nearly a dozen events each year varying
                    in format to week long trainings and conferences, to single day
                    programs.
                  </p>
                </div>
                <div>
                  <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6 sm:leading-7">
                    Although some events have corporate sponsors, all content
                    remains vendor neutral, and speakers are carefully selected to
                    deliver a valuable experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Featured Event */}
      {featuredEvent && (
        <div className="bg-white">
          <ResponsiveContainer size="full" className="py-16 sm:py-20">
            <div className="bg-gradient-to-r from-[#003594] to-[#0056d6] rounded-xl lg:rounded-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 sm:p-8 lg:p-12">
                  <div className="mb-4 sm:mb-6">
                    <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#ffb81b] text-[#101820] rounded-full text-xs sm:text-sm font-semibold">
                      Featured Event
                    </span>
                  </div>
                  <h2 className="font-['Barlow'] font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] text-white leading-tight xl:leading-[44px] tracking-[-0.36px] md:tracking-[-0.4px] xl:tracking-[-0.8px] mb-3 sm:mb-4">
                    {featuredEvent.title}
                  </h2>
                  <p className="font-['Poppins'] text-white/90 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 mb-4 sm:mb-6">
                    {featuredEvent.description || 'Join security professionals for learning, networking, and inspiration.'}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 text-white">
                      <Image src="/images/icons/marker.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                      <span className="text-sm sm:text-base">{featuredEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <span className="text-sm sm:text-base">{featuredEvent.month} {featuredEvent.date}, {featuredEvent.year}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {featuredEvent.registration_url && (
                      <a href={featuredEvent.registration_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button text="Register Now" variant="light-blue" size="48" />
                      </a>
                    )}
                    <Button text="View Details" variant="ghost-white" size="48" />
                  </div>
                </div>
                <div className="w-full lg:w-1/3 relative h-64 sm:h-80 lg:h-auto">
                  <Image src={featuredEvent.image} alt={featuredEvent.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          </ResponsiveContainer>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200">
        <ResponsiveContainer size="full" className="py-6 sm:py-8">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {eventTypes.map((type, index) => (
              <button
                key={index}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-[#003594] text-white' 
                    : 'bg-gray-100 text-[#757575] hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </ResponsiveContainer>
      </div>

      {/* Events Grid */}
      <ResponsiveContainer size="full" className="py-16 sm:py-20">
        <div className="mb-8 sm:mb-12">
          <h2 className="font-['Barlow'] font-medium text-2xl sm:text-3xl lg:text-[40px] text-[#101820] leading-tight lg:leading-[40px] tracking-[-0.48px] lg:tracking-[-0.8px] mb-3 sm:mb-4">
            Upcoming Events
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6">
            Don't miss these opportunities to connect with the OWASP community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events available</h3>
              <p className="text-gray-500">Check back soon for upcoming events.</p>
            </div>
          ) : (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                date={event.date}
                month={event.month}
                year={event.year}
                time={event.time}
                title={event.title}
                location={event.location}
                type={event.type}
                image={event.image}
                price={event.price}
                registrationUrl={event.registration_url}
              />
            ))
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-[#f8f9fa] rounded-lg p-6 sm:p-8 lg:p-12 text-center">
          <h3 className="font-['Barlow'] font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] text-[#101820] mb-3 sm:mb-4">
            Stay Updated on Events
          </h3>
          <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive notifications about upcoming events, early bird pricing, 
            and exclusive content from the OWASP community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent text-sm sm:text-base"
            />
            <Button text="Subscribe" variant="primary" size="48" />
          </div>
        </div>
      </ResponsiveContainer>

      <Footer />
    </div>
  );
} 