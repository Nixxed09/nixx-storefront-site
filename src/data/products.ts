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
  detailImage?: string;
  detailImageAlt?: string;
  printTime: string;
  ageNote: string;
  funnel: ProductFunnel;
  characterClass: string;
  motto: string;
  origin: string;
  gear: string[];
  lesson: string;
  tags: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "angel-of-peace",
    name: "Angel of Peace",
    category: "figures",
    description:
      "A winged guardian figure inspired by protection, kindness, and Phoenix's hero stories.",
    price: 29.99,
    status: "guardian figure",
    color: "#26a69a",
    image: "/images/products/polished/angel-of-peace.jpg",
    imageAlt: "Mint and white winged Dummy 13 guardian figure with a peace-sign pose",
    printTime: "multi-part print",
    ageNote: "Ages 6+",
    funnel: "gift",
    characterClass: "Guardian",
    motto: "Protect the light. Keep the peace.",
    origin:
      "A calm winged hero who steps in when a team needs courage, protection, and a little light.",
    gear: ["wing armor", "light shield", "mint energy core"],
    lesson: "Real strength means protecting people without losing kindness.",
    tags: ["guardian", "wings", "display", "gift"],
    featured: true,
  },
  {
    id: "disc-dasher",
    name: "Football Pro",
    category: "figures",
    description:
      "An orange sports figure posed with a flying disc, made for action scenes and fast-moving stories.",
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
      "A high-jump hero who turns every throw into a chance to show focus, timing, and confidence.",
    gear: ["flying disc", "orange speed joints", "jump stance"],
    lesson: "Practice and timing turn a hard catch into a highlight.",
    tags: ["sports", "flying disc", "action pose", "starter"],
  },
  {
    id: "battle-brawler",
    name: "Battle Brawler",
    category: "figures",
    description:
      "A blue blaster figure made for mission scenes, boss fights, and high-energy display poses.",
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
      "A mission-ready fighter who steps forward when the team needs cover and steady aim.",
    gear: ["blue blaster", "back blade", "battle stance"],
    lesson: "Courage means staying steady when the mission gets loud.",
    tags: ["blaster", "mission", "battle", "starter"],
  },
  {
    id: "skate-spark",
    name: "Skate Spark",
    category: "figures",
    description:
      "A red skateboard figure made for motion, balance, and street-style stories.",
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
      "A street rider who finds new routes, keeps moving, and stays balanced when things get chaotic.",
    gear: ["red skateboard", "street stance", "quick-turn joints"],
    lesson: "Balance matters most when everything around you is moving.",
    tags: ["skateboard", "street", "motion", "starter"],
  },
  {
    id: "builders-tool-pack",
    name: "Hero Gear Pack",
    category: "accessories",
    description:
      "Extra weapons, tools, helmets, and parts that help a Dummy 13 figure take on a new role.",
    price: 6,
    status: "accessory set",
    color: "#a8552b",
    image: "/images/products/polished/hero-gear-pack.jpg",
    imageAlt: "White and tan Dummy 13 figure loaded with blasters, blades, and display gear",
    printTime: "quick batch",
    ageNote: "Small parts",
    funnel: "game",
    characterClass: "Arsenal Hero",
    motto: "New gear, new mission.",
    origin:
      "A white-and-tan hero loaded with blasters, blades, and display gear to show how accessories can change a character.",
    gear: ["tan blaster", "back blades", "leg holsters", "display stand"],
    lesson: "The right gear helps a hero step into a bigger mission.",
    tags: ["gear", "accessories", "tools", "game prop"],
  },
  {
    id: "winged-guardian-poster",
    name: "Winged Guardian Display Pose",
    category: "figures",
    description:
      "A display version of the mint winged guardian with wide wings and a bold shelf-ready pose.",
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
      "A display-focused version of the Angel of Peace, posed like the cover of a hero story.",
    gear: ["wide wings", "mint joints", "peace sign", "poster shadow"],
    lesson: "A hero's pose can tell the first page of the story.",
    tags: ["guardian", "wings", "display", "story"],
  },
  {
    id: "starter-action-set",
    name: "Starter Action Set",
    category: "bundles",
    description:
      "A gift set with multiple Dummy 13 figures, bright colors, action poses, and starter story ideas.",
    price: 79.99,
    status: "starter bundle",
    color: "#151312",
    image: "/images/products/polished/starter-action-set.jpg",
    imageAlt: "Group of colorful Dummy 13 figures including skateboard, blaster, staff, and mini heroes",
    detailImage: "/images/products/polished/starter-action-set-full.jpg",
    detailImageAlt:
      "Full Starter Action Set showing multiple Dummy 13 heroes, gear, and action poses together",
    printTime: "multi-print batch",
    ageNote: "Adult review",
    funnel: "bundle",
    characterClass: "Squad",
    motto: "Every hero needs a team.",
    origin:
      "A first collection for starting a Dummy 13 world with heroes, sports moves, gear, and story roles.",
    gear: ["pink staff hero", "red skateboard hero", "blue blaster hero", "mint mini hero"],
    lesson: "Teams work best when every character brings a different strength.",
    tags: ["bundle", "gift set", "team", "starter"],
    featured: true,
  },
  {
    id: "custom-hero",
    name: "Custom Hero Request",
    category: "custom",
    description:
      "Request custom colors, accessories, a motto, or a character idea for Phoenix to review.",
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
      "A way to turn custom colors, accessories, a motto, or a character idea into a reviewed print request.",
    gear: ["custom colors", "chosen accessories", "optional motto"],
    lesson: "The best ideas get stronger when they are shaped, tested, and simplified.",
    tags: ["custom", "colors", "accessories", "request"],
    featured: true,
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
