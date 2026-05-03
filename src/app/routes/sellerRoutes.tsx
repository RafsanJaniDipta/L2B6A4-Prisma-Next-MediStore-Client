import {
  LayoutDashboard, ShoppingBag, Pill,
  BarChart3, User, Settings, MessageCircle, Package,
} from "lucide-react"
import type { RouteGroup } from "@/app/types"

const sellerRoutes: RouteGroup[] = [
  {
    title: "Overview",
    url: "/seller-dashboard",
    items: [
      { title: "Dashboard", url: "/seller-dashboard",              icon: LayoutDashboard },
      { title: "Analytics", url: "/seller-dashboard?tab=analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Store",
    url: "/seller-dashboard",
    items: [
      { title: "My Medicines", url: "/seller-dashboard?tab=medicines", icon: Pill },
      { title: "My Orders",    url: "/seller-dashboard?tab=orders",    icon: ShoppingBag },
      { title: "Inventory",    url: "/seller-dashboard?tab=medicines", icon: Package },
    ],
  },
  {
    title: "Account",
    url: "/profile",
    items: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings",   url: "/profile", icon: Settings },
      { title: "Support",    url: "/contact", icon: MessageCircle },
    ],
  },
]

export default sellerRoutes
