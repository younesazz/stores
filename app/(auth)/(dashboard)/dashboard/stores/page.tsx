import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import StoresClient from "@/components/stores/StoresClient"

export const dynamic = "force-dynamic"

export default async function StoresPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.tenantId) return <div className="p-6">Unauthorized</div>

  return <StoresClient />
}
