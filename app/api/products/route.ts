import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/slug"

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const { searchParams } = new URL(req.url)
  const storeId = searchParams.get("storeId") || undefined

  const products = await prisma.product.findMany({
    where: {
      store: { tenantId: session.user.tenantId },
      ...(storeId ? { storeId } : {}),
    },
    include: { store: true, category: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  })

  return NextResponse.json({ data: products })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const body = await req.json().catch(() => null)
  if (!body) return bad("Invalid JSON")

  const {
    storeId,
    categoryId,
    name,
    slug,
    description,
    price,
    comparePrice,
    costPrice,
    sku,
    barcode,
    trackInventory,
    quantity,
    lowStockAlert,
    images,
    featuredImage,
    status,
    isFeatured,
    metaTitle,
    metaDescription,
  } = body

  if (!storeId) return bad("storeId required")
  if (!name || String(name).trim().length < 2) return bad("name required")
  if (price === undefined || price === null || Number.isNaN(Number(price))) return bad("price required")

  // ✅ ensure store belongs to tenant
  const store = await prisma.store.findFirst({
    where: { id: String(storeId), tenantId: session.user.tenantId },
    select: { id: true },
  })
  if (!store) return bad("Store not found", 404)

  const finalSlug = slugify(String(slug || name))
  if (!finalSlug) return bad("Invalid slug")

  const imgs: string[] = Array.isArray(images) ? images.filter(Boolean).map(String) : []

  try {
    const created = await prisma.product.create({
      data: {
        storeId: String(storeId),
        categoryId: categoryId ? String(categoryId) : null,
        name: String(name).trim(),
        slug: finalSlug,
        description: description ? String(description) : null,
        price: Number(price),
        comparePrice: comparePrice != null ? Number(comparePrice) : null,
        costPrice: costPrice != null ? Number(costPrice) : null,
        sku: sku ? String(sku) : null,
        barcode: barcode ? String(barcode) : null,
        trackInventory: trackInventory === false ? false : true,
        quantity: quantity != null ? Number(quantity) : 0,
        lowStockAlert: lowStockAlert != null ? Number(lowStockAlert) : null,
        images: imgs,
        featuredImage: featuredImage ? String(featuredImage) : null,
        status: status || "DRAFT",
        isFeatured: Boolean(isFeatured),
        metaTitle: metaTitle ? String(metaTitle) : null,
        metaDescription: metaDescription ? String(metaDescription) : null,
      },
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (e: any) {
    // unique [storeId, slug]
    if (String(e?.code) === "P2002") return bad("Slug already exists in this store", 409)
    return bad("Failed to create product", 500)
  }
}
