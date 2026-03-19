import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

// --- Component Interfaces ---
export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; text: string; }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  /** How many cards to show behind the main card */
  visibleBehind?: number;
}

// --- The Component ---
export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
    cardRefs.current[activeIndex]?.classList.add('is-dragging');
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    cardRefs.current[activeIndex]?.classList.remove('is-dragging');
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);
  
  if (!testimonials?.length) return null;

  return (
    <section className="testimonials-stack relative pb-10">
      {testimonials.map((testimonial, index) => {
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        const style: CSSProperties = {};
        if (displayOrder === 0) {
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) {
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -2 * displayOrder;
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.2 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else {
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClasses = (type: 'featured' | 'default') => type === 'featured' 
          ? 'bg-[#0369a1]/20 text-[#0369a1] border border-[#0369a1]/30' 
          : 'bg-white/5 text-[#f4ebd0]/60';
          
        return (
          <div
            ref={el => { cardRefs.current[index] = el; }}
            key={testimonial.id}
            className="testimonial-card glass-effect backdrop-blur-xl"
            style={style}
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-semibold text-base" style={{ background: testimonial.avatarGradient }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="text-[#f4ebd0] font-medium text-lg">{testimonial.name}</h3>
                    <p className="text-sm text-[#f4ebd0]/40 mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-[#f4ebd0]/80 leading-relaxed text-lg mb-6">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-4 gap-4">
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={`text-xs px-2 py-1 rounded-md ${tagClasses(tag.type)}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-[#f4ebd0]/40">
                  {testimonial.stats.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <span key={i} className="flex items-center">
                        <IconComponent className="mr-1.5 h-3.5 w-3.5" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="pagination flex gap-2 justify-center absolute bottom-0 left-0 right-0">
        {testimonials.map((_, index) => (
          <button key={index} aria-label={`Go to testimonial ${index + 1}`} onClick={() => navigate(index)} className={`pagination-dot ${activeIndex === index ? 'active' : ''}`} />
        ))}
      </div>
    </section>
  );
};
