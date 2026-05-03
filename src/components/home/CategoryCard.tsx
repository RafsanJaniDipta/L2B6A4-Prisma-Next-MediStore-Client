"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoryService } from "@/services/category.service"
import { getCategoryIcon } from "@/lib/category-icon"
import type { Category } from "@/types/category"

/**
 * CategoryCard
 * ─────────────
 * Each card gets class .cat-card — picked up by GsapMotionInit for
 * individual scroll-triggered fade-up (stagger based on index % 6).
 */
export function CategoryCard() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    categoryService.getAll()
      .then((data) => setCategories(data.slice(0, 6)))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.slug)
          return (
            /* .cat-card — GSAP scroll-reveal target */
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="cat-card group relative flex flex-col items-start gap-2 rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Icon className="size-6 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {category.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {category._count.medicines} medicines
              </p>

              {/* Hover arrow — slides in from right */}
              <div className="absolute right-4 top-4 translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight className="size-4 text-primary" />
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/categories">
            View All Categories
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
