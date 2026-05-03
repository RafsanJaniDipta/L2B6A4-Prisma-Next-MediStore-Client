import {
  LayoutDashboard, Users, Pill, ShoppingBag,
  BarChart3, User, Settings, MessageCircle,
  ClipboardCheck, Tag, Star,
} from "lucide-react"
import type { RouteGroup } from "@/app/types"

const adminRoutes: RouteGroup[] = [
  {
    title: "Overview",
    url: "/admin-dashboard",
    items: [
      { title: "Dashboard",  url: "/admin-dashboard",               icon: LayoutDashboard },
      { title: "Analytics",  url: "/admin-dashboard?tab=analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Management",
    url: "/admin-dashboard",
    items: [
      { title: "Approvals",        url: "/admin-dashboard?tab=approvals", icon: ClipboardCheck },
      { title: "Manage Users",     url: "/admin-dashboard?tab=users",     icon: Users },
      { title: "Manage Medicines", url: "/admin-dashboard?tab=medicines", icon: Pill },
      { title: "Manage Orders",    url: "/admin-dashboard?tab=orders",    icon: ShoppingBag },
      { title: "Categories",       url: "/admin-dashboard?tab=categories",icon: Tag },
    ],
  },
  {
    title: "Account",
    url: "/profile",
    items: [
      { title: "My Profile", url: "/profile",  icon: User },
      { title: "Settings",   url: "/profile",  icon: Settings },
      { title: "Support",    url: "/contact",  icon: MessageCircle },
    ],
  },
]

export default adminRoutes
