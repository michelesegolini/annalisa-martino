export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterImage?: string;
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
}
