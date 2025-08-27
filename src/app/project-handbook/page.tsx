import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function ProjectHandbookPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        "Project idea validation",
        "Community assessment",
        "Initial proposal creation",
        "Resource planning"
      ]
    },
    {
      title: "Project Lifecycle",
      items: [
        "Incubator stage requirements",
        "Lab project guidelines",
        "Flagship project criteria",
        "Project graduation process"
      ]
    },
    {
      title: "Community Building",
      items: [
        "Recruiting contributors",
        "Managing project teams",
        "Documentation standards",
        "Communication channels"
      ]
    },
    {
      title: "Resources & Support",
      items: [
        "OWASP infrastructure",
        "Funding opportunities",
        "Marketing support",
        "Legal considerations"
      ]
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
              OWASP Project Handbook
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Your comprehensive guide to starting, managing, and growing successful OWASP projects. 
              Learn from best practices and established processes used by our most successful projects.
            </p>
            <div className="flex gap-4">
              <Button text="Download PDF" variant="light-blue" size="56" />
              <Button text="Start New Project" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
            Handbook Contents
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
            Everything you need to know about creating and managing OWASP projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] mb-6">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Image src="/images/icons/check.svg" alt="" width={16} height={16} className="mt-1 shrink-0" />
                    <span className="font-['Poppins'] text-[#757575] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg p-12 text-center">
          <h3 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-8">
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button text="Project Templates" variant="ghost-dark" size="48" />
            <Button text="Community Forum" variant="ghost-dark" size="48" />
            <Button text="Submit Project Idea" variant="primary" size="48" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 