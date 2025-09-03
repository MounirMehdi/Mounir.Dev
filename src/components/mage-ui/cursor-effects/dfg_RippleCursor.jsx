import React, { useReducer, useEffect, useRef } from 'react';

const rippleReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-20); // max 20 ripple pour la perf
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    case 'UPDATE_RIPPLE':
      return state.map((ripple) =>
        ripple.id === action.payload.id ? action.payload : ripple
      );
    default:
      return state;
  }
};

const RippleCursor = ({
  maxSize = 50,
  duration = 1000,
  blur = true,
  color = 'var(--color-teal-600)',
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    let lastCallTime = 0;
    const throttleInterval = 16; // ~60 fps

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastCallTime < throttleInterval) return;
      lastCallTime = now;

      const id = `${now}-${Math.random()}`;
      const ripple = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: 0,
        opacity: 1,
      };

      dispatch({ type: 'ADD_RIPPLE', payload: ripple });

      let startTime = null;
      const animateRipple = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          const updatedRipple = {
            ...ripple,
            size: maxSize * progress,
            opacity: 1 - progress,
          };
          dispatch({ type: 'UPDATE_RIPPLE', payload: updatedRipple });
          animationFrameRef.current = requestAnimationFrame(animateRipple);
        } else {
          dispatch({ type: 'REMOVE_RIPPLE', payload: id });
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateRipple);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, maxSize]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-[9999]">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: color,
            boxShadow: blur
              ? '0 0 10px rgba(0,150,255,0.7), 0 0 20px rgba(0,150,255,0.4)'
              : 'none',
            filter: blur ? 'blur(4px)' : 'none',
            opacity: ripple.opacity,
            willChange: 'width, height, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;
