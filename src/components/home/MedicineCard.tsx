"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight, Star, ShoppingCart, Pill, FlaskConical,
  Droplets, Wind, Package, Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { medicineService } from "@/services/medicine.service"
import { authClient } from "@/lib/auth-client"
import type { Medicine } from "@/types/medicine"
import { cn } from "@/lib/utils"
import { useMedicineImage } from "@/hooks/useMedicineImage"

// ── Medicine form placeholder ─────────────────────────────
const formIconMap: Record<string, React.ElementType> = {
  Tablet: Pill, Capsule: Pill, Syrup: FlaskConical,
  Cream: Droplets, Drops: Droplets, Spray: Wind,
}
const formGradientMap: Record<string, string> = {
  Tablet:  "from-primary/15 to-primary/5",
  Capsule: "from-primary/15 to-blue-500/5",
  Syrup:   "from-orange-400/15 to-primary/5",
  Cream:   "from-pink-400/10 to-primary/5",
  Drops:   "from-cyan-400/10 to-primary/5",
  Spray:   "from-sky-400/10 to-primary/5",
}

function MedicinePlaceholder({ form, slug, name }: { form: string | null; slug: string; name: string }) {
  const wikiImage = useMedicineImage(name)
  const Icon      = form ? (formIconMap[form] ?? Package) : Package
  const gradient  = form ? (formGradientMap[form] ?? "from-primary/15 to-primary/5") : "from-muted to-muted/50"
  const imgSrc    = wikiImage ?? `https://picsum.photos/seed/${slug}/400/300`

  return (
    <div className="relative size-full">
      <img
        src={imgSrc}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement
          if (wikiImage && !el.src.includes("picsum")) {
            el.src = `https://picsum.photos/seed/${slug}/400/300`
          } else {
            el.style.display = "none"
            const fallback = el.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = "flex"
          }
        }}
      />
      <div className={`flex size-full items-center justify-center bg-gradient-to-br ${gradient}`} style={{ display: "none" }}>
        <Icon className="size-14 text-primary/35" strokeWidth={1.2} />
      </div>
    </div>
  )
}

// ── Single card ───────────────────────────────────────────
/**
 * Each card has class .prod — picked up by GsapMotionInit for
 * individual scroll-triggered fade-up.
 */
function MedicineCardItem({ medicine, isCustomer }: { medicine: Medicine; isCustomer: boolean }) {
  const [wished, setWished] = useState(false)

  const stock  = (medicine as any).stock ?? 0
  const isOut  = stock === 0
  const isLow  = !isOut && stock <= 20

  return (
    /* .prod — GSAP scroll-reveal target */
    <Link
      href={`/medicines/${medicine.slug}`}
      className={cn(
        "prod group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        isOut && "opacity-80"
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <MedicinePlaceholder form={medicine.form} slug={medicine.slug} name={medicine.name} />

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setWished((w) => !w) }}
          aria-label="Wishlist"
          className={cn(
            "absolute left-2.5 top-2.5 flex size-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors",
            wished
              ? "border-red-200 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950/50"
              : "border-border/60 bg-background/80 text-muted-foreground hover:text-foreground"
          )}
        >
          <Heart className={cn("size-3.5", wished && "fill-current")} />
        </button>

        {/* Badges */}
        <div className="absolute right-2.5 top-2.5 flex flex-col items-end gap-1.5">
          {medicine.prescriptionRequired && (
            <span className="rounded-full bg-foreground/90 px-2 py-0.5 text-[10px] font-semibold text-background">Rx</span>
          )}
          {isOut && (
            <span className="rounded-full border bg-background/90 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">Out of stock</span>
          )}
          {!isOut && (medicine as any).featured && (
            <Badge className="text-[10px]">Featured</Badge>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {/* Manufacturer + form pill */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {medicine.manufacturer}
          </p>
          {medicine.form && (
            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              {medicine.form}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">
          {medicine.name}
        </h3>

        {/* Description */}
        {medicine.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{medicine.description}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{medicine.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({medicine.reviewCount})</span>
        </div>

        {/* Low stock */}
        {isLow && (
          <p className="text-xs font-semibold text-destructive">Only {stock} left</p>
        )}

        {/* Price + add */}
        <div className="mt-auto flex items-center justify-between border-t pt-3">
          <span className="text-lg font-extrabold tracking-tight text-primary">
            <span className="text-sm font-semibold text-muted-foreground">৳</span>
            {parseFloat(medicine.price).toFixed(0)}
          </span>
          {isCustomer && !isOut && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <ShoppingCart className="size-3" />
              Add
            </span>
          )}
          {isOut && (
            <span className="text-xs font-medium text-muted-foreground">Unavailable</span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ── Grid ─────────────────────────────────────────────────
export function MedicineCard() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [loading, setLoading]     = useState(true)
  const { data: session }         = authClient.useSession()
  const role                      = (session?.user as any)?.role?.toUpperCase()
  const isCustomer                = !role || role === "CUSTOMER"

  useEffect(() => {
    medicineService.getFeatured().then(setMedicines).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden rounded-2xl border bg-card">
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24" /><Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-5/6" />
              <div className="flex items-center gap-1.5 pt-1">
                <Skeleton className="size-3.5 rounded-full" /><Skeleton className="h-3.5 w-8" />
              </div>
              <div className="mt-auto flex items-center justify-between border-t pt-3">
                <Skeleton className="h-6 w-16" /><Skeleton className="h-8 w-16 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {medicines.map((medicine) => (
          <MedicineCardItem key={medicine.id} medicine={medicine} isCustomer={isCustomer} />
        ))}
      </div>

      {medicines.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">No featured medicines found.</p>
      )}

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/medicines">View All Medicines <ArrowRight className="size-4" /></Link>
        </Button>
      </div>
    </div>
  )
}
