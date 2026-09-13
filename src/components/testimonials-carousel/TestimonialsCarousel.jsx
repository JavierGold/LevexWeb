import { useState } from 'react'
import './testimonials-carousel.css'

export default function TestimonialsCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    )
  }

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % testimonials.length)
  }

  return (
    <div className="testimonials-carousel">
      <div
        className="testimonials-carousel__viewport"
        aria-live="polite"
        aria-atomic="true"
      >
        <article
          className="testimonials-carousel__slide"
          key={`testimonial-${activeIndex}`}
        >
          <span className="testimonials-carousel__quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{activeTestimonial.quote}</blockquote>
          <footer>
            <strong>{activeTestimonial.author}</strong>
            <span>{activeTestimonial.role}</span>
          </footer>
        </article>
      </div>

      <div className="testimonials-carousel__navigation">
        <div
          className="testimonials-carousel__indicators"
          role="group"
          aria-label="Seleccionar opinión"
        >
          {testimonials.map((testimonial, index) => (
            <button
              className="testimonials-carousel__indicator"
              type="button"
              key={`${testimonial.author}-${index}`}
              aria-label={`Mostrar opinión ${index + 1} de ${testimonials.length}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div className="testimonials-carousel__controls">
          <button type="button" aria-label="Opinión anterior" onClick={showPrevious}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <span aria-hidden="true">
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(testimonials.length).padStart(2, '0')}
          </span>
          <button type="button" aria-label="Opinión siguiente" onClick={showNext}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
