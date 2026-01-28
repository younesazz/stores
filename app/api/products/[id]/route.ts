import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/slug"

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const id = ctx.params.id
  const body = await req.json().catch(() => null)
  if (!body) return bad("Invalid JSON")

  const existing = await prisma.product.findFirst({
    where: { id, store: { tenantId: session.user.tenantId } },
    select: { id: true, storeId: true },
  })
  if (!existing) return bad("Not found", 404)

  const data: any = {}

  if (body.name != null) data.name = String(body.name).trim()
  if (body.slug != null) data.slug = slugify(String(body.slug))
  if (body.description !== undefined) data.description = body.description ? String(body.description) : null
  if (body.price != null) data.price = Number(body.price)
  if (body.comparePrice !== undefined) data.comparePrice = body.comparePrice != null ? Number(body.comparePrice) : null
  if (body.costPrice !== undefined) data.costPrice = body.costPrice != null ? Number(body.costPrice) : null
  if (body.sku !== undefined) data.sku = body.sku ? String(body.sku) : null
  if (body.barcode !== undefined) data.barcode = body.barcode ? String(body.barcode) : null
  if (body.trackInventory !== undefined) data.trackInventory = Boolean(body.trackInventory)
  if (body.quantity !== undefined) data.quantity = Number(body.quantity)
  if (body.lowStockAlert !== undefined) data.lowStockAlert = body.lowStockAlert != null ? Number(body.lowStockAlert) : null
  if (body.images !== undefined) data.images = Array.isArray(body.images) ? body.images.filter(Boolean).map(String) : []
  if (body.featuredImage !== undefined) data.featuredImage = body.featuredImage ? String(body.featuredImage) : null
  if (body.status !== undefined) data.status = body.status
  if (body.isFeatured !== undefined) data.isFeatured = Boolean(body.isFeatured)
  if (body.metaTitle !== undefined) data.metaTitle = body.metaTitle ? String(body.metaTitle) : null
  if (body.metaDescription !== undefined) data.metaDescription = body.metaDescription ? String(body.metaDescription) : null
  if (body.categoryId !== undefined) data.categoryId = body.categoryId ? String(body.categoryId) : null

  try {
    const updated = await prisma.product.update({
      where: { id },
      data,
    })
    return NextResponse.json({ data: updated })
  } catch (e: any) {
    if (String(e?.code) === "P2002") return bad("Slug already exists in this store", 409)
    return bad("Failed to update product", 500)
  }
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const id = ctx.params.id

  const existing = await prisma.product.findFirst({
    where: { id, store: { tenantId: session.user.tenantId } },
    select: { id: true },
  })
  if (!existing) return bad("Not found", 404)

  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
