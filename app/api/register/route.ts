import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  tenantName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  subdomain: z.string()
    .min(3, "Le sous-domaine doit contenir au moins 3 caractères")
    .max(20, "Le sous-domaine ne peut pas dépasser 20 caractères")
    .regex(/^[a-z0-9-]+$/, "Le sous-domaine ne peut contenir que des lettres minuscules, chiffres et tirets"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validation
    const validatedData = registerSchema.parse(body)
    
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      )
    }
    
    // Vérifier si le subdomain existe déjà
    const existingTenant = await prisma.tenant.findUnique({
      where: { subdomain: validatedData.subdomain }
    })
    
    if (existingTenant) {
      return NextResponse.json(
        { error: "Ce sous-domaine est déjà utilisé" },
        { status: 400 }
      )
    }
    
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    // Créer le tenant et l'utilisateur dans une transaction
    const result = await prisma.$transaction(async (tx: { tenant: { create: (arg0: { data: { name: string; subdomain: string; email: string; phone: string; status: string; trialEndsAt: Date } }) => any }; user: { create: (arg0: { data: { firstName: string; lastName: string; email: string; phone: string; password: string; role: string; tenantId: any } }) => any }; store: { create: (arg0: { data: { name: string; subdomain: string; tenantId: any; description: string } }) => any } }) => {
      // Créer le tenant
      const tenant = await tx.tenant.create({
        data: {
          name: validatedData.tenantName,
          subdomain: validatedData.subdomain,
          email: validatedData.email,
          phone: validatedData.phone,
          status: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 jours
        }
      })
      
      // Créer l'utilisateur
      const user = await tx.user.create({
        data: {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          password: hashedPassword,
          role: 'TENANT_ADMIN',
          tenantId: tenant.id,
        }
      })
      
      // Créer un store par défaut
      const store = await tx.store.create({
        data: {
          name: `${validatedData.tenantName} Store`,
          subdomain: validatedData.subdomain,
          tenantId: tenant.id,
          description: "Bienvenue dans votre boutique en ligne",
        }
      })
      
      return { tenant, user, store }
    })
    
    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès",
      data: {
        userId: result.user.id,
        tenantId: result.tenant.id,
        subdomain: result.tenant.subdomain,
      }
    })
    
  } catch (error) {
    console.error("Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message }, // CORRECTION ICI: .issues au lieu de .errors
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du compte" },
      { status: 500 }
    )
  }
}