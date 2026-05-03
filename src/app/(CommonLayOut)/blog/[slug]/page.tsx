import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getBlogPost, getRelatedPosts } from "@/lib/blog-data";

// Simple markdown-to-JSX renderer for headings, paragraphs, lists, tables, bold, hr
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseLine = (text: string): React.ReactNode => {
    // Bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={idx}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-2xl font-bold tracking-tight">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-6 mb-3 text-lg font-semibold">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // HR
    if (line.trim() === "---") {
      elements.push(<Separator key={i} className="my-8" />);
      i++;
      continue;
    }

    // Table (starts with |)
    if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((l) => !l.match(/^\|[-| :]+\|$/));
      elements.push(
        <div key={i} className="my-6 overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").slice(1, -1).map((c) => c.trim());
                return (
                  <tr key={ri} className={ri === 0 ? "bg-muted font-semibold" : "border-t"}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5">
                        {parseLine(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2 pl-5 list-disc text-muted-foreground">
          {items.map((item, ii) => (
            <li key={ii} className="text-sm leading-relaxed">
              {parseLine(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="my-4 space-y-2 pl-5 list-decimal text-muted-foreground">
          {items.map((item, ii) => (
            <li key={ii} className="text-sm leading-relaxed">
              {parseLine(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="my-4 text-sm leading-7 text-muted-foreground">
        {parseLine(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category);

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-20">
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="container relative mx-auto max-w-3xl px-4">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to Blog
          </Link>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline">{post.category}</Badge>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                <Tag className="size-2.5" /> {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {post.title}
          </h1>

          {/* Author + meta */}
          <div className="flex items-center gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {post.authorInitials}
            </div>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.authorRole}</p>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-3.5" />
              {post.date} · {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ──────────────────────────────────────────────────── */}
      <section className="container mx-auto max-w-3xl px-4 py-12">

        {/* Cover image placeholder */}
        <div className="mb-10 flex h-56 w-full items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 to-primary/5 md:h-72">
          <BookOpen className="size-16 text-primary/20" strokeWidth={1} />
        </div>

        {/* Excerpt */}
        <p className="mb-8 rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 text-base font-medium leading-relaxed text-foreground">
          {post.excerpt}
        </p>

        {/* Article content */}
        <article className="prose-sm max-w-none">
          {renderContent(post.content)}
        </article>

        <Separator className="my-12" />

        {/* CTA */}
        <div className="rounded-2xl border bg-primary/5 p-6 text-center">
          <p className="mb-3 font-semibold">
            Ready to order your medicines?
          </p>
          <p className="mb-5 text-sm text-muted-foreground">
            Browse MediStore&apos;s full catalogue of genuine OTC medicines — delivered to your door.
          </p>
          <Button asChild>
            <Link href="/medicines">Shop Medicines <ArrowRight className="ml-2 size-4" /></Link>
          </Button>
        </div>
      </section>

      {/* ── Related Posts ─────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t bg-muted/30 py-14">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                    <BookOpen className="size-8 text-primary/25" strokeWidth={1} />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <Badge variant="outline" className="w-fit text-xs">{rp.category}</Badge>
                    <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-primary">
                      {rp.title}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                      <span>{rp.author}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {rp.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
