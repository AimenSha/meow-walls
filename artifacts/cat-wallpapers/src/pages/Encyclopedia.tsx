import React, { useState } from "react";
import { Link } from "wouter";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Species {
  name: string;
  scientific: string;
  family: string;
  origin: string;
  habitat: string;
  weight: string;
  lifespan: string;
  status: string;
  description: string;
  facts: string[];
  color: string;
}

const DOMESTIC_INFO = {
  classification: {
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    order: "Carnivora",
    family: "Felidae",
    genus: "Felis",
    species: "Felis catus",
  },
  history: [
    {
      period: "~10,000 BCE",
      event: "Earliest domestication",
      detail: "Cats began associating with humans in the Fertile Crescent (modern-day Middle East) as agriculture created grain stores that attracted rodents — and cats followed.",
    },
    {
      period: "~9,500 BCE",
      event: "Oldest known cat burial",
      detail: "Archaeologists in Cyprus uncovered a human and a cat buried together, suggesting cats held a special place in early human society.",
    },
    {
      period: "~3,500 BCE",
      event: "Ancient Egypt",
      detail: "Cats were revered in Egypt. The goddess Bastet was depicted as a cat. Killing a cat — even accidentally — was punishable by death.",
    },
    {
      period: "~500 BCE",
      event: "Spread through trade",
      detail: "Phoenician traders brought cats to Europe. Cats spread along trade routes, valued for their ability to protect grain and cargo from rodents.",
    },
    {
      period: "Middle Ages",
      event: "European persecution",
      detail: "During the Middle Ages, cats were associated with witchcraft and persecuted in Europe, leading to population declines and ironically worsening rat-borne plagues.",
    },
    {
      period: "17th–18th c.",
      event: "Cats reach the Americas",
      detail: "European settlers brought cats to the Americas aboard ships, both for pest control and as companions.",
    },
    {
      period: "19th century",
      event: "First cat show",
      detail: "The world's first cat show was held at Crystal Palace, London, in 1871 — marking the beginning of formal cat breeding.",
    },
    {
      period: "Today",
      event: "600 million cats worldwide",
      detail: "The domestic cat is one of the most popular pets on Earth with an estimated 600 million individuals. Over 70 recognised breeds exist.",
    },
  ],
};

