'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { adminService } from '@/lib/admin'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const authenticated = await adminService.checkAuth()
      setIsAuthenticated(authenticated)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await adminService.signIn(email, password)
      setIsAuthenticated(true)
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await adminService.signOut()
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F6FE]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Login Section */}
        <div className="bg-[#F1F6FE]">
          <div className="max-w-[1440px] mx-auto px-[120px] pt-20 pb-[164px]">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="max-w-md w-full">
                <div className="text-center mb-12">
                  <h1 className="font-['Barlow'] font-medium text-[#101820] text-[48px] leading-[48px] tracking-[-0.96px] mb-4">
                    Admin Sign In
                  </h1>
                  <p className="font-['Poppins'] text-[#757575] text-[16px] leading-[24px] tracking-[-0.32px]">
                    Access the OWASP admin dashboard to manage events and content.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#101820] mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent font-['Poppins'] text-[#101820]"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-[#101820] mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent font-['Poppins'] text-[#101820]"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <Button 
                        text={loading ? "Signing in..." : "Sign In"} 
                        variant="primary" 
                        size="56" 
                        disabled={loading}
                        onClick={() => {}}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Admin Dashboard */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-[164px]">
          <div className="flex flex-col gap-12 lg:gap-16 items-center justify-center w-full">
            <div className="flex flex-col gap-6 lg:gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="font-['Poppins'] font-semibold text-[#00A7E1] text-sm sm:text-base leading-6 tracking-[-0.32px]">
                  Admin Dashboard
                </div>
                <h1 className="font-['Barlow'] font-medium text-[#101820] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight xl:leading-[64px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] max-w-[1200px]">
                  Content Management
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start justify-start w-full">
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    Manage OWASP website content including events, projects, and chapters. 
                    Use the tools below to keep the community informed and engaged.
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    All changes are logged and can be reviewed. Make sure to follow 
                    content guidelines when updating public-facing information.
                  </p>
                </div>
              </div>
            </div>

            {/* Management Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="bg-[#003594] p-2 sm:p-3 rounded-lg">
                      <Image src="/images/icons/megaphone.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                        Events
                      </h3>
                      <p className="font-['Poppins'] text-[#757575] text-sm leading-[18px] sm:leading-[20px]">
                        Manage global and regional events
                      </p>
                    </div>
                  </div>
                  <Button 
                    text="Manage Events" 
                    variant="primary" 
                    size="40"
                    onClick={() => router.push('/admin/events')}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="bg-[#003594] p-2 sm:p-3 rounded-lg">
                      <Image src="/images/icons/briefcase-figma.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                        Projects
                      </h3>
                      <p className="font-['Poppins'] text-[#757575] text-sm leading-[18px] sm:leading-[20px]">
                        Manage OWASP projects database
                      </p>
                    </div>
                  </div>
                  <Button 
                    text="Manage Projects" 
                    variant="primary" 
                    size="40"
                    onClick={() => router.push('/admin/projects')}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="bg-[#003594] p-2 sm:p-3 rounded-lg">
                      <Image src="/images/icons/globe.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                        Chapters
                      </h3>
                      <p className="font-['Poppins'] text-[#757575] text-sm leading-[18px] sm:leading-[20px]">
                        Manage OWASP chapters worldwide
                      </p>
                    </div>
                  </div>
                  <Button 
                    text="Manage Chapters" 
                    variant="primary" 
                    size="40"
                    onClick={() => router.push('/admin/chapters')}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 w-full max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                <div>
                  <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[28px] tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] mb-2">
                    Quick Actions
                  </h3>
                  <p className="font-['Poppins'] text-[#757575] text-sm leading-[18px] sm:leading-[20px]">
                    Currently signed in as admin
                  </p>
                </div>
                <Button 
                  text="Sign Out" 
                  variant="ghost-dark" 
                  size="40"
                  onClick={handleSignOut}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 