// components/gallery/gallery.constants.ts

export type GalleryCategory = "All" | "Dishes" | "Ambiance" | "Drinks" | "Events";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All", "Dishes", "Ambiance", "Drinks", "Events",
];

export interface GalleryItem {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
  size: "large" | "tall" | "normal";
  type: "image" | "video";
  // For videos: thumbnail shown before playback (optional but recommended)
  poster?: string;
}

export const GALLERY_IMAGES: GalleryItem[] = [
  // ── IMAGES ──
  { type: "image", src: "/images/1.jpg", alt: "Signature Main Course",  category: "Dishes",   size: "large"  },
  { type: "image", src: "/images/2.jpg", alt: "Restaurant Interior",    category: "Ambiance", size: "tall"   },
  { type: "image", src: "/images/3.jpg", alt: "Chef's Special",         category: "Dishes",   size: "normal" },
  { type: "image", src: "/images/4.jpg", alt: "Signature Cocktail",     category: "Drinks",   size: "normal" },
  { type: "image", src: "/images/5.jpg", alt: "Dessert Platter",        category: "Dishes",   size: "normal" },
  { type: "image", src: "/images/6.jpg", alt: "Evening Atmosphere",     category: "Ambiance", size: "large"  },

  // ── VIDEOS — put .mp4 files in public/videos/gallery/ ──
  { type: "video", src: "/videos/restaurant_happy_day_3.mp4",     alt: "Chef in Action",        category: "Dishes",   size: "normal" },
  { type: "video", src: "/videos/restaurant_happy_day_4.mp4",alt: "Restaurant Atmosphere", category: "Ambiance", size: "normal"  },
  { type: "video", src: "/videos/restaurant_happy_day_5.mp4",  alt: "Cocktail Preparation",  category: "Drinks",   size: "normal"},

  // ── MORE IMAGES ──
  { type: "image", src: "/images/7.jpg",    alt: "Wine Selection",       category: "Drinks",   size: "normal" },
  { type: "image", src: "/images/8.jpg",    alt: "Private Dining Event", category: "Events",   size: "tall"   },
  { type: "image", src: "/images/9.jpg",     alt: "Seafood Delicacy",     category: "Dishes",   size: "normal" },
  { type: "image", src: "/images/10.jpg", alt: "Terrace Seating",      category: "Ambiance", size: "normal" },
  { type: "image", src: "/images/11.jpg",     alt: "Grilled Specialties",  category: "Dishes",   size: "large"  },
  { type: "image", src: "/images/12.jpg",    alt: "Wedding Celebration",  category: "Events",   size: "normal" },
];