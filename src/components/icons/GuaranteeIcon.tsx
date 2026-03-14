export const GuaranteeIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield background - light side */}
    <path
      d="M256 50 L100 150 L100 300 Q100 450 256 480 Q412 450 412 300 L412 150 Z"
      fill="#E8F5F0"
    />

    {/* Shield background - dark side (right) */}
    <path d="M256 50 L256 480 Q412 450 412 300 L412 150 Z" fill="#1ABC9C" />

    {/* Shield background - light side (left) */}
    <path d="M256 50 L100 150 L100 300 Q100 450 256 480 Z" fill="#2ECC71" />

    {/* Inner circle - light background */}
    <circle cx="256" cy="280" r="90" fill="white" />

    {/* Inner circle - light side */}
    <circle cx="256" cy="280" r="90" fill="white" />

    {/* Inner circle - dark side */}
    <path d="M256 190 A90 90 0 0 1 256 370 L256 190 Z" fill="#E8F5F0" />

    {/* Checkmark path - light color */}
    <path
      d="M 220 280 L 240 305 L 295 245"
      stroke="#7CA8C4"
      strokeWidth="20"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Border highlight */}
    <path
      d="M256 50 L100 150 L100 300 Q100 450 256 480 Q412 450 412 300 L412 150 Z"
      stroke="white"
      strokeWidth="8"
      fill="none"
      opacity="0.3"
    />
  </svg>
);
