import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function SecureMyAppPage() {
  const securityTools = [
    {
      title: "OWASP ZAP",
      description: "Free security scanner for finding vulnerabilities in web applications",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      category: "Scanning",
      difficulty: "Beginner"
    },
    {
      title: "OWASP Top 10",
      description: "Essential checklist of the most critical web application security risks",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      category: "Guidelines",
      difficulty: "Beginner"
    },
    {
      title: "OWASP ASVS",
      description: "Application Security Verification Standard for comprehensive testing",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      category: "Standards",
      difficulty: "Intermediate"
    },
    {
      title: "Dependency-Check",
      description: "Identify project dependencies with known vulnerabilities",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      category: "Scanning",
      difficulty: "Beginner"
    }
  ];

  const securitySteps = [
    {
      step: "1",
      title: "Assess Current State",
      description: "Use OWASP Top 10 to understand common vulnerabilities and assess your application's current security posture."
    },
    {
      step: "2", 
      title: "Scan for Vulnerabilities",
      description: "Run automated scans with OWASP ZAP to identify security issues in your web application."
    },
    {
      step: "3",
      title: "Review Dependencies",
      description: "Check your project dependencies for known vulnerabilities using dependency scanning tools."
    },
    {
      step: "4",
      title: "Implement Fixes",
      description: "Address identified vulnerabilities following OWASP guidelines and best practices."
    },
    {
      step: "5",
      title: "Continuous Monitoring",
      description: "Integrate security testing into your CI/CD pipeline for ongoing protection."
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
              Secure My App
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Get started with application security using OWASP's free tools and resources. 
              Whether you're a developer or security professional, we'll help you build more secure applications.
            </p>
            <div className="flex gap-4">
              <Button text="Start Security Assessment" variant="light-blue" size="56" />
              <Button text="View All Tools" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="text-center mb-16">
          <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
            5 Steps to Secure Your Application
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
            Follow this proven process to improve your application's security posture using OWASP resources.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {securitySteps.map((item, index) => (
            <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#003594] text-white rounded-full flex items-center justify-center text-xl font-bold shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] mb-3">
                  {item.title}
                </h3>
                <p className="font-['Poppins'] text-[#757575] text-base leading-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tools */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-[120px] py-20">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow'] font-medium text-[48px] text-[#101820] leading-[48px] tracking-[-0.96px] mb-6">
              Essential Security Tools
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-lg leading-8 max-w-3xl mx-auto">
              Start with these proven OWASP tools to assess and improve your application security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityTools.map((tool, index) => {
              // Define difficulty-specific colors and styles
              const difficultyStyles = {
                'Beginner': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
                'Intermediate': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
                'Advanced': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
              };
              
              // Define category-specific colors
              const categoryStyles = {
                'Scanning': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
                'Guidelines': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
                'Standards': { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' }
              };
              
              const difficultyStyle = difficultyStyles[tool.difficulty as keyof typeof difficultyStyles] || difficultyStyles['Beginner'];
              const categoryStyle = categoryStyles[tool.category as keyof typeof categoryStyles] || categoryStyles['Scanning'];
              
              return (
                <div 
                  key={index} 
                  className="group bg-white border border-gray-200 hover:border-[#003594] rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Header with badges */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border} border`}>
                        {tool.difficulty}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border`}>
                        {tool.category}
                      </span>
                    </div>
                                         <div className="w-12 h-12 bg-gradient-to-br from-[#003594] to-[#0056d6] group-hover:from-[#0056d6] group-hover:to-[#00a7e1] rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 shadow-md">
                       {tool.icon}
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] group-hover:text-[#003594] transition-colors duration-300 mb-3 leading-tight">
                      {tool.title}
                    </h3>
                    <p className="font-['Poppins'] text-[#757575] text-sm leading-6 mb-4">
                      {tool.description}
                    </p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#101820] font-['Poppins'] font-medium text-sm py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <span>Learn More</span>
                        <svg 
                          className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="flex-1 bg-[#003594] hover:bg-[#0056d6] text-white font-['Poppins'] font-medium text-sm py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <span>Get Started</span>
                        <svg 
                          className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Additional Security Resources */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-['Barlow'] font-medium text-[24px] text-[#101820] mb-3">
                Need More Advanced Tools?
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-sm leading-6 mb-6">
                Explore our complete catalog of security tools and resources designed for every level of expertise and application type.
              </p>
              <div className="flex gap-4 justify-center">
                <Button text="Browse All Tools" variant="primary" size="48" />
                <Button text="Custom Assessment" variant="ghost-dark" size="48" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Form */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-20">
        <div className="bg-gradient-to-r from-[#003594] to-[#0056d6] rounded-2xl p-16 text-center text-white">
          <h2 className="font-['Barlow'] font-medium text-[48px] leading-[48px] tracking-[-0.96px] mb-6">
            Free Security Assessment
          </h2>
          <p className="font-['Poppins'] text-white/90 text-lg leading-8 mb-12 max-w-3xl mx-auto">
            Get a personalized security assessment for your application. Our experts will review your setup 
            and provide actionable recommendations.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Your Name"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input 
                type="text" 
                placeholder="Company (Optional)"
                className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]"
              />
              <select className="px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b]">
                <option value="">Application Type</option>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="api">API/Microservices</option>
                <option value="other">Other</option>
              </select>
            </div>
            <textarea 
              placeholder="Tell us about your application and security concerns..."
              rows={4}
              className="w-full px-4 py-3 rounded-sm text-[#101820] focus:outline-none focus:ring-2 focus:ring-[#ffb81b] mb-8"
            />
            <Button text="Request Free Assessment" variant="light-blue" size="56" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 