import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function ChapterStarterKitPage() {
  const resources = [
    {
      title: "Chapter Formation Guide",
      description: "Step-by-step instructions for establishing a new OWASP chapter in your region.",
      icon: "/images/icons/check.svg",
      type: "PDF Guide"
    },
    {
      title: "Event Planning Templates",
      description: "Ready-to-use templates for organizing meetings, workshops, and conferences.",
      icon: "/images/icons/check.svg",
      type: "Templates"
    },
    {
      title: "Marketing Materials",
      description: "Logos, banners, and promotional materials to help market your chapter.",
      icon: "/images/icons/check.svg",
      type: "Assets"
    },
    {
      title: "Speaker Bureau",
      description: "Access to OWASP experts who can present at your chapter meetings.",
      icon: "/images/icons/check.svg",
      type: "Network"
    },
    {
      title: "Funding Guidelines",
      description: "Information about available funding and budget management for chapters.",
      icon: "/images/icons/check.svg",
      type: "Financial"
    },
    {
      title: "Legal Documentation",
      description: "Standard agreements and legal documents for chapter operations.",
      icon: "/images/icons/check.svg",
      type: "Legal"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Submit Application",
      description: "Complete the chapter formation application with your region and initial plan."
    },
    {
      step: "2",
      title: "Review Process",
      description: "OWASP reviews your application and provides feedback within 2-3 weeks."
    },
    {
      step: "3",
      title: "Chapter Approval",
      description: "Once approved, you'll receive access to OWASP resources and infrastructure."
    },
    {
      step: "4",
      title: "Launch Event",
      description: "Plan and execute your first chapter meeting with OWASP support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#101820] relative">
        <div className="max-w-[1440px] mx-auto px-[120px] py-24">
          <div className="max-w-4xl">
            <h1 className="font-['Barlow'] font-medium text-[56px] text-white leading-[56px] tracking-[-1.12px] mb-6">
              Chapter Starter Kit
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Everything you need to start and manage a successful OWASP chapter in your region. 
              From initial planning to ongoing operations, we provide the tools and support you need.
            </p>
            <div className="flex gap-4">
              <Button text="Apply to Start Chapter" variant="light-blue" size="56" />
              <Button text="Contact Support" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
            How to Start a Chapter
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
            Follow these simple steps to establish your OWASP chapter and begin building your local security community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#003594] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {item.step}
              </div>
              <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] mb-3">
                {item.title}
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[120px] py-20">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
              Starter Kit Resources
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
              Access comprehensive resources designed to help you launch and grow your chapter successfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => {
              // Define type-specific colors and styles
              const typeStyles = {
                'PDF Guide': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
                'Templates': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
                'Assets': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
                'Network': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
                'Financial': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
                'Legal': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
              };
              
              const typeStyle = typeStyles[resource.type as keyof typeof typeStyles] || typeStyles['PDF Guide'];
              
              return (
                <div 
                  key={index} 
                  className="group bg-white border border-gray-200 hover:border-[#003594] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Type Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border} border`}>
                      {resource.type}
                    </span>
                    <div className="w-10 h-10 bg-[#003594] group-hover:bg-[#0056d6] rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300">
                      <Image 
                        src={resource.icon} 
                        alt="" 
                        width={16} 
                        height={16} 
                        className="filter brightness-0 invert" 
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] group-hover:text-[#003594] transition-colors duration-300 mb-3 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="font-['Poppins'] text-[#757575] text-sm leading-6">
                      {resource.description}
                    </p>
                  </div>
                  
                  {/* Download Button */}
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full bg-[#003594] hover:bg-[#0056d6] text-white font-['Poppins'] font-medium text-sm py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      <span>Download Resource</span>
                      <svg 
                        className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Resources Note */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] mb-3">
                Need Additional Support?
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-sm leading-6 mb-6">
                Our chapter development team is here to help with personalized guidance, 
                additional resources, and ongoing support throughout your chapter's journey.
              </p>
              <div className="flex gap-4 justify-center">
                <Button text="Contact Chapter Team" variant="primary" size="48" />
                <Button text="Join Community Forum" variant="ghost-dark" size="48" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="bg-gradient-to-r from-[#003594] to-[#0056d6] rounded-2xl p-16 text-center text-white">
          <h2 className="font-['Barlow'] font-medium text-[48px] leading-[48px] tracking-[-0.96px] mb-6">
            Ready to Start Your Chapter?
          </h2>
          <p className="font-['Poppins'] text-white/90 text-lg leading-8 mb-12 max-w-3xl mx-auto">
            Join the global network of OWASP chapter leaders and make a difference in your local security community. 
            We provide ongoing support and resources to ensure your success.
          </p>
          <div className="flex gap-4 justify-center">
            <Button text="Download Complete Kit" variant="light-blue" size="56" />
            <Button text="Submit Application" variant="ghost-white" size="56" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 