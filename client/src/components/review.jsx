import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import './ReviewCarousel.css';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Verified Buyer",
    image: "https://i.pravatar.cc/150?u=1",
    text: "The interface is incredibly intuitive. I was able to set up my entire workflow in under ten minutes. Highly recommended!",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?u=2",
    text: "The speed of response is unlike anything I've used before. It has completely optimized our sprint cycles.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=3",
    text: "Beautifully designed and functionally robust. It really helped our team bridge the gap between design and code.",
  }
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Memoized next slide function so it can be reused safely
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-play Logic
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // 4000ms = 4 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [nextSlide, isPaused]);

  return (
    
    <div className="carousel-root">
      <h1 
  className="contact-title text-3xl font-bold mg" 
  style={{ textAlign: 'center', width: '100%', marginBottom: '40px' }}
>
  Your <span className="highlight">Testimonials</span>
</h1>
      <div 
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}  // Stop auto-play when mouse enters
        onMouseLeave={() => setIsPaused(false)} // Resume auto-play when mouse leaves
      >
        <button onClick={prevSlide} className="nav-arrow left">
          <ChevronLeft size={24} />
        </button>
        
        <button onClick={nextSlide} className="nav-arrow right">
          <ChevronRight size={24} />
        </button>

        <div className="carousel-window">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="carousel-slide">
                <div className="review-glass-card">
                  <Quote className="quote-icon" size={40} />
                  <p className="review-body">"{review.text}"</p>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <div className="user-meta">
                    <img src={review.image} alt={review.name} className="user-avatar" />
                    <div className="user-details">
                      <h4 className="user-name">{review.name}</h4>
                      <p className="user-role">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dots-container">
        {reviews.map((_, i) => (
          <div 
            key={i} 
            className={`dot ${currentIndex === i ? 'active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;