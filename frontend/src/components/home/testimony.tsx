import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Testimonial {
  name: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Kate Kimaru",
    quote:
      "I enjoyed my stay at Meg's Pristine – Eldoret. A wonderful & clean compound with great African food and welcoming staff.",
    image: "/users/f1.jpg",
  },
  {
    name: "Morgan Mbuvi",
    quote:
      "Felt at home… Peter made sure I had a comfortable stay, the meals were great and I enjoyed the time I spent there.",
    image: "/users/m1.jpg",
  },
  {
    name: "Wycliff Cheruiyot",
    quote:
      "Apartment was very clean, good service... Belinda is a gem. Looking forward for another stay anytime I'm in Eldoret.",
    image: "/users/m2.jpg",
  },
  {
    name: "John M. Mwangi",
    quote:
      "I rented a car for a business trip from Eldoret… booking was simple, car pristine. Highly recommended!",
    image: "/users/m3.jpg",
  },
  {
    name: "Giovani K. Omondi",
    quote:
      "As a frequent traveler, I value reliability. With www.riderentals.co, I always get a car on time… top‑notch service.",
    image: "/users/m4.jpg",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    AOS.init({ duration: 400, once: true });
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 2) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials: Testimonial[] = [
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % testimonials.length],
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2
          className="text-4xl font-bold text-gray-800 mb-12"
          data-aos="fade-down"
        >
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="bg-gray-50 rounded-2xl shadow-lg p-8 flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <img
                src={testimonial.image}
                alt={`Photo of ${testimonial.name}`}
                className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-100 object-cover"
              />
              <p className="text-gray-600 italic text-center mb-4">
                "{testimonial.quote}"
              </p>
              <p className="mt-auto font-semibold text-indigo-600">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div
          className="mt-10 flex justify-center space-x-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {testimonials.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                index === activeIndex ? "bg-indigo-600 scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
