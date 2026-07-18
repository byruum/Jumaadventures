import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Juma Adventures — Dennis Juma, KWS-Trained Guide" },
      { name: "description", content: "Meet Dennis Juma — professional Kenyan tour guide with 10+ years of experience, trained by KWS in wildlife conservation and Kenya Institute of Management." },
      { property: "og:title", content: "About Juma Adventures" },
      { property: "og:description", content: "Passion-driven safaris led by Dennis Juma across Kenya and East Africa." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { t: "Authentic", d: "Real experiences with local guides who grew up in these landscapes." },
  { t: "Safe", d: "KWS-trained expertise, well-maintained vehicles, and safety-first planning." },
  { t: "Flexible", d: "Every itinerary is customized around your pace, dates and budget." },
  { t: "Responsible", d: "We support conservation and respect local communities on every tour." },
];

function AboutPage() {
  return (
    <>
      <section className="bg-secondary text-secondary-foreground">
        <div className="container-page py-20">
          <span className="eyebrow text-primary">About Us</span>
          <h1 className="mt-3 text-5xl font-bold">A decade of guiding across East Africa.</h1>
          <p className="mt-5 max-w-2xl opacity-85">
            Juma Adventures is a passion-driven safari and adventure company built on a deep love
            for Kenya's landscapes, wildlife and people.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src="https://jumaadventure.webtool.co.ke/images/testimonials-gallery/Mount-kenya-1.jpg"
            alt="Dennis Juma on a Mount Kenya expedition"
            className="aspect-[4/5] w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">Founder</span>
            <h2 className="mt-3 text-4xl font-bold">Meet Dennis Juma</h2>
            <p className="mt-5 text-foreground/85">
              Dennis Juma began his journey in tourism in 2013, building extensive knowledge
              through years of guiding wildlife safaris, mountain hiking expeditions and cultural
              tours. He is trained in Management by the <strong>Kenya Institute of Management</strong>,
              and professionally trained by the <strong>Kenya Wildlife Service (KWS)</strong> in
              wildlife conservation — giving him strong grounding in responsible tourism,
              environmental protection and visitor safety.
            </p>
            <p className="mt-4 text-foreground/85">
              With this solid foundation, Juma Adventures has successfully guided guests through
              iconic destinations such as the Masai Mara, Amboseli, Tsavo, Lake Nakuru, Serengeti,
              Ngorongoro and challenging mountain adventures including Mount Kenya and Mount
              Kilimanjaro.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.t} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-lg font-bold text-primary">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-primary mt-8">Plan a trip with Dennis</Link>
          </div>
        </div>
      </section>
    </>
  );
}
