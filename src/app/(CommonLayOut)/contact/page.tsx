"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Clock, Send, Loader2,
  CheckCircle2, Sparkles, MessageSquare, HeadphonesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@medistore.com",
    sub: "We reply within 24 hours",
    href: "mailto:support@medistore.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+880 1234-567890",
    sub: "Mon–Sat, 9 AM – 8 PM",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Dhaka, Bangladesh",
    sub: "Mirpur DOHS, Road 12",
    href: "#map",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon – Sat",
    sub: "9:00 AM – 8:00 PM (BST)",
    href: null,
  },
];

const subjects = [
  "Order Issue",
  "Medicine Inquiry",
  "Seller Registration",
  "Return & Refund",
  "Technical Support",
  "Other",
];

const socials = [
  { src: "https://img.icons8.com/color/48/facebook-new.png",      label: "Facebook",  href: "https://facebook.com" },
  { src: "https://img.icons8.com/color/48/twitterx--v1.png",      label: "Twitter",   href: "https://twitter.com" },
  { src: "https://img.icons8.com/color/48/instagram-new--v1.png", label: "Instagram", href: "https://instagram.com" },
  { src: "https://img.icons8.com/color/48/linkedin.png",          label: "LinkedIn",  href: "https://linkedin.com" },
];

// ── Form state types ───────────────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<FormData>;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.subject) newErrors.subject = "Please select a subject.";
    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-24">
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Sparkles className="size-4 text-primary" />
            We&apos;re here to help
          </div>
          <h1 className="mx-auto mb-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Get in <span className="text-primary">Touch</span> with Us
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Have a question, concern, or just want to say hello? Our support team
            is ready to help you — every day of the week.
          </p>
        </div>
      </section>

      {/* ── Contact Info Cards ────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map(({ icon: Icon, title, detail, sub, href }) => {
            const Wrapper = href ? "a" : "div";
            return (
              <Wrapper
                key={title}
                {...(href ? { href, target: href.startsWith("http") ? "_blank" : undefined } : {})}
                className="group flex flex-col gap-3 rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {title}
                  </p>
                  <p className="mt-1 font-semibold">{detail}</p>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border bg-card p-8">
              <div className="mb-6">
                <Badge variant="outline" className="mb-3 gap-1.5 border-primary/30 text-primary">
                  <MessageSquare className="size-3.5" />
                  Send a Message
                </Badge>
                <h2 className="text-2xl font-bold">How can we help you?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Message Sent!</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out, <strong>{form.name}</strong>. We&apos;ve received your message
                    and will reply to <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name + Email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input
                        id="contact-name"
                        placeholder="Rafsan Ahmed"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={cn(errors.email && "border-destructive focus-visible:ring-destructive")}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={cn(
                        "h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        errors.subject && "border-destructive focus:ring-destructive"
                      )}
                    >
                      <option value="">Select a subject…</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="text-xs text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">
                      Message
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({form.message.length}/500)
                      </span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Describe your issue or question in detail…"
                      rows={5}
                      maxLength={500}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className={cn(
                        "resize-none",
                        errors.message && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">

            {/* Support hours */}
            <div className="rounded-2xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                  <HeadphonesIcon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold">Support Hours</h3>
              </div>
              <ul className="space-y-2.5 text-sm">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
                  { day: "Saturday",        time: "10:00 AM – 6:00 PM" },
                  { day: "Sunday",          time: "Closed" },
                ].map(({ day, time }) => (
                  <li key={day} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{day}</span>
                    <span className={cn("font-medium", time === "Closed" && "text-destructive")}>
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2.5">
                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs text-muted-foreground">
                  Our team is currently <strong className="text-foreground">online</strong>
                </p>
              </div>
            </div>

            {/* Follow us */}
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ src, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5 text-sm font-medium transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={label} className="size-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="mb-4 font-semibold">Quick Help</h3>
              <ul className="space-y-2">
                {[
                  { label: "Browse Medicines", href: "/medicines" },
                  { label: "Track My Order", href: "/orders" },
                  { label: "My Account", href: "/profile" },
                  { label: "About MediStore", href: "/about" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      → {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ───────────────────────────────────────────────── */}
      <section id="map" className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Find Us</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Mirpur DOHS, Road 12, Dhaka, Bangladesh
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58402.96905764786!2d90.33703225!3d23.8223043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0fb77e3339d%3A0x99fe4b627ef61b4!2sMirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MediStore Location"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
