import { SVGProps } from "react";

interface SpeedometerIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const SpeedometerIcon = ({
  size = 40,
  color = "#1ABC9C",
  ...props
}: SpeedometerIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="50%" stopColor="#0096C7" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
      </defs>

      {/* Outer dial segments */}
      <g id="dial-segments">
        {/* Top segment */}
        <path d="M 20 3 L 24 6 L 16 6 Z" fill="#00D9FF" opacity="0.8" />
        {/* Top right segments */}
        <path d="M 28 8 L 31 14 L 25 10 Z" fill="#0096C7" opacity="0.6" />
        <path d="M 34 16 L 35 22 L 30 18 Z" fill="#00B4D8" opacity="0.7" />
        {/* Right segments */}
        <path d="M 32 28 L 30 34 L 28 29 Z" fill="#0077B6" opacity="0.7" />
        <path d="M 24 35 L 22 36 L 22 30 Z" fill="#00B4D8" opacity="0.6" />
        {/* Left side mirror */}
        <path d="M 12 6 L 9 8 L 15 10 Z" fill="#0096C7" opacity="0.6" />
        <path d="M 6 16 L 5 22 L 10 18 Z" fill="#00B4D8" opacity="0.7" />
      </g>

      {/* Main speedometer dial */}
      <circle cx="20" cy="18" r="13" fill="url(#speedGradient)" opacity="0.3" />
      <circle
        cx="20"
        cy="18"
        r="13"
        fill="none"
        stroke="url(#speedGradient)"
        strokeWidth="2"
      />

      {/* Inner white circle */}
      <circle cx="20" cy="18" r="8" fill="white" />

      {/* Center circle with gradient */}
      <defs>
        <radialGradient id="centerGradient">
          <stop offset="0%" stopColor="#A64253" />
          <stop offset="100%" stopColor="#3D2C2C" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="18" r="3" fill="url(#centerGradient)" />

      {/* Speedometer needle */}
      <line
        x1="20"
        y1="18"
        x2="28"
        y2="10"
        stroke="#1A1A2E"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Needle decoration circle */}
      <circle cx="20" cy="18" r="2.5" fill="#1A1A2E" />

      {/* Speed indicator bar at bottom */}
      <rect x="14" y="33" width="12" height="2.5" fill="#1A1A2E" rx="1" />
      <rect x="14" y="33" width="5" height="2.5" fill="#0077B6" rx="1" />
    </svg>
  );
};
