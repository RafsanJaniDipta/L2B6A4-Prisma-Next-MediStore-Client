"use client"

import { useEffect, useRef } from "react"
import { Loader2, Pill } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { ROLE } from "@/constants/role"

/**
 * Landing page after every login.
 * We arrived here via window.location.href (hard reload) so the browser
 * already sent the fresh session cookie on this page request.
 * useSession() reads the cookie from the server and redirects by role.
 */
export default function AuthRedirectPage() {
  const { data: session, isPending } = authClient.useSession()
  const redirected = useRef(false)

  useEffect(() => {
    if (isPending || redirected.current) return
    redirected.current = true

    if (!session?.user) {
      window.location.replace("/login")
      return
    }

    const role   = (session.user as any).role?.toUpperCase()
    const status = (session.user as any).status?.toUpperCase()

    if (status === "PENDING" || status === "BANNED" || status === "SUSPENDED") {
      authClient.signOut().then(() => window.location.replace("/login"))
      return
    }

    if (role === ROLE.admin)       window.location.replace("/admin-dashboard")
    else if (role === ROLE.seller) window.location.replace("/seller-dashboard")
    else                           window.location.replace("/home")
  }, [session, isPending])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Pill className="size-10 animate-pulse text-primary" />
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  )
}
