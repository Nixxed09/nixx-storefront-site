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
  imageAlt: string;
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
    image: "/images/products/polished/angel-of-peace.jpg",
    imageAlt: "Mint and white winged Dummy 13 guardian figure with a peace-sign pose",
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
    id: "disc-dasher",
    name: "Disc Dasher",
    category: "figures",
    description:
      "Orange action hero posed mid-catch with a flying disc, built for speed scenes and sports stories.",
    price: 29.99,
    status: "sports hero",
    color: "#f15a24",
    image: "/images/products/polished/disc-dasher.jpg",
    imageAlt: "Orange and white Dummy 13 figure posed with a flying disc",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "starter",
    characterClass: "Sky Runner",
    motto: "Track the throw. Trust the leap.",
    origin:
      "A high-jump hero from the Open Field Zone who turns every throw into a chance to prove focus and timing.",
    gear: ["flying disc", "orange speed joints", "jump stance"],
    lesson: "Practice and timing turn a hard catch into a highlight.",
  },
  {
    id: "battle-brawler",
    name: "Battle Brawler",
    category: "figures",
    description:
      "Blue blaster hero from the action set, built for mission scenes, boss fights, and high-energy display shots.",
    price: 29.99,
    status: "blaster hero",
    color: "#4056f4",
    image: "/images/products/polished/battle-brawler.jpg",
    imageAlt: "Blue and white Dummy 13 figure holding a translucent blue blaster",
    printTime: "batch print",
    ageNote: "Ages 6+",
    funnel: "starter",
    characterClass: "Blaster",
    motto: "Stand firm. Aim true.",
    origin:
      "A mission-ready fighter from the Blue Zone who steps into the front line when the squad needs cover.",
    gear: ["blue blaster", "back blade", "battle stance"],
    lesson: "Courage means staying steady when the mission gets loud.",
  },
  {
    id: "skate-spark",
    name: "Skate Spark",
    category: "figures",
    description:
      "Red skateboard hero surrounded by other characters, made for motion, balance, and street-scene stories.",
    price: 29.99,
    status: "skate hero",
    color: "#ef4444",
    image: "/images/products/polished/skate-spark.jpg",
    imageAlt: "Red and white Dummy 13 skateboard figure in a group action scene",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "starter",
    characterClass: "Street Rider",
    motto: "Balance the chaos. Ride the edge.",
    origin:
      "A street-zone rider who moves through the Dummy 13 world on a red board, dodging shadows and finding new routes.",
    gear: ["red skateboard", "street stance", "quick-turn joints"],
    lesson: "Balance matters most when everything around you is moving.",
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
    image: "/images/products/polished/hero-gear-pack.jpg",
    imageAlt: "White and tan Dummy 13 figure loaded with blasters, blades, and display gear",
    printTime: "quick batch",
    ageNote: "Small parts",
    funnel: "game",
    characterClass: "Arsenal Hero",
    motto: "New gear, new mission.",
    origin:
      "A white-and-tan hero loaded with blasters, blades, and display gear, showing how accessories change the whole character.",
    gear: ["tan blaster", "back blades", "leg holsters", "display stand"],
    lesson: "The right gear helps a hero step into a bigger mission.",
  },
  {
    id: "winged-guardian-poster",
    name: "Winged Guardian Display Pose",
    category: "figures",
    description:
      "Wide hero shot of the mint winged guardian with strong shadow wings and a display-ready pose.",
    price: 29.99,
    status: "guardian pose",
    color: "#26a69a",
    image: "/images/products/polished/winged-guardian-poster.jpg",
    imageAlt: "Mint and white winged Dummy 13 guardian in a wide display pose",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "gift",
    characterClass: "Guardian",
    motto: "Rise high. Guard the light.",
    origin:
      "A display-focused version of the Angel of Peace, posed like the cover image for the first Dummy 13 story.",
    gear: ["wide wings", "mint joints", "peace sign", "poster shadow"],
    lesson: "A hero's pose can tell the first page of the story.",
  },
  {
    id: "starter-action-set",
    name: "Starter Action Set",
    category: "bundles",
    description:
      "Group-shot bundle with multiple Dummy 13 heroes, action poses, bright colors, and starter story prompts.",
    price: 79.99,
    status: "bundle idea",
    color: "#151312",
    image: "/images/products/polished/starter-action-set.jpg",
    imageAlt: "Group of colorful Dummy 13 figures including skateboard, blaster, staff, and mini heroes",
    printTime: "multi-print batch",
    ageNote: "Adult review",
    funnel: "bundle",
    characterClass: "Squad",
    motto: "Every hero needs a team.",
    origin:
      "A first collection path for starting the Dummy 13 universe with multiple heroes, sports moves, gear, and story roles.",
    gear: ["pink staff hero", "red skateboard hero", "blue blaster hero", "mint mini hero"],
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
    image: "/images/products/polished/custom-hero.jpg",
    imageAlt: "Colorful Dummy 13 figures arranged as examples for a custom hero request",
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
