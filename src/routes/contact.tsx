import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { packages } from "@/lib/packages";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book Your Adventure — Juma Adventures" },
      { name: "description", content: "Contact Juma Adventures to book your Kenya safari or customized tour. WhatsApp, email, or send a booking request online." },
      { property: "og:title", content: "Book Your Adventure — Juma Adventures" },
      { property: "og:description", content: "Get in touch to plan your Kenyan safari." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", tour: "", dates: "", people: "2", message: "" });

  const mailto = () => {
    const body = `Hi Juma Adventures,%0D%0A%0D%0A` +
      `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0ATour of interest: ${form.tour}%0D%0A` +
      `Preferred dates: ${form.dates}%0D%0ANumber of travelers: ${form.people}%0D%0A%0D%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:jumaadventuresandsafaris@gmail.com?subject=${encodeURIComponent("Booking request — " + (form.tour || "Kenya Safari"))}&body=${body}`;
  };

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20 text-center">
          <span className="eyebrow text-primary">Contact & Booking</span>
          <h1 className="mt-3 text-5xl font-bold">Let's plan your adventure</h1>
          <p className="mx-auto mt-4 max-w-xl opacity-85">
            Send a booking request or reach us directly on WhatsApp — we typically reply within a few hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold">Direct contact</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>📞 <a className="hover:text-primary" href="tel:+254746011254">+254 746 011 254</a></li>
                <li>💬 <a className="hover:text-primary" href="https://wa.me/254746011254">WhatsApp: +254 746 011 254</a></li>
                <li>📞 <a className="hover:text-primary" href="tel:+254705283274">+254 705 283 274</a></li>
                <li>✉️ <a className="hover:text-primary break-all" href="mailto:jumaadventuresandsafaris@gmail.com">jumaadventuresandsafaris@gmail.com</a></li>
                <li>📍 Nairobi, Kenya</li>
              </ul>
              <a href="https://www.facebook.com/groups/823417437291475/permalink/823417507291468/" className="btn-ghost mt-6 w-full">Facebook</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold">Office hours</h3>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li className="flex justify-between"><span>Mon – Fri</span><span>8:00 – 18:00</span></li>
                <li className="flex justify-between"><span>Saturday</span><span>9:00 – 16:00</span></li>
                <li className="flex justify-between"><span>Sunday</span><span>By appointment</span></li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); mailto(); }}
            className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            <h2 className="font-display text-2xl font-bold">Send a booking request</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll get back to you with a customized plan.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Jane Doe" />
              </Field>
              <Field label="Email" required>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="jane@example.com" />
              </Field>
              <Field label="Tour of interest">
                <select value={form.tour} onChange={(e) => setForm({ ...form, tour: e.target.value })} className="input">
                  <option value="">Select a tour…</option>
                  {packages.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                  <option value="Custom itinerary">Custom itinerary</option>
                </select>
              </Field>
              <Field label="Preferred dates">
                <input value={form.dates} onChange={(e) => setForm({ ...form, dates: e.target.value })} className="input" placeholder="e.g. March 12 – 16" />
              </Field>
              <Field label="Travelers">
                <input type="number" min={1} value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} className="input" />
              </Field>
            </div>
            <Field label="Message" className="mt-4">
              <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" placeholder="Tell us about your dream trip…" />
            </Field>
            <button type="submit" className="btn-primary mt-6 w-full">Send Booking Request</button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              This opens your email app. Prefer WhatsApp? <a href="https://wa.me/254746011254" className="text-primary underline">Message us here</a>.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, className = "", required }: { label: string; children: React.ReactNode; className?: string; required?: boolean }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}{required && <span className="text-primary"> *</span>}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
