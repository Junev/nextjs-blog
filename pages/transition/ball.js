import { useEffect, useRef } from "react";
import styles from "./ball.module.scss";

const Ball = () => {
  const ballRef = useRef();
  // useEffect(() => {
  //   const moveball = (e) => {
  //     ballRef.current.style.transform = `translateY(${e.clientY - 10}px)`;
  //     ballRef.current.style.transform += `translateX(${e.clientX - 10}px)`;
  //   };
  //   document.addEventListener("click", moveball, { passive: true });
  //   return () => {
  //     document.removeEventListener("click", moveball);
  //   };
  // });

  useEffect(() => {
    const animate = () => {
      let start;
      const step = (timestamp) => {
        if (start === undefined) {
          start = timestamp;
        }
        const elapsed = timestamp - start;
        ballRef.current.style.transform = `translateX(${Math.min(
          0.1 * elapsed,
          200
        )}px)`;
        console.log(elapsed, Math.min(0.1 * elapsed, 200));
        if (elapsed < 2000) {
          requestAnimationFrame(step);
        } else {
          start = undefined;
        }
      };
      requestAnimationFrame(step);
    };
    document.addEventListener("click", animate, { passive: true });
    return () => {
      document.removeEventListener("click", animate);
    };
  });

  return (
    <>
      <p>Click anywhere to move the ball</p>
      <div ref={ballRef} className={styles.ball}></div>
    </>
  );
};

Ball.propTypes = {};

export default Ball;
