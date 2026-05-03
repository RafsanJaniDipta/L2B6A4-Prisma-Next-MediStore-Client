"use client"

import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import { Loader2, LogOut, User } from "lucide-react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { data: session, isPending } = authClient.useSession()
    const role = ((session?.user as any)?.role as string | undefined)?.toUpperCase()
    const router = useRouter()

    const userName = session?.user?.name ?? "User"
    const userEmail = session?.user?.email ?? ""
    const userImage = session?.user?.image ?? ""
    const initials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)

    const handleLogout = async () => {
        await authClient.signOut()
        router.push("/login")
    }

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar admin={{ role: role ?? "" }} seller={{ role: role ?? "" }} customer={{ role: role ?? "" }} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-vertical:h-4 data-vertical:self-auto"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="capitalize">
                                    {role?.toLowerCase() ?? "Dashboard"}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="ml-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted focus:outline-none">
                                    <Avatar className="size-8">
                                        <AvatarImage src={userImage} alt={userName} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden font-medium sm:block">{userName}</span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52">
                                <DropdownMenuLabel className="font-normal">
                                    <p className="font-medium">{userName}</p>
                                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                                    <User className="mr-2 size-4" />
                                    My Profile
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 size-4" />
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
