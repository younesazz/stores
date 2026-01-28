import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSubdomain(host: string): string | null {
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000'
  
  // Enlever le port si présent
  const cleanHost = host.split(':')[0]
  const cleanMainDomain = mainDomain.split(':')[0]
  
  // Si on est sur le domaine principal, pas de subdomain
  if (cleanHost === cleanMainDomain || cleanHost === 'localhost') {
    return null
  }
  
  // Extraire le subdomain
  const parts = cleanHost.split('.')
  const mainParts = cleanMainDomain.split('.')
  
  if (parts.length > mainParts.length) {
    return parts[0]
  }
  
  return null
}

export function formatPrice(price: number, currency: string = 'DZD'): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp}-${random}`
}