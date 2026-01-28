import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status })
}

export async function DELETE(_req: Request, ctx: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return bad("Unauthorized", 401)

  const id = ctx.params.id

  const store = await prisma.store.findFirst({
    where: { id, tenantId: session.user.tenantId },
    select: { id: true },
  })
  if (!store) return bad("Not found", 404)

  await prisma.store.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
