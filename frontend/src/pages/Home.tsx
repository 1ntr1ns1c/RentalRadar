import { useState, useEffect } from "react";
import * as api from "../lib/api";
import FeaturedProperties from "../components/home/featured_property";
import FeaturesSection from "../components/home/features";
import HeroSection from "../components/home/hero";
import Stats from "../components/home/stats";
import CTASection from "../components/home/cta_section";
import TestimonialsSection from "../components/home/testimony";
import type { PropertyInterface } from "../interface/property";

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<PropertyInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await api.getProperties();
        const available = response.data
          .filter((p: PropertyInterface) => p.is_available)
          .slice(0, 6);
        setFeaturedProperties(available);
      } catch (err) {
        setError("Failed to load featured properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <Stats />
      <FeaturesSection />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">Handpicked properties you'll love</p>
            </div>
            <a
              href="/properties"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </a>
          </div>
          <FeaturedProperties
            loading={loading}
            error={error}
            properties={featuredProperties}
          />
        </div>
      </section>
      <CTASection />
      <TestimonialsSection />
    </div>
  );
}
