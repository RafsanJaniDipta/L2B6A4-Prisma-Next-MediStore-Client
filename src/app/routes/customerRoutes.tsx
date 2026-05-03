import {
  LayoutDashboard, ShoppingBag, Heart, ShoppingCart,
  User, Settings, Pill, MessageCircle,
} from "lucide-react"
import type { RouteGroup } from "@/app/types"

const customerRoutes: RouteGroup[] = [
  {
    title: "My Account",
    url: "/dashboard",
    items: [
      { title: "Dashboard",       url: "/dashboard",  icon: LayoutDashboard },
      { title: "My Orders",       url: "/orders",     icon: ShoppingBag },
      { title: "Browse Medicines", url: "/medicines", icon: Pill },
      { title: "My Cart",         url: "/cart",       icon: ShoppingCart },
      { title: "Wishlist",        url: "/medicines",  icon: Heart },
    ],
  },
  {
    title: "Settings",
    url: "/profile",
    items: [
      { title: "My Profile", url: "/profile",  icon: User },
      { title: "Settings",   url: "/profile",  icon: Settings },
      { title: "Support",    url: "/contact",  icon: MessageCircle },
    ],
  },
]

export default customerRoutes
