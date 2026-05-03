"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { blogPosts, BLOG_CATEGORIES } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-24">
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            Health Knowledge Hub
          </div>
          <h1 className="mx-auto mb-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            MediStore <span className="text-primary">Blog</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
            Expert-written articles on medicines, health tips, wellness, and
            everything you need to make informed health decisions.
          </p>

          {/* Search */}
          <div className="mx-auto flex max-w-md items-center gap-2 rounded-xl border bg-background px-4 py-2.5 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured post — only shown when no filter active */}
        {activeCategory === "All" && !search && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-10 flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl md:flex-row"
          >
            {/* Image placeholder */}
            <div className="flex min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 md:w-2/5">
              <BookOpen className="size-16 text-primary/30" strokeWidth={1} />
            </div>

            <div className="flex flex-1 flex-col justify-center gap-4 p-8">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                  Featured
                </Badge>
                <Badge variant="outline">{featured.category}</Badge>
              </div>
              <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                {featured.title}
              </h2>
              <p className="line-clamp-3 text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {featured.authorInitials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{featured.author}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {featured.date} · {featured.readTime}
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                  Read More <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Results count */}
        {(search || activeCategory !== "All") && (
          <p className="mb-6 text-sm text-muted-foreground">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
            {activeCategory !== "All" && ` in "${activeCategory}"`}
            {search && ` for "${search}"`}
          </p>
        )}

        {/* Blog grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(activeCategory === "All" && !search ? rest : filtered).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                {/* Image placeholder */}
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                  <BookOpen className="size-10 text-primary/25" strokeWidth={1} />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Badge variant="outline" className="w-fit text-xs">
                    {post.category}
                  </Badge>

                  <h3 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>

                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {post.authorInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{post.author}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {post.readTime}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <BookOpen className="size-12 text-muted-foreground/30" strokeWidth={1} />
            <p className="text-lg font-semibold">No articles found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
