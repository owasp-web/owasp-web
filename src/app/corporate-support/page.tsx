import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer';

export default function CorporateSupportPage() {
  const benefits = [
    {
      title: "Global Brand Exposure",
      description: "Reach 50,000+ security professionals worldwide through our conferences, website, and materials.",
      icon: "/images/icons/check.svg"
    },
    {
      title: "Thought Leadership",
      description: "Position your organization as a leader in application security through speaking opportunities.",
      icon: "/images/icons/check.svg"
    },
    {
      title: "Talent Pipeline",
      description: "Connect with top security talent through our global network of professionals.",
      icon: "/images/icons/check.svg"
    },
    {
      title: "Industry Influence",
      description: "Shape the future of application security by supporting open source innovation.",
      icon: "/images/icons/check.svg"
    }
  ];

  const tiers = [
    {
      title: "Supporter",
      amount: "$2,500",
      period: "per year",
      features: [
        "Logo on OWASP website",
        "Newsletter inclusion",
        "Social media recognition",
        "Chapter meeting mentions"
      ],
      highlighted: false
    },
    {
      title: "Advocate",
      amount: "$5,000",
      period: "per year", 
      features: [
        "All Supporter benefits",
        "Conference booth space",
        "Speaking opportunities",
        "Recruitment access",
        "Custom content opportunities"
      ],
      highlighted: true
    },
    {
      title: "Champion",
      amount: "$10,000",
      period: "per year",
      features: [
        "All Advocate benefits",
        "Premium booth placement",
        "Keynote opportunities",
        "Executive roundtables",
        "Custom research collaboration",
        "Priority project sponsorship"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#101820] relative">
        <ResponsiveContainer size="full" className="py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="font-['Barlow'] font-medium text-4xl sm:text-5xl lg:text-[56px] text-white leading-tight tracking-tight mb-4 sm:mb-6">
              Corporate Support
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-base sm:text-lg leading-7 mb-6 sm:mb-8">
              Partner with OWASP to advance application security worldwide. Support our mission while gaining 
              access to the global security community and demonstrating your commitment to secure software development.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button text="Become a Supporter" variant="light-blue" size="56" />
              <Button text="View Partnership Options" variant="ghost-white" size="56" />
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Current Supporters */}
      <div className="bg-white">
        <ResponsiveContainer size="full" className="py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow'] font-medium text-3xl sm:text-4xl lg:text-[48px] text-[#101820] leading-tight tracking-tight mb-4 lg:mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
              Join these innovative companies supporting OWASP's mission to make software security visible.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center opacity-60">
            <Image src="/images/logos/salesforce-logo.svg" alt="Salesforce" width={120} height={60} className="object-contain" />
            <Image src="/images/logos/adobe-logo.svg" alt="Adobe" width={120} height={60} className="object-contain" />
            <Image src="/images/logos/checkpoint-logo.svg" alt="Check Point" width={120} height={60} className="object-contain" />
            <Image src="/images/logos/atlassian-logo.svg" alt="Atlassian" width={120} height={60} className="object-contain" />
            <Image src="/images/logos/rakuten-logo.svg" alt="Rakuten" width={120} height={60} className="object-contain" />
            <Image src="/images/logos/united-airlines-logo.svg" alt="United Airlines" width={120} height={60} className="object-contain" />
          </div>
        </ResponsiveContainer>
      </div>

      {/* Benefits */}
      <ResponsiveContainer size="full" className="py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Barlow'] font-medium text-3xl sm:text-4xl lg:text-[48px] text-[#101820] leading-tight tracking-tight mb-4 lg:mb-6">
            Why Support OWASP?
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
            Partner with the most trusted name in application security and gain access to our global community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 lg:mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4 sm:gap-6 p-5 sm:p-8 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#003594] rounded-full flex items-center justify-center shrink-0">
                <Image src={benefit.icon} alt="" width={18} height={18} className="filter brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-['Barlow'] font-medium text-xl sm:text-2xl lg:text-[24px] text-[#101820] mb-2 sm:mb-3">
                  {benefit.title}
                </h3>
                <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveContainer>

      {/* Sponsorship Tiers */}
      <div className="bg-white">
        <ResponsiveContainer size="full" className="py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow'] font-medium text-3xl sm:text-4xl lg:text-[48px] text-[#101820] leading-tight tracking-tight mb-4 lg:mb-6">
              Support Levels
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto">
              Choose the level of support that aligns with your organization's goals and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 lg:mb-16">
            {tiers.map((tier, index) => (
              <div key={index} className={`p-6 sm:p-8 rounded-lg ${tier.highlighted ? 'bg-[#003594] text-white ring-4 ring-[#ffb81b]' : 'bg-gray-50'}`}>
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className={`font-['Barlow'] font-medium text-2xl sm:text-[32px] mb-3 sm:mb-4 ${tier.highlighted ? 'text-white' : 'text-[#101820]'}`}>
                    {tier.title}
                  </h3>
                  <div className={`font-['Barlow'] font-medium text-3xl sm:text-[48px] leading-tight tracking-tight ${tier.highlighted ? 'text-[#ffb81b]' : 'text-[#003594]'}`}>
                    {tier.amount}
                  </div>
                  <div className={`font-['Poppins'] text-sm ${tier.highlighted ? 'text-white/80' : 'text-[#757575]'}`}>
                    {tier.period}
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Image src="/images/icons/check.svg" alt="" width={16} height={16} className={`mt-1 shrink-0 ${tier.highlighted ? 'filter brightness-0 invert' : ''}`} />
                      <span className={`font-['Poppins'] text-sm ${tier.highlighted ? 'text-white' : 'text-[#757575]'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  text={tier.highlighted ? "Get Started" : "Choose Plan"} 
                  variant={tier.highlighted ? "light-blue" : "primary"} 
                  size="48" 
                />
              </div>
            ))}
          </div>
        </ResponsiveContainer>
      </div>

      {/* Contact Form */}
      <ResponsiveContainer size="full" className="py-12 sm:py-16 lg:py-20">
        <div className="bg-gradient-to-r from-[#003594] to-[#0056d6] rounded-2xl p-8 sm:p-12 lg:p-16 text-center text-white">
          <h2 className="font-['Barlow'] font-medium text-3xl sm:text-4xl lg:text-[48px] leading-tight tracking-tight mb-4 sm:mb-6">
            Ready to Partner with OWASP?
          </h2>
          <p className="font-['Poppins'] text-white/90 text-base sm:text-lg leading-7 sm:leading-8 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Let's discuss how your organization can support OWASP's mission and benefit from our global community.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Company Name"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
              <input 
                type="text" 
                placeholder="Contact Name"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <input 
                type="email" 
                placeholder="Email Address"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
              <select className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]">
                <option value="">Support Level Interest</option>
                <option value="supporter">Supporter ($2,500)</option>
                <option value="advocate">Advocate ($5,000)</option>
                <option value="champion">Champion ($10,000)</option>
                <option value="custom">Custom Partnership</option>
              </select>
            </div>
            <textarea 
              placeholder="Tell us about your organization and goals..."
              rows={4}
              className="w-full px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b] mb-8"
            />
            <Button text="Submit Partnership Inquiry" variant="light-blue" size="56" />
          </div>
        </div>
      </ResponsiveContainer>

      <Footer />
    </div>
  );
} 