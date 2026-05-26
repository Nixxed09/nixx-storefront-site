export type ProductCategory = "figures" | "accessories" | "bundles" | "custom";

export type ProductFunnel = "starter" | "gift" | "game" | "bundle" | "custom";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  status: string;
  color: string;
  image: string;
  printTime: string;
  ageNote: string;
  funnel: ProductFunnel;
};

export const products: Product[] = [
  {
    id: "angel-of-peace",
    name: "Angel of Peace",
    category: "figures",
    description:
      "Winged guardian hero inspired by protection, kindness, and the light-versus-dark worlds Phoenix builds.",
    price: 29.99,
    status: "hero collection",
    color: "#26a69a",
    image: "/images/products/guardian-mint.jpg",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "gift",
  },
  {
    id: "football-warrior",
    name: "Football Warrior",
    category: "figures",
    description:
      "Sports hero built from Phoenix's football dreams: fast routes, big plays, and never-back-down energy.",
    price: 29.99,
    status: "sports hero",
    color: "#f15a24",
    image: "/images/products/sports-skate.jpg",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "starter",
  },
  {
    id: "battle-brawler",
    name: "Battle Brawler",
    category: "figures",
    description:
      "Shadow-squad action figure for epic missions, boss battles, and stories about courage under pressure.",
    price: 29.99,
    status: "shadow squad",
    color: "#4056f4",
    image: "/images/products/shadow-squad.jpg",
    printTime: "batch print",
    ageNote: "Ages 6+",
    funnel: "starter",
  },
  {
    id: "pixel-paladin",
    name: "Pixel Paladin",
    category: "figures",
    description:
      "Creative-builder figure that connects Phoenix's games, coding ideas, and toy universe into one hero.",
    price: 29.99,
    status: "creative builder",
    color: "#ffd166",
    image: "/images/products/hero-action.jpg",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "starter",
  },
  {
    id: "builders-tool-pack",
    name: "Hero Gear Pack",
    category: "accessories",
    description:
      "Weapons, tools, helmets, and extra parts that let each Dummy 13 hero change class, mission, or backstory.",
    price: 6,
    status: "accessory path",
    color: "#a8552b",
    image: "/images/products/accessory-pack.jpg",
    printTime: "quick batch",
    ageNote: "Small parts",
    funnel: "game",
  },
  {
    id: "starter-squad",
    name: "Dummy 13 Starter Squad",
    category: "bundles",
    description:
      "A first collection bundle for kids who want the start of a full character universe, not just one toy.",
    price: 79.99,
    status: "bundle idea",
    color: "#151312",
    image: "/images/products/starter-squad.jpg",
    printTime: "multi-print batch",
    ageNote: "Adult review",
    funnel: "bundle",
  },
  {
    id: "custom-hero",
    name: "Custom Hero Request",
    category: "custom",
    description:
      "Request a hero colorway, accessory combo, motto, or simple character idea for Phoenix to review.",
    price: 29.99,
    status: "inquiry only",
    color: "#f15a24",
    image: "/images/products/hero-action.jpg",
    printTime: "quote first",
    ageNote: "Adult review",
    funnel: "custom",
  },
];
