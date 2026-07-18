import { createFileRoute, Link } from "@tanstack/react-router";
import { packages } from "@/lib/packages";
import heroAsset from "@/assets/hero-safari.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const HERO_IMG = heroAsset.url;

const gallery = [
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/Mount-kenya-1.jpg",
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/mt-kenya-point-lenana-peak%20(1).jpg",
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/mount-kenya-day-trip-hike.jpg",
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/masai-mara-national-reserve%20(1).jpg",
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/lake-nakuru-safari.jpg",
  "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/nairobi-city-kicc-building.jpg",
];

const reviews = [
  { name: "Sarah M.", text: "Amazing safari and very professional guide. Dennis knew every corner of the Mara." },
  { name: "James K.", text: "Highly recommend Juma Adventures — well organized from pickup to drop-off." },
  { name: "Daniel R.", text: "The best experience I've had in Kenya. Beautifully planned trip." },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Safari vehicle in the Masai Mara at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="container-page relative flex min-h-[86vh] flex-col justify-center py-24 text-white">
          <span className="eyebrow text-white/80">Kenya • East Africa</span>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
            Discover Kenya<br />
            <span className="text-primary">like never before.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            Unforgettable safari adventures, breathtaking landscapes and authentic cultural
            experiences — guided by Dennis Juma, KWS-trained and 10+ years in the wild.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/packages" className="btn-primary">Explore Tours</Link>
            <Link to="/contact" className="btn-outline">Book Your Adventure</Link>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/20 pt-6 text-white/90">
            <div>
              <div className="font-display text-3xl font-bold">10+</div>
              <div className="text-xs uppercase tracking-wider opacity-70">Years guiding</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold">15+</div>
              <div className="text-xs uppercase tracking-wider opacity-70">Destinations</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold">500+</div>
              <div className="text-xs uppercase tracking-wider opacity-70">Happy guests</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-page py-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {packages.slice(0, 5).map((p) => (
              <Link
                key={p.slug}
                to="/packages/$slug"
                params={{ slug: p.slug }}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium hover:border-primary hover:text-primary"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="destinations" className="section">
        <div className="container-page">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Popular Destinations</span>
              <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Handpicked adventures across Kenya</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                From the migration in the Mara to the peaks of Mount Kenya and the reefs of Diani —
                every package is carefully planned around comfort, safety and authenticity.
              </p>
            </div>
            <Link to="/packages" className="btn-ghost">View all packages →</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <Link
                key={p.slug}
                to="/packages/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                    <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                      {p.duration}
                    </span>
                    <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                      {p.priceFrom}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold group-hover:text-primary">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">📍 {p.location} • {p.duration}</p>
                  <p className="mt-3 text-sm text-foreground/80 line-clamp-2">{p.tagline}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-primary font-semibold">View details →</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section bg-muted/40">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">About Juma Adventures</span>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Passion-driven safaris led by Dennis Juma.
            </h2>
            <p className="mt-5 text-foreground/80">
              Juma Adventures is a passion-driven safari and adventure company founded by
              <strong> Dennis Juma</strong>, a professional tour guide with over 10 years of
              hands-on experience in the tourism industry across Kenya and Tanzania. Established
              from a deep love for nature, wildlife and African landscapes.
            </p>
            <p className="mt-4 text-foreground/80">
              Dennis is trained in Management by the Kenya Institute of Management and
              professionally trained by the <strong>Kenya Wildlife Service (KWS)</strong> in
              wildlife conservation — giving him strong grounding in responsible tourism,
              environmental protection and visitor safety.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {["Masai Mara", "Amboseli", "Tsavo", "Lake Nakuru", "Serengeti", "Ngorongoro", "Mount Kenya", "Kilimanjaro"].map((d) => (
                <div key={d} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <span className="text-primary">✓</span>{d}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src={gallery[0]} alt="Mount Kenya expedition" className="aspect-[3/4] w-full rounded-2xl object-cover" loading="lazy" />
              <img src={gallery[3]} alt="Masai Mara safari" className="mt-10 aspect-[3/4] w-full rounded-2xl object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-xl">
              <div className="font-display text-3xl font-bold">10+</div>
              <div className="text-xs uppercase tracking-wider opacity-90">Years of guiding</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What's Included</span>
            <h2 className="mt-3 text-4xl font-bold">Every tour is crafted for comfort & safety</h2>
            <p className="mt-3 text-muted-foreground">
              Our packages are clear, flexible and traveler-friendly.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-secondary">✔ Included</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Professional tour guide (Dennis Juma)",
                  "Comfortable safari vehicle transport",
                  "Park entry fees (where applicable)",
                  "Bottled drinking water during the tour",
                  "Customized itinerary",
                  "Pick-up & drop-off within Nairobi",
                ].map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-secondary">✓</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-xl font-bold text-destructive">✖ Not Included</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {[
                  "Personal expenses",
                  "Tips & gratuities",
                  "Alcoholic drinks",
                  "International flights",
                  "Travel insurance",
                ].map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-destructive">✗</span>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary text-secondary-foreground">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-primary">Guest Reviews</span>
            <h2 className="mt-3 text-4xl font-bold">Loved by travelers from around the world</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.name} className="rounded-2xl bg-white/5 p-6 backdrop-blur">
                <div className="text-yellow-400">★★★★★</div>
                <p className="mt-4 text-lg italic opacity-95">"{r.text}"</p>
                <p className="mt-4 text-sm font-semibold opacity-80">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Testimonials Gallery</span>
            <h2 className="mt-3 text-4xl font-bold">Real moments from real journeys</h2>
            <p className="mt-3 text-muted-foreground">
              Every image tells a true story of adventure, discovery and unforgettable memories.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((g, i) => (
              <img key={g} src={g} alt={`Juma Adventures gallery ${i + 1}`} className="aspect-square w-full rounded-xl object-cover transition hover:scale-[1.02]" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="relative isolate overflow-hidden">
        <img src={gallery[3]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container-page relative py-24 text-center text-white">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold sm:text-5xl">
            Your Kenyan adventure starts with one message.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Tell us where you'd love to go — we'll craft a tour that fits your dates, budget and pace.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Send Booking Request</Link>
            <a href="https://wa.me/254746011254" className="btn-outline">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
