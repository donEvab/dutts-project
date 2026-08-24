export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  materials: string[];
  moq: string;
  image: string;
  badge: string;
}

export interface ShowcaseSpecs {
  material: string;
  technique: string;
  quantity: string;
  leadTime: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  description: string;
  technique: string;
  fabric: string;
  year: string;
  tag?: string;
  specs?: ShowcaseSpecs;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
  verified: boolean;
}

export interface ContactInfo {
  website: string;
  instagram: string;
  instagramUrl?: string;
  email: string;
  phone: string;
  whatsappUrl: string;
  address: string;
  businessHours?: string;
}