const CAT_SPECIES: Species[] = [
  {
    name: "Lion",
    scientific: "Panthera leo",
    family: "Felidae",
    origin: "Sub-Saharan Africa, small population in India",
    habitat: "Savannas, grasslands, open woodlands",
    weight: "120–250 kg",
    lifespan: "10–14 years in the wild",
    status: "Vulnerable",
    description: "The lion is the only truly social wild cat, living in groups called prides. Males are distinguished by their magnificent manes. Known as the 'King of the Jungle', lions are apex predators that hunt cooperatively, primarily targeting large ungulates.",
    facts: [
      "A lion's roar can be heard from 8 km away",
      "Males sleep up to 20 hours per day",
      "Only female lions (lionesses) do most of the hunting",
      "Cubs are born with spots that fade as they age",
    ],
    color: "from-amber-900/80",
  },
  {
    name: "Tiger",
    scientific: "Panthera tigris",
    family: "Felidae",
    origin: "Asia (India, Russia, Southeast Asia)",
    habitat: "Tropical forests, grasslands, mangroves",
    weight: "100–300 kg",
    lifespan: "10–15 years in the wild",
    status: "Endangered",
    description: "The tiger is the largest wild cat species and a powerful apex predator. Each tiger's stripe pattern is unique — no two tigers have the same markings. Tigers are solitary and territorial, and unlike most cats, they are strong swimmers.",
    facts: [
      "Tigers are the only striped big cats",
      "They can leap up to 10 metres in a single bound",
      "Tigers love water and are excellent swimmers",
      "A tiger's roar can paralyse prey with fear",
    ],
    color: "from-orange-900/80",
  },
  {
    name: "Leopard",
    scientific: "Panthera pardus",
    family: "Felidae",
    origin: "Africa and Asia",
    habitat: "Rainforests, deserts, mountains, savannas",
    weight: "30–90 kg",
    lifespan: "12–17 years in the wild",
    status: "Vulnerable",
    description: "The leopard is perhaps the most adaptable of the big cats, thriving in habitats from rainforest to desert. Remarkable climbers, leopards haul prey twice their weight into trees to protect it from scavengers. Black panthers are simply melanistic leopards.",
    facts: [
      "Leopards can carry prey twice their own weight up a tree",
      "Black panthers are leopards with a melanistic coat",
      "Each leopard's spot pattern is unique",
      "They are mostly nocturnal hunters",
    ],
    color: "from-yellow-900/80",
  },
  {
    name: "Cheetah",
    scientific: "Acinonyx jubatus",
    family: "Felidae",
    origin: "Africa and Iran",
    habitat: "Open grasslands, savannas",
    weight: "21–72 kg",
    lifespan: "10–12 years in the wild",
    status: "Vulnerable",
    description: "The cheetah is the fastest land animal on Earth, capable of reaching 112 km/h in short bursts. Unlike other big cats, cheetahs cannot roar — they purr, chirp, and yelp. Their claws are semi-retractable, acting like cleats for high-speed traction.",
    facts: [
      "Can accelerate from 0 to 100 km/h in 3 seconds",
      "Cheetahs cannot roar — they chirp and purr",
      "They hunt by sight, not smell",
      "Their tear marks reduce sun glare during hunts",
    ],
    color: "from-lime-900/80",
  },
  {
    name: "Jaguar",
    scientific: "Panthera onca",
    family: "Felidae",
    origin: "Americas (Amazon basin, Central America)",
    habitat: "Tropical rainforests, wetlands, grasslands",
    weight: "56–96 kg",
    lifespan: "12–15 years in the wild",
    status: "Near Threatened",
    description: "The jaguar is the largest cat in the Americas and the third-largest in the world. It is the only Panthera species native to the Americas. Unlike other big cats, jaguars kill prey with a unique bite through the skull rather than the throat.",
    facts: [
      "Jaguars have the most powerful bite of any big cat",
      "They kill prey with a skull bite, not a throat bite",
      "Jaguars love water and are excellent swimmers",
      "Sacred in many indigenous American cultures",
    ],
    color: "from-emerald-900/80",
  },
  {
    name: "Snow Leopard",
    scientific: "Panthera uncia",
    family: "Felidae",
    origin: "Central and South Asia",
    habitat: "Mountains, alpine meadows (3,000–5,500 m altitude)",
    weight: "22–55 kg",
    lifespan: "10–12 years in the wild",
    status: "Vulnerable",
    description: "The snow leopard is a majestic and elusive cat of the high mountains, known as the 'ghost of the mountains'. Its thick, smoky-grey fur and long tail (used for balance and warmth) make it uniquely adapted to frigid mountain environments.",
    facts: [
      "Their long tails wrap around them like a blanket for warmth",
      "Snow leopards cannot roar — they make a chuffing sound",
      "They can leap 15 metres horizontally",
      "Sometimes called the 'ghost of the mountains' for their elusiveness",
    ],
    color: "from-sky-900/80",
  },
  {
    name: "Cougar (Puma)",
    scientific: "Puma concolor",
    family: "Felidae",
    origin: "Americas",
    habitat: "Mountains, forests, deserts, swamps",
    weight: "29–90 kg",
    lifespan: "8–13 years in the wild",
    status: "Least Concern",
    description: "The cougar — also called mountain lion or puma — is one of the most widely distributed land mammals in the Western Hemisphere. Despite its large size, it is more closely related to small cats than to lions and cannot roar, only purr.",
    facts: [
      "Goes by over 40 different names in English alone",
      "Can jump 5.5 metres vertically from a standing position",
      "Cougars purr like domestic cats, they cannot roar",
      "Most widely distributed wild cat in the Americas",
    ],
    color: "from-rose-900/80",
  },
  {
    name: "Lynx",
    scientific: "Lynx lynx",
    family: "Felidae",
    origin: "Europe, Asia, North America",
    habitat: "Boreal forests, tundra, mountainous areas",
    weight: "8–30 kg",
    lifespan: "12–17 years in the wild",
    status: "Least Concern",
    description: "The lynx is a medium-sized wild cat with distinctive ear tufts and a short, bobbed tail. Its large, padded paws act as natural snowshoes, allowing it to hunt in deep snow with ease. The Canada lynx and snowshoe hare have a famous predator-prey population cycle.",
    facts: [
      "Their large paws act like natural snowshoes",
      "Ear tufts may enhance hearing and communication",
      "Canada lynx populations rise and fall with snowshoe hare numbers",
      "Their spotted kittens are born in litters of 2–4",
    ],
    color: "from-violet-900/80",
  },
  {
    name: "Ocelot",
    scientific: "Leopardus pardalis",
    family: "Felidae",
    origin: "South and Central America, southwestern USA",
    habitat: "Tropical forests, savannas, mangroves",
    weight: "7–15.5 kg",
    lifespan: "10–13 years in the wild",
    status: "Least Concern",
    description: "The ocelot is a beautifully marked small wild cat, often called the 'dwarf leopard' for its spotted coat. Once heavily hunted for the fur trade, ocelots have recovered in many regions. Salvador Dalí famously kept a pet ocelot named Babou.",
    facts: [
      "Hunted nearly to extinction for their spotted fur in the 20th century",
      "Salvador Dalí kept an ocelot as a pet",
      "Excellent swimmers and climbers",
      "Highly territorial — mark territory with urine and scratch marks",
    ],
    color: "from-fuchsia-900/80",
  },
  {
    name: "Serval",
    scientific: "Leptailurus serval",
    family: "Felidae",
    origin: "Africa",
    habitat: "Savannas, wetlands, grasslands near water",
    weight: "9–18 kg",
    lifespan: "10–12 years in the wild",
    status: "Least Concern",
    description: "The serval is a slender African wild cat renowned for its extraordinarily long legs and massive ears. It has the highest hunting success rate of any wild cat — catching prey roughly 50% of the time — mostly by leaping vertically to snatch birds from the air.",
    facts: [
      "Has the highest hunting success rate of any wild cat (~50%)",
      "Can leap 3 metres into the air to catch birds",
      "Their huge ears can detect prey moving underground",
      "Domestic Savannah cats are serval hybrids",
    ],
    color: "from-teal-900/80",
  },
];

