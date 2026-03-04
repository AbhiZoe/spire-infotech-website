import React, { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "CTO",
    company: "TechVision Solutions",
    content:
      "Spire Infotech delivered an exceptional ERP system that transformed our operations. Their team's expertise and dedication exceeded our expectations. The project was completed on time and within budget.",
    rating: 5,
    initials: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Operations Director",
    company: "GlobalTrade Exports",
    content:
      "The custom software solution developed by Spire Infotech streamlined our export documentation process by 60%. Their support team is always responsive and helpful. Highly recommend their services.",
    rating: 5,
    initials: "PS",
  },
  {
    id: 3,
    name: "Anil Mehta",
    role: "CEO",
    company: "RetailMax India",
    content:
      "Working with Spire Infotech on our e-commerce platform was a fantastic experience. They understood our vision and built exactly what we needed. Our online sales have grown by 40% since launch.",
    rating: 5,
    initials: "AM",
  },
  {
    id: 4,
    name: "Sunita Patel",
    role: "IT Manager",
    company: "HealthFirst Clinics",
    content:
      "Spire Infotech developed a robust hospital management system for our clinic chain. The system handles appointments, billing, and medical records seamlessly. Their team provided excellent training and support.",
    rating: 5,
    initials: "SP",
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-widest mb-3">
            Client Stories
          </span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto text-gray-600">
            Don&apos;t just take our word for it — hear from the businesses
            we&apos;ve helped grow.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="card max-w-3xl mx-auto p-8 md:p-12">
            <StarRating rating={testimonial.rating} />
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {testimonial.initials}
              </div>
              <div>
                <p className="font-semibold text-secondary-800">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? "bg-primary-500 w-6"
                      : "bg-gray-300 hover:bg-primary-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
