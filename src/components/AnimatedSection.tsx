'use client'

import { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0 
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
          : animation === 'fade-in-up' 
            ? 'opacity-0 translate-y-8' 
            : animation === 'fade-in-left'
            ? 'opacity-0 -translate-x-8'
            : animation === 'fade-in-right'
            ? 'opacity-0 translate-x-8'
            : animation === 'scale-in'
            ? 'opacity-0 scale-95'
            : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}