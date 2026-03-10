// components/menu/menu.types.ts

export type MealCategory =
  | "All"
  | "Starters"
  | "Main Course"
  | "Seafood"
  | "Desserts"
  | "Drinks";

export type DietaryTag = "Spicy" | "Vegan" | "Gluten-Free";

export interface Meal {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<MealCategory, "All">;
  image: string;           // Cloudinary URL
  tags: DietaryTag[];
  isVisible: boolean;
  isPromotion: boolean;
  promotionPrice?: number; // discounted price
}

export const MEAL_CATEGORIES: MealCategory[] = [
  "All",
  "Starters",
  "Main Course",
  "Seafood",
  "Desserts",
  "Drinks",
];

export const TAG_STYLES: Record<DietaryTag, { label: string; color: string; bg: string }> = {
  "Spicy":       { label: "🌶 Spicy",       color: "#ff6b6b", bg: "rgba(255,107,107,0.12)" },
  "Vegan":       { label: "🌿 Vegan",       color: "#6bcb77", bg: "rgba(107,203,119,0.12)" },
  "Gluten-Free": { label: "🌾 Gluten-Free", color: "#ffd93d", bg: "rgba(255,217,61,0.12)"  },
};