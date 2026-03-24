export interface PropertyInterface {
  id: number;
  title: string;
  description: string;
  city: string;
  neighbourhood: string;
  price: string; // or number, depending on backend
  bedrooms: number;
  bathrooms: number;
  is_available: boolean;
  created_by: number;
  created_at: string; // ISO 8601 date string
  property_type: string;
  images: string[];
}
