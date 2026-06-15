import React, { useEffect, useState, useRef } from "react";

function Counter({ target, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section becomes visible
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let current = 0;

    const increment = target / 100;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <h2 ref={counterRef}>
      {count}
      {suffix}
    </h2>
  );
}

export default Counter;