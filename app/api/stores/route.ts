import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30)
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const stores = await prisma.store.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      subdomain: true,
      isActive: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ data: stores })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const body = await req.json().catch(() => null)
  if (!body) return bad("Invalid JSON")

  const name = String(body.name || "").trim()
  let subdomain = String(body.subdomain || "").trim()

  if (!name || name.length < 2) return bad("name required")
  if (!subdomain) subdomain = slugify(name)

  if (!/^[a-z0-9-]+$/.test(subdomain)) {
    return bad("subdomain invalid (a-z, 0-9, -)")
  }

  try {
    const store = await prisma.store.create({
      data: {
        tenantId: session.user.tenantId,
        name,
        subdomain,
        isActive: true,
      },
      select: { id: true, name: true, subdomain: true, isActive: true },
    })
    return NextResponse.json({ data: store }, { status: 201 })
  } catch (e: any) {
    // unique subdomain
    if (String(e?.code) === "P2002") return bad("subdomain already used", 409)
    return bad("failed to create store", 500)
  }
}