function SpeciesCard({ species, index }: { species: Species; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
      data-testid={`species-card-${species.scientific.replace(/\s/g, "-")}`}
    >
      <div
        className={`bg-gradient-to-br ${species.color} to-card p-5 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-bold text-foreground">{species.name}</h3>
            <p className="text-xs text-primary italic font-semibold mt-0.5">{species.scientific}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              species.status === "Endangered" ? "text-red-400 border-red-400/40 bg-red-400/10" :
              species.status === "Vulnerable" ? "text-orange-400 border-orange-400/40 bg-orange-400/10" :
              species.status === "Near Threatened" ? "text-yellow-400 border-yellow-400/40 bg-yellow-400/10" :
              "text-green-400 border-green-400/40 bg-green-400/10"
            }`}>
              {species.status}
            </span>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Origin</p>
            <p className="text-xs text-foreground font-semibold mt-0.5">{species.origin}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Weight</p>
            <p className="text-xs text-foreground font-semibold mt-0.5">{species.weight}</p>
          </div>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="px-5 pb-5 border-t border-border pt-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{species.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-secondary/60 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Habitat</p>
              <p className="text-xs text-foreground font-semibold">{species.habitat}</p>
            </div>
            <div className="bg-secondary/60 rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Lifespan</p>
              <p className="text-xs text-foreground font-semibold">{species.lifespan}</p>
            </div>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">Did you know?</p>
          <ul className="space-y-1.5">
            {species.facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground font-semibold">
                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Encyclopedia() {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="paw-pattern bg-card pt-10 pb-12 px-4 border-b border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <Link href="/" className="inline-block text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors mb-6">
            &larr; Back to Wallpapers
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Cat Encyclopedia
          </h1>
          <p className="text-muted-foreground font-semibold leading-relaxed">
            From ancient Egypt to your living room — a complete guide to cats, their history,
            scientific classification, and every species in the Felidae family.
          </p>

          {/* Scientific Classification */}
          <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
            {Object.entries(DOMESTIC_INFO.classification).map(([key, value]) => (
              <div key={key} className="bg-secondary border border-border rounded-xl px-4 py-2 text-center">
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{key}</p>
                <p className="text-sm font-bold text-foreground italic">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 max-w-5xl">

        {/* History */}
        <div className="mb-12">
          <button
            onClick={() => setHistoryOpen(!historyOpen)}
            className="w-full flex items-center justify-between mb-6 group cursor-pointer"
            data-testid="button-toggle-history"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <h2 className="font-serif text-2xl font-bold text-foreground">History of the Domestic Cat</h2>
            </div>
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              {historyOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </span>
          </button>

          {!historyOpen && (
            <p className="text-sm text-muted-foreground font-semibold cursor-pointer hover:text-foreground transition-colors" onClick={() => setHistoryOpen(true)}>
              Click to explore 10,000 years of cat history — from the Fertile Crescent to your sofa.
            </p>
          )}

          {historyOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-6">
                {DOMESTIC_INFO.history.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex gap-4 pl-0"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-4 flex-1 mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-primary bg-primary/15 px-2 py-0.5 rounded-full">{item.period}</span>
                        <span className="font-serif font-bold text-foreground">{item.event}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-semibold">{item.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Species */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary" />
            <h2 className="font-serif text-2xl font-bold text-foreground">Cat Species of the World</h2>
          </div>
          <p className="text-sm text-muted-foreground font-semibold mb-6 -mt-4">
            There are 37 species in the family Felidae. Below are the most notable — click any card to expand full details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAT_SPECIES.map((species, i) => (
              <SpeciesCard key={species.scientific} species={species} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
