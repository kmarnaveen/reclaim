export type MaterialCategory = {
  slug: "metal" | "rubber" | "textile" | "paper";
  name: string;
  symbol: string;
  label: string;
  heroClass: string;
  image: string;
  imageAlt: string;
  statement: string;
  description: string;
  accepted: { group: string; items: string[] }[];
  forms: string[];
  checks: string[];
  destinations: string[];
};

export const materialCategories: MaterialCategory[] = [
  {
    slug: "metal",
    name: "Metal Scrap",
    symbol: "Fe",
    label: "Ferrous · Non-ferrous · Alloy",
    heroClass: "tone-metal",
    image: "/materials/metal-scrap.webp",
    imageAlt: "Sorted copper, aluminium, steel and stainless metal scrap in an organized industrial yard",
    statement: "Every metal stream, from production offcuts to recovered non-ferrous grades.",
    description:
      "We buy, aggregate and supply ferrous, non-ferrous and alloy scrap in loose, cut, shredded, baled and container-ready forms.",
    accepted: [
      {
        group: "Ferrous metals",
        items: [
          "HMS 1 & HMS 2",
          "Cast iron scrap",
          "Steel turnings and borings",
          "Sheet and plate cuttings",
          "Rebar and structural steel",
          "Busheling and bundles",
          "Rail and wheel scrap",
          "Shredded steel scrap",
        ],
      },
      {
        group: "Non-ferrous metals",
        items: [
          "Copper Berry, Candy and Birch/Cliff",
          "Insulated copper and aluminium cable",
          "Aluminium Taint/Tabor and Tense",
          "UBC, extrusion and wheel scrap",
          "Brass Honey and mixed brass",
          "Bronze, gunmetal and red brass",
          "Lead, zinc and tin scrap",
          "Radiators and heat exchangers",
        ],
      },
      {
        group: "Alloys and specialist grades",
        items: [
          "Stainless steel 304 and 316",
          "Nickel-bearing alloys",
          "Tool steel and high-speed steel",
          "Motors, armatures and transformers",
          "Zorba and Twitch fractions",
          "Automotive metal scrap",
          "Foundry returns",
          "Mixed metal residues",
        ],
      },
    ],
    forms: ["Loose", "Baled", "Bundled", "Sheared", "Shredded", "Turnings", "Ingots", "Containerised"],
    checks: ["Grade and alloy verification", "Radiation screening where required", "Oil and attachment limits", "Net and gross weight record"],
    destinations: ["Steel mills", "Foundries", "Copper refiners", "Aluminium remelters", "Brass mills", "Secondary smelters"],
  },
  {
    slug: "rubber",
    name: "Rubber Scrap",
    symbol: "Rb",
    label: "Tyres · Industrial rubber · Reclaim",
    heroClass: "tone-rubber",
    image: "/materials/rubber-scrap.webp",
    imageAlt: "Whole tyres, tyre chips, rubber crumb and conveyor belt scrap in a recovery facility",
    statement: "A complete rubber recovery stream for reclaimers, moulders and energy users.",
    description:
      "We accept post-industrial and post-consumer rubber in whole, cut, chipped, crumbed, powdered and baled formats.",
    accepted: [
      {
        group: "Tyre-derived material",
        items: [
          "Passenger car tyres",
          "Truck and bus tyres",
          "OTR and agricultural tyres",
          "Tyre sidewalls and treads",
          "Steel-free tyre chips",
          "Rubber crumb and powder",
          "Buffing dust and peel",
          "Butyl inner tubes",
        ],
      },
      {
        group: "Industrial rubber",
        items: [
          "Conveyor belt scrap",
          "EPDM profiles and seals",
          "SBR and natural rubber",
          "NBR and nitrile rubber",
          "Silicone rubber scrap",
          "Rubber sheets and mats",
          "Footwear sole scrap",
          "Automotive rubber components",
        ],
      },
      {
        group: "Reclaim and compounds",
        items: [
          "Tyre reclaim rubber",
          "Butyl reclaim rubber",
          "EPDM reclaim rubber",
          "Unvulcanised rubber compound",
          "Cured rubber lumps",
          "Latex waste",
          "Mixed rubber scrap",
          "Rubber-coated fabric",
        ],
      },
    ],
    forms: ["Whole", "Cut", "Shredded", "Chips", "Crumb", "Powder", "Baled", "Jumbo bags"],
    checks: ["Polymer and source declaration", "Steel and fibre separation", "Size and mesh distribution", "Moisture and contamination limits"],
    destinations: ["Rubber reclaimers", "Moulded goods makers", "Crumb processors", "Flooring producers", "Civil applications", "Approved energy recovery"],
  },
  {
    slug: "textile",
    name: "Textile Scrap",
    symbol: "Tx",
    label: "Natural · Synthetic · Blended",
    heroClass: "tone-textile",
    image: "/materials/textile-scrap.webp",
    imageAlt: "Sorted cotton, denim, polyester and mixed textile offcuts prepared for recovery",
    statement: "From cutting-room waste to post-consumer textiles, sorted for their next use.",
    description:
      "We handle natural, synthetic and blended textile waste by fibre, colour, construction and recovery route.",
    accepted: [
      {
        group: "Natural fibres",
        items: [
          "Cotton hosiery clips",
          "Cotton yarn waste",
          "Denim cuttings and clips",
          "Wool and cashmere waste",
          "Jute and hessian scrap",
          "Linen and flax waste",
          "Wiping rags",
          "White and coloured cotton",
        ],
      },
      {
        group: "Synthetic fibres",
        items: [
          "Polyester fabric scrap",
          "Nylon waste",
          "Acrylic fibre waste",
          "Polypropylene nonwoven scrap",
          "Polyester yarn waste",
          "Fleece and microfibre offcuts",
          "Carpet and upholstery scrap",
          "Technical textile waste",
        ],
      },
      {
        group: "Garments and blended textiles",
        items: [
          "Garment cutting waste",
          "Cotton-polyester blends",
          "Post-consumer clothing",
          "Surplus fabric rolls",
          "Rejected garments",
          "Home textile waste",
          "Shoe and bag fabric offcuts",
          "Mixed textile bales",
        ],
      },
    ],
    forms: ["Loose", "Bagged", "Baled", "Rolls", "Clips", "Yarn", "Fibre", "Shredded"],
    checks: ["Fibre composition declaration", "Colour and shade sorting", "Hard-part and accessory limits", "Moisture and odour inspection"],
    destinations: ["Open-end spinning", "Felt and insulation", "Wiping cloth", "Fibre regeneration", "Nonwoven production", "Downcycling and recovery"],
  },
  {
    slug: "paper",
    name: "Paper Scrap",
    symbol: "Pp",
    label: "Packaging · Printing · Pulp grades",
    heroClass: "tone-paper",
    image: "/materials/paper-scrap.webp",
    imageAlt: "Baled cardboard, office paper and recovered paper grades in a clean recycling warehouse",
    statement: "Recovered paper grades prepared for mills, converters and fibre processors.",
    description:
      "We accept brown, white, printed, coated and mixed recovered paper in loose, baled and mill-ready formats.",
    accepted: [
      {
        group: "Packaging grades",
        items: [
          "OCC 11 and OCC 12",
          "Double-sorted OCC",
          "Kraft cuttings",
          "Kraft carrier bags",
          "Corrugated box plant waste",
          "Cup stock and poly-coated board",
          "Carton and boxboard cuttings",
          "Aseptic packaging fractions",
        ],
      },
      {
        group: "Printing and office grades",
        items: [
          "Sorted office paper",
          "White ledger",
          "Computer printout",
          "Old newspaper",
          "Old magazines",
          "Coated book stock",
          "Printers' mix",
          "Shredded confidential paper",
        ],
      },
      {
        group: "Mixed and pulp substitutes",
        items: [
          "Mixed paper",
          "Hard white shavings",
          "Soft white shavings",
          "Tissue and towelling waste",
          "Pulp substitute grades",
          "Paper cores and tubes",
          "Beverage carton residues",
          "Mill broke and trim waste",
        ],
      },
    ],
    forms: ["Loose", "Baled", "Shredded", "Rolls", "Cuttings", "Cores", "Mill broke", "Containerised"],
    checks: ["Grade and source declaration", "Prohibitive material control", "Moisture measurement", "Bale weight and loading record"],
    destinations: ["Packaging mills", "Tissue mills", "Board manufacturers", "Moulded fibre", "Pulp producers", "Paper converters"],
  },
];

export function getMaterialCategory(slug: string) {
  return materialCategories.find((category) => category.slug === slug);
}
