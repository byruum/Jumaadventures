export type Package = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  duration: string;
  priceFrom: string;
  image: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary?: string[];
};

export const packages: Package[] = [
  {
    slug: "masai-mara",
    name: "Masai Mara Safari",
    tagline: "Kenya's most iconic wildlife destination",
    location: "Masai Mara National Reserve",
    duration: "3 – 5 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/masai-mara/masai-mara-national-reserve.jpg",
    overview:
      "Explore the world-famous Masai Mara National Reserve, home to the Big Five and the spectacular Great Wildebeest Migration. This safari offers breathtaking landscapes, thrilling game drives, and unforgettable wildlife encounters.",
    highlights: [
      "Big Five wildlife viewing",
      "Great Migration (seasonal)",
      "Unlimited game drives",
      "Professional safari guide",
      "Scenic savannah landscapes",
    ],
    included: [
      "Safari vehicle & fuel",
      "Professional tour guide",
      "Park entry fees",
      "Accommodation (as per package)",
      "Bottled drinking water",
    ],
    excluded: ["Personal expenses", "Alcoholic drinks", "Tips & gratuities"],
  },
  {
    slug: "lake-nakuru",
    name: "Lake Nakuru Safari",
    tagline: "Flamingos, rhinos & breathtaking lake views",
    location: "Lake Nakuru National Park",
    duration: "1 – 2 Days",
    priceFrom: "From $350",
    image:
      "https://jumaadventure.webtool.co.ke/images/lake-nakuru-national-park/lake-nakuru-national-park-1.jpg",
    overview:
      "Lake Nakuru National Park is one of Kenya's most beautiful parks, famous for its flamingos, rhino sanctuary, and diverse birdlife. A perfect short wildlife escape with stunning lake scenery.",
    highlights: [
      "Flamingos & over 400 bird species",
      "Rhino sanctuary (black & white rhinos)",
      "Scenic lake views",
      "Guided game drive",
      "Professional safari guide",
    ],
    included: ["Safari vehicle & fuel", "Professional tour guide", "Park entry fees", "Bottled drinking water"],
    excluded: ["Personal expenses", "Lunch & drinks", "Tips & gratuities"],
  },
  {
    slug: "mount-kenya",
    name: "Mount Kenya Trek",
    tagline: "Summit Africa's second-highest mountain",
    location: "Mount Kenya National Park",
    duration: "4 – 6 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/file_00000000b8a0722f94b276953bf7dc5d.png",
    overview:
      "A thrilling mountain adventure through alpine landscapes, scenic trails and breathtaking views on Africa's second-highest mountain. Reach Point Lenana with experienced mountain guides.",
    highlights: [
      "High-altitude trekking",
      "Point Lenana summit",
      "Experienced mountain guides",
      "Scenic alpine landscapes",
    ],
    included: [
      "Professional mountain guide",
      "Park entry fees",
      "Accommodation during trek",
      "Meals as per itinerary",
    ],
    excluded: ["Personal expenses", "Tips & gratuities", "Travel insurance"],
  },
  {
    slug: "lake-naivasha",
    name: "Lake Naivasha Safari",
    tagline: "Boat rides, birdlife & Crescent Island",
    location: "Lake Naivasha, Rift Valley",
    duration: "1 – 2 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/lake-naivasha.jpg",
    overview:
      "Enjoy a relaxing safari experience at Lake Naivasha, famous for its birdlife, hippos and scenic landscapes. Ideal for nature lovers and photography enthusiasts.",
    highlights: [
      "Boat ride on Lake Naivasha",
      "Bird watching & hippo viewing",
      "Crescent Island walking safari",
      "Professional tour guide",
    ],
    included: ["Transport from Nairobi", "Professional tour guide", "Boat ride fees", "Park entry fees"],
    excluded: ["Personal expenses", "Meals & drinks"],
  },
  {
    slug: "diani-beach",
    name: "Diani Beach Tour",
    tagline: "White sands & the warm Indian Ocean",
    location: "Diani, Kenyan Coast",
    duration: "3 – 5 Days",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/diani.jpg",
    overview:
      "Relax on the stunning beaches of Diani, enjoy the warm Indian Ocean, water sports, marine life and rich coastal culture with a professional guide from Juma Adventures.",
    highlights: [
      "Kenya's most beautiful white-sand beaches",
      "Snorkeling & water sports",
      "Marine life & reef exploration",
      "Coastal culture & cuisine",
    ],
    included: ["Beach transfers", "Guide services", "Selected activities"],
    excluded: ["Flights to Mombasa", "Meals unless specified", "Personal expenses"],
  },
  {
    slug: "nairobi-city-tour",
    name: "Nairobi City Day Tour",
    tagline: "Elephant Orphanage, Giraffe Centre & Museum",
    location: "Nairobi, Kenya",
    duration: "Full Day (8–10 Hours)",
    priceFrom: "From $350",
    image: "https://jumaadventure.webtool.co.ke/images/testimonials-gallery/nairobi-city-kicc-building.jpg",
    overview:
      "Enjoy a full-day guided tour exploring the best of Nairobi. Visit the David Sheldrick Elephant Orphanage, Giraffe Centre and Nairobi National Museum. Experience the city's culture, history and landmarks with a professional guide.",
    itinerary: [
      "Hotel / Airport pick-up",
      "Elephant Orphanage visit",
      "Giraffe Centre experience",
      "Nairobi National Museum",
      "Nairobi CBD & landmarks tour",
      "Drop-off at hotel / airport",
    ],
    highlights: [
      "David Sheldrick Elephant Orphanage",
      "Giraffe Centre",
      "Nairobi National Museum",
      "Nairobi CBD & landmarks",
    ],
    included: [
      "Transportation",
      "Entry fees (Giraffe Centre, Orphanage, Museum)",
      "Professional tour guide",
      "Guiding fee",
    ],
    excluded: ["Personal expenses", "Food & lunch"],
  },
];

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug);
