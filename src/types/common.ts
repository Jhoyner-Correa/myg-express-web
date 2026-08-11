import type { LucideIcon } from "lucide-react";

export interface Branch {
  id: number;
  name: string;
  region: string;
  address: string;
  phone: string;
  hours: string;
  image: string;
  coords: { lat: number; lng: number };
}

export interface Service {
  icon: string;
  name: string;
  description: string;
}

export interface WhyUsItem {
  icon: string;
  stat: string;
  label: string;
  description: string;
}

export interface ProcessStep {
  icon: string;
  label: string;
  description: string;
}

export interface Testimonial {
  initials: string;
  name: string;
  city: string;
  text: string;
}

export interface IconMap {
  [key: string]: LucideIcon;
}
