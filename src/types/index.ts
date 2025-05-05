export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface Solution {
  id: number;
  title: string;
  description: string;
  image: string;
  features: string[];
}