export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Kept for backward compatibility
  videoUrls?: string[]; // For sequential playback
  posterImage?: string;
  images?: string[];
  category: string;
  collection: string;
  price?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  itemReference?: string;
  price?: string;
  subject?: string;
}
