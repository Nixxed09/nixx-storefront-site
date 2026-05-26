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
  characterClass: string;
  motto: string;
  origin: string;
  gear: string[];
  lesson: string;
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
    characterClass: "Guardian",
    motto: "Protect the light. Keep the peace.",
    origin:
      "A calm winged hero from the Bright Zone who steps in when a squad needs courage and protection.",
    gear: ["wing armor", "light shield", "mint energy core"],
    lesson: "Real strength means protecting people without losing kindness.",
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
    characterClass: "Champion",
    motto: "Run the route. Make the play.",
    origin:
      "A field-born hero inspired by Phoenix's football goals, built for speed, focus, and clutch moments.",
    gear: ["receiver gloves", "training armor", "victory cleats"],
    lesson: "Practice, discipline, and heart turn pressure into power.",
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
    characterClass: "Brawler",
    motto: "Stand firm when the shadows show up.",
    origin:
      "A mission-ready fighter from the Shadow Squad who learns that courage is staying steady when things get hard.",
    gear: ["battle mask", "heavy armor", "mission gauntlets"],
    lesson: "Being brave is not pretending nothing is scary. It is moving anyway.",
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
    characterClass: "Builder",
    motto: "Build the world you want to play in.",
    origin:
      "A creator hero who connects game worlds, coding ideas, and toy missions into one playable universe.",
    gear: ["pixel blade", "builder pack", "idea core"],
    lesson: "Creators do not just consume worlds. They make new ones.",
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
    characterClass: "Upgrade",
    motto: "New gear, new mission.",
    origin:
      "A modular gear set that lets any Dummy 13 hero change roles, unlock missions, and tell a different story.",
    gear: ["helmets", "weapons", "tools", "mission parts"],
    lesson: "The right tools help imagination go further.",
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
    characterClass: "Squad",
    motto: "Every hero needs a team.",
    origin:
      "A first collection path for starting the Dummy 13 universe with multiple heroes, roles, and stories.",
    gear: ["multi-hero set", "mixed accessories", "starter story prompts"],
    lesson: "Teams work best when every character brings a different strength.",
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
    characterClass: "Custom",
    motto: "Your idea becomes the next legend.",
    origin:
      "A request path for turning a colorway, accessory combo, motto, or simple character idea into a reviewed print.",
    gear: ["custom colors", "chosen accessories", "optional motto"],
    lesson: "The best ideas get stronger when they are shaped, tested, and simplified.",
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
