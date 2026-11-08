import { useContext, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { packages } from "@/lib/packages";
import { CartContext } from "@/context/CartContext";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Juma Adventures" },
      { name: "description", content: "Browse all Juma Adventures tour packages: Masai Mara, Lake Nakuru, Mount Kenya, Diani Beach, Lake Naivasha and Nairobi city tour." },
      { property: "og:title", content: "Tour Packages — Juma Adventures" },
      { property: "og:description", content: "Handpicked safari and adventure packages across Kenya." },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  const { addToCart } = useContext(CartContext);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20 text-center">
          <span className="eyebrow text-primary">Our Tour Packages</span>
          <h1 className="mt-3 text-5xl font-bold">Choose your next Kenyan adventure</h1>
          <p className="mx-auto mt-4 max-w-2xl opacity-85">
            From wildlife safaris to mountain treks and coastal escapes — pick a package below or
            reach out for a fully customized itinerary.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p) => {
            const cleanPrice = p.priceFrom.replace(/[^0-9.]/g, "");
            const isAdded = addedSlug === p.slug;
            return (
              <div
                key={p.slug}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to="/packages/$slug" params={{ slug: p.slug }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                    <span className="absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">{p.priceFrom}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold group-hover:text-primary">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">📍 {p.location} • {p.duration}</p>
                    <p className="mt-3 text-sm text-foreground/80 line-clamp-2">{p.tagline}</p>
                  </div>
                </Link>
                <div className="flex gap-2 px-5 pb-5">
                  <button
                    onClick={() => {
                      addToCart({ name: p.name, price: cleanPrice });
                      setAddedSlug(p.slug);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      alert("Added to cart — now tap the 🛒 Cart button at the top and pay the 20% deposit to secure your booking.");
                    }}
                    className="btn-primary flex-1 !py-2 text-sm"
                  >
                    {isAdded ? "✅ Added — Pay Deposit in Cart ↑" : "Book — Pay 20% Deposit"}
                  </button>
                  <Link to="/packages/$slug" params={{ slug: p.slug }} className="btn-ghost flex-1 !py-2 text-center text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
