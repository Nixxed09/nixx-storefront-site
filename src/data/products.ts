export type ProductCategory = "figures" | "accessories" | "custom";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  status: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "hero-snap",
    name: "Snap-Fit Hero",
    category: "figures",
    description:
      "Articulated starter figure with color-batch parts and a display-ready stance.",
    price: 10,
    status: "starter drop",
    color: "#f15a24",
  },
  {
    id: "shadow-squad",
    name: "Shadow Squad Figure",
    category: "figures",
    description: "A darker squad variant for building teams, battles, and shelf scenes.",
    price: 10,
    status: "planned batch",
    color: "#4056f4",
  },
  {
    id: "desk-dragon",
    name: "Desk Dragon",
    category: "accessories",
    description: "Small flex-style creature for backpacks, desks, and gift boxes.",
    price: 8,
    status: "prototype",
    color: "#26a69a",
  },
  {
    id: "game-token-pack",
    name: "Game Token Pack",
    category: "accessories",
    description: "Printed counters, markers, and tiny props for tabletop games.",
    price: 6,
    status: "ready idea",
    color: "#a8552b",
  },
  {
    id: "custom-mini",
    name: "Custom Mini Print",
    category: "custom",
    description:
      "Small custom print request reviewed for size, color, and printability.",
    price: 12,
    status: "inquiry only",
    color: "#ffd166",
  },
  {
    id: "color-drop",
    name: "Mystery Color Drop",
    category: "figures",
    description:
      "Limited color combination selected from filament currently on the printer.",
    price: 10,
    status: "limited",
    color: "#151312",
  },
];

