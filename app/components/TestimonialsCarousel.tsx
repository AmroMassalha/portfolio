import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "Minute Media",
    text: "Amro saved us $500k annually with his infrastructure optimizations. His ability to see the big picture while diving deep into technical details is remarkable. Best DevOps hire we've ever made!",
    rating: 5
  },
  {
    id: 2,
    name: "David Miller",
    role: "Engineering Manager",
    company: "Beamr",
    text: "His Slack bot transformed our deployment process from a dreaded chore to something the team actually enjoys. Amro brings both technical excellence and joy to DevOps.",
    rating: 5
  },
  {
    id: 3,
    name: "Rachel Green",
    role: "VP Engineering",
    company: "Previous Startup",
    text: "Amro doesn't just solve problems - he prevents them. His proactive approach to infrastructure saved us countless hours of downtime and stress. Plus, his avocado gifts are amazing! 🥑",
    rating: 5
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    role: "Senior Developer",
    company: "BMC Software",
    text: "I learned more about DevOps best practices from Amro in 6 months than in my previous 3 years. He's a natural teacher who makes complex concepts accessible.",
    rating: 5
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Product Manager",
    company: "Beamr",
    text: "Finally, a DevOps engineer who speaks 'business'! Amro always connects technical decisions to business outcomes. Our 70% cost reduction speaks for itself.",
    rating: 5
  }
];

interface TestimonialsCarouselProps {
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black/60 backdrop-blur-md border border-blue-500/30 rounded-lg p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Quote icon */}
        <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-500/20" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            {/* Testimonial text */}
            <p className="text-lg text-gray-300 text-center mb-6 italic leading-relaxed">
              "{currentTestimonial.text}"
            </p>
            
            {/* Author info */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="font-semibold text-white">{currentTestimonial.name}</p>
                <p className="text-sm text-gray-400">
                  {currentTestimonial.role} @ {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-blue-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;