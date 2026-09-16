import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * Observes a DOM element and returns [ref, isRevealed] state
 * to trigger performant GPU-accelerated entrance animations.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Percentage of element visibility required
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Margins around the root
 * @param {boolean} [options.once=true] - Whether to reveal once or toggle on enter/exit
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return [ref, isRevealed];
}

export default useScrollReveal;
