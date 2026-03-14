export const BiometricIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Corner brackets */}
    {/* Top Left */}
    <path
      d="M40 40 L100 40 M40 40 L40 100"
      stroke={color}
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    {/* Top Right */}
    <path
      d="M472 40 L412 40 M472 40 L472 100"
      stroke={color}
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    {/* Bottom Left */}
    <path
      d="M40 472 L100 472 M40 472 L40 412"
      stroke={color}
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />
    {/* Bottom Right */}
    <path
      d="M472 472 L412 472 M472 472 L472 412"
      stroke={color}
      strokeWidth="20"
      strokeLinecap="round"
      fill="none"
    />

    {/* Head (circle) */}
    <circle cx="256" cy="200" r="80" fill="#D4A5A0" opacity="0.9" />

    {/* Hair */}
    <ellipse cx="256" cy="140" rx="85" ry="70" fill="#9A8FA0" />

    {/* Eyes line */}
    <line
      x1="60"
      y1="200"
      x2="452"
      y2="200"
      stroke="#F56C6C"
      strokeWidth="24"
      strokeLinecap="round"
    />

    {/* Smile */}
    <path
      d="M200 250 Q256 290 312 250"
      stroke="#D4A5A0"
      strokeWidth="30"
      fill="none"
      strokeLinecap="round"
    />

    {/* Neck */}
    <rect x="230" y="280" width="52" height="40" fill="#D4A5A0" />

    {/* Shoulders/Chest */}
    <path
      d="M120 320 Q256 380 392 320 L380 420 Q256 450 132 420 Z"
      fill="#5B8FDE"
    />
  </svg>
);
