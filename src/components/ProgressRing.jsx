import React, { useMemo } from "react";

/**
 * ProgressRing
 * Props:
 *  - radius (number): radius of the circle (default 48)
 *  - stroke (number): stroke width (default 8)
 *  - progress (0..1): fraction complete (0 empty, 1 full)
 *  - size (number): svg viewbox size (optional, computed)
 *  - className: optional tailwind classes
 *  - ariaLabel: accessible label
 */
const ProgressRing = ({
  radius = 48,
  stroke = 8,
  progress = 0,
  className = "",
  ariaLabel = "Progress ring",
}) => {
  const normalizedRadius = radius - stroke / 2; // so stroke sits inside
  const circumference = useMemo(
    () => 2 * Math.PI * normalizedRadius,
    [normalizedRadius]
  );

  // clamp progress
  const clamped = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = circumference * (1 - clamped);

  const size = radius * 2;

  return (
    <svg
      height={size}
      width={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      {/* background circle */}
      <circle
        stroke="rgba(255,255,255,0.08)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* progress circle */}
      <circle
        stroke="currentColor" // inherits color, convenient with Tailwind
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: "stroke-dashoffset 0.6s linear, color 0.2s",
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
        }}
      />
    </svg>
  );
};

export default ProgressRing;
