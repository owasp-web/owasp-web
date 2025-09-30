import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// The admin subdomain host, e.g. "management-console.example.com"
const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_HOST?.toLowerCase()

function isStaticOrSpecialPath(pathname: string): boolean {
	if (pathname.startsWith('/_next')) return true
	if (pathname.startsWith('/assets')) return true
	if (pathname === '/favicon.ico') return true
	if (pathname === '/robots.txt') return true
	if (pathname === '/sitemap.xml') return true
	return false
}

export function middleware(request: NextRequest) {
	const { pathname, search } = request.nextUrl
	const host = request.headers.get('host')?.toLowerCase() ?? ''

	// Never interfere with static assets or API routes
	if (isStaticOrSpecialPath(pathname) || pathname.startsWith('/api')) {
		return NextResponse.next()
	}


	// If we are on the admin host, add noindex headers and make "/" land on "/admin"
	if (ADMIN_HOST && host === ADMIN_HOST) {
		if (pathname === '/' || pathname === '') {
			const url = new URL('/admin', request.url)
			const res = NextResponse.rewrite(url)
			res.headers.set('X-Robots-Tag', 'noindex, nofollow')
			return res
		}
		const res = NextResponse.next()
		res.headers.set('X-Robots-Tag', 'noindex, nofollow')
		return res
	}

	// If we are on any other host and user tries to access /admin, redirect to the admin host
	if (ADMIN_HOST && pathname.startsWith('/admin')) {
		const destination = `https://${ADMIN_HOST}${pathname}${search ?? ''}`
		return NextResponse.redirect(destination, 308)
	}

	return NextResponse.next()
}

// Limit middleware from running on static assets and images
export const config = {
	matcher: [
		"/(?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map)$).*",
	],
}


