import Link from "next/link";
import { Pill, Mail, Phone, MapPin } from "lucide-react";

const cols = [
  {
    heading: "Shop",
    links: [
      { title: "Medicines",   url: "/medicines"   },
      { title: "Categories",  url: "/categories"  },
      { title: "Brands",      url: "/medicines"   },
      { title: "Bulk Orders", url: "/contact"     },
      { title: "Gift Cards",  url: "/medicines"   },
    ],
  },
  {
    heading: "Account",
    links: [
      { title: "Sign In",       url: "/login"           },
      { title: "Create Account",url: "/register"        },
      { title: "My Orders",     url: "/orders"          },
      { title: "Cart",          url: "/cart"            },
    ],
  },
  {
    heading: "Company",
    links: [
      { title: "About",         url: "/about"    },
      { title: "Blog",          url: "/blog"     },
      { title: "Careers",       url: "/about"    },
      { title: "Press",         url: "/about"    },
    ],
  },
  {
    heading: "Support",
    links: [
      { title: "Help Center",   url: "/contact"  },
      { title: "Contact",       url: "/contact"  },
      { title: "Returns",       url: "/contact"  },
      { title: "Privacy",       url: "/privacy"  },
      { title: "Terms",         url: "/terms"    },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 pt-14 pb-6">

        {/* ── 5-col top grid ───────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand — spans 1 col on lg (wider) */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Pill className="size-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">MediStore</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your neighborhood pharmacy, online. Genuine medicines delivered fast, with pharmacists you can actually talk to.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>support@medistore.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} MediStore. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms"   className="hover:text-primary">Terms</Link>
            <Link href="/contact" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
