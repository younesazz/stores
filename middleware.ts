import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl
  
  // Obtenir le token d'authentification
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Extraire le subdomain
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000'
  const cleanHost = host.split(':')[0]
  const cleanMainDomain = mainDomain.split(':')[0]
  
  let subdomain: string | null = null
  
  if (cleanHost !== cleanMainDomain && cleanHost !== 'localhost') {
    const parts = cleanHost.split('.')
    const mainParts = cleanMainDomain.split('.')
    if (parts.length > mainParts.length) {
      subdomain = parts[0]
    }
  }

  // ==========================================
  // ROUTES PUBLIQUES (pas besoin d'auth)
  // ==========================================
  const publicRoutes = ['/login', '/signup', '/api/auth', '/api/register']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // ==========================================
  // LANDING PAGE (domaine principal sans subdomain)
  // ==========================================
  if (!subdomain && pathname === '/') {
    return NextResponse.next()
  }

  // ==========================================
  // STORE FRONTEND (subdomain présent)
  // ==========================================
  if (subdomain && !pathname.startsWith('/dashboard') && !pathname.startsWith('/admin')) {
    // Rediriger vers la page store
    return NextResponse.rewrite(new URL(`/store/${subdomain}${pathname}`, request.url))
  }

  // ==========================================
  // PROTECTION DES ROUTES DASHBOARD
  // ==========================================
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    // Vérifier si l'utilisateur est authentifié
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // SUPER ADMIN routes
    if (pathname.startsWith('/admin')) {
      if (token.role !== 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    // TENANT ADMIN/USER routes
    if (pathname.startsWith('/dashboard')) {
      if (token.role === 'CUSTOMER') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}