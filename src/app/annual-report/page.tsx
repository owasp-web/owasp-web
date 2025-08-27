import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function AnnualReportPage() {
  const highlights = [
    { metric: "275+", label: "Active Chapters", growth: "+12%" },
    { metric: "50k+", label: "Community Members", growth: "+18%" },
    { metric: "200+", label: "Active Projects", growth: "+8%" },
    { metric: "$2.1M", label: "Total Revenue", growth: "+15%" }
  ];

  const reports = [
    {
      year: "2024",
      title: "Building Secure Foundations",
      status: "Latest",
      description: "Our most impactful year yet, with significant growth in community engagement and project contributions."
    },
    {
      year: "2023",
      title: "Global Security Evolution",
      status: "Available",
      description: "A year of expansion into new markets and strengthening our core security initiatives."
    },
    {
      year: "2022",
      title: "Strengthening Digital Trust",
      status: "Available", 
      description: "Focus on supply chain security and advancing application security standards worldwide."
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
              Annual Reports
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Discover OWASP's impact on global application security through our comprehensive annual reports. 
              See how we're making software security visible and actionable worldwide.
            </p>
            <div className="flex gap-4">
              <Button text="Download 2024 Report" variant="light-blue" size="56" />
              <Button text="View All Reports" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
            2024 Impact Highlights
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
            Key metrics demonstrating OWASP's growing influence in the global security community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {highlights.map((item, index) => (
            <div key={index} className="text-center bg-white p-8 rounded-lg shadow-sm">
              <div className="font-['Barlow'] font-medium text-[48px] text-[#003594] leading-[48px] tracking-[-0.96px] mb-2">
                {item.metric}
              </div>
              <div className="font-['Poppins'] text-[#757575] text-base mb-2">
                {item.label}
              </div>
              <div className="font-['Poppins'] text-[#28a745] text-sm font-medium">
                {item.growth}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Report */}
        <div className="bg-gradient-to-r from-[#003594] to-[#0056d6] rounded-2xl overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-12 text-white">
              <div className="mb-4">
                <span className="px-4 py-2 bg-[#ffb81b] text-[#101820] rounded-full text-sm font-semibold">
                  Latest Report
                </span>
              </div>
              <h3 className="font-['Barlow'] font-medium text-[40px] leading-[44px] tracking-[-0.8px] mb-6">
                2024 Annual Report: Building Secure Foundations
              </h3>
              <p className="font-['Poppins'] text-white/90 text-lg leading-7 mb-8">
                Explore our comprehensive review of 2024's achievements, including new project launches, 
                community growth, and our continued impact on global application security.
              </p>
              <div className="flex gap-4">
                <Button text="Download Report" variant="light-blue" size="48" />
                <Button text="Executive Summary" variant="ghost-white" size="48" />
              </div>
            </div>
            <div className="w-full lg:w-1/3 relative h-80 lg:h-auto">
              <Image src="/images/events/event-1.png" alt="2024 Annual Report" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* All Reports */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[120px] py-20">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
              Previous Reports
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
              Access our complete archive of annual reports to track OWASP's evolution and impact.
            </p>
          </div>

          <div className="space-y-6 mb-16">
            {reports.map((report, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-8 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820]">
                      {report.year} Annual Report: {report.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      report.status === 'Latest' 
                        ? 'bg-[#28a745] text-white' 
                        : 'bg-[#003594] text-white'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="font-['Poppins'] text-[#757575] text-base">
                    {report.description}
                  </p>
                </div>
                <div className="flex gap-3 ml-8">
                  <Button text="View Report" variant="ghost-dark" size="40" />
                  <Button text="Download PDF" variant="primary" size="40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Transparency */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="bg-[#f8f9fa] rounded-lg p-12 text-center">
          <h3 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-6">
            Financial Transparency
          </h3>
          <p className="font-['Poppins'] text-[#757575] text-lg mb-8 max-w-3xl mx-auto">
            As a nonprofit organization, OWASP is committed to full financial transparency. 
            All our annual reports include detailed financial statements and impact metrics.
          </p>
          <div className="flex gap-4 justify-center">
            <Button text="Financial Statements" variant="ghost-dark" size="48" />
            <Button text="Support Our Mission" variant="primary" size="48" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 