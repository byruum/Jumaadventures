import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPackage, packages } from "@/lib/packages";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const pkg = getPackage(params.slug);
    if (!pkg) throw notFound();
    return { pkg };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Tour not found — Juma Adventures" }, { name: "robots", content: "noindex" }] };
    }
    const { pkg } = loaderData;
    return {
      meta: [
        { title: `${pkg.name} — Juma Adventures` },
        { name: "description", content: pkg.overview.slice(0, 155) },
        { property: "og:title", content: `${pkg.name} — Juma Adventures` },
        { property: "og:description", content: pkg.tagline },
        { property: "og:image", content: pkg.image },
        { name: "twitter:image", content: pkg.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page py-32 text-center">
      <h1 className="text-3xl font-bold">Tour not found</h1>
      <p className="mt-3 text-muted-foreground">The package you're looking for doesn't exist.</p>
      <Link to="/packages" className="btn-primary mt-6 inline-flex">All packages</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-page py-32 text-center">
      <h1 className="text-2xl font-bold">Couldn't load this tour</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="btn-primary mt-6">Try again</button>
    </div>
  ),
  component: PackageDetail,
});

function PackageDetail() {
  const { pkg } = Route.useLoaderData() as { pkg: import("@/lib/packages").Package };
  const others = packages.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={pkg.image} alt={pkg.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="container-page relative py-32 text-white">
          <Link to="/packages" className="text-sm opacity-80 hover:opacity-100">← All packages</Link>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold sm:text-6xl">{pkg.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">{pkg.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">📍 {pkg.location}</span>
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">⏱ {pkg.duration}</span>
            <span className="rounded-full bg-primary px-3 py-1 font-semibold">{pkg.priceFrom}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <span className="eyebrow">Overview</span>
              <h2 className="mt-3 text-3xl font-bold">About this experience</h2>
              <p className="mt-4 text-foreground/80 leading-relaxed">{pkg.overview}</p>
            </div>

            {pkg.itinerary && (
              <div>
                <h3 className="text-2xl font-bold">Itinerary</h3>
                <ol className="mt-4 space-y-3">
                  {pkg.itinerary.map((step, i) => (
                    <li key={step} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-bold">{i + 1}</span>
                      <span className="pt-1 text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div>
              <h3 className="text-2xl font-bold">Highlights</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
                    <span className="text-primary">★</span>{h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-secondary">✔ What's Included</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {pkg.included.map((i) => <li key={i} className="flex gap-2"><span className="text-secondary">✓</span>{i}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-lg font-bold text-destructive">✖ Not Included</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {pkg.excluded.map((i) => <li key={i} className="flex gap-2"><span className="text-destructive">✗</span>{i}</li>)}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Starting price</div>
              <div className="mt-1 font-display text-3xl font-bold text-primary">{pkg.priceFrom}</div>
              <div className="mt-4 space-y-2 text-sm text-foreground/80">
                <div className="flex justify-between"><span>Duration</span><span className="font-medium">{pkg.duration}</span></div>
                <div className="flex justify-between"><span>Location</span><span className="font-medium text-right">{pkg.location}</span></div>
                <div className="flex justify-between"><span>Guide</span><span className="font-medium">Dennis Juma</span></div>
              </div>
              <Link to="/contact" search={{ tour: pkg.slug } as never} className="btn-primary mt-6 w-full">
                Book This Tour
              </Link>
              <a href="https://wa.me/254746011254" className="mt-2 flex w-full items-center justify-center rounded-full border border-[#25D366] px-6 py-3 text-sm font-semibold text-[#128C4B] hover:bg-[#25D366]/10">
                💬 Chat on WhatsApp
              </a>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Or email <a className="underline" href="mailto:jumaadventuresandsafaris@gmail.com">jumaadventuresandsafaris@gmail.com</a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-page">
          <h3 className="text-3xl font-bold">You might also like</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} to="/packages/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold group-hover:text-primary">{p.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{p.duration} • {p.priceFrom}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
