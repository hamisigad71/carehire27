export const PaymentIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Wallet top blue section */}
    <path
      d="M40 80 L472 80 L472 200 Q472 220 460 220 L52 220 Q40 220 40 200 Z"
      fill="#2196F3"
    />

    {/* Wallet middle dark stripe */}
    <rect x="40" y="200" width="432" height="80" fill="#5A6B7D" />

    {/* Wallet bottom blue section */}
    <path
      d="M40 280 L472 280 L472 410 Q472 430 460 430 L52 430 Q40 430 40 410 Z"
      fill="#1976D2"
    />

    {/* Card slot indicator */}
    <rect
      x="60"
      y="315"
      width="150"
      height="35"
      rx="8"
      fill="white"
      opacity="0.6"
    />

    {/* Shield background green - left side */}
    <path
      d="M340 150 L260 200 L260 280 Q260 380 340 410 Q420 380 420 280 L420 200 Z"
      fill="#1ABC9C"
    />

    {/* Shield background green - right side (darker) */}
    <path d="M340 150 L340 410 Q420 380 420 280 L420 200 Z" fill="#0D8B76" />

    {/* Shield inner circle white - left */}
    <circle cx="330" cy="280" r="45" fill="white" />

    {/* Shield inner circle light - right side */}
    <path d="M330 235 A45 45 0 0 1 330 325 L330 235 Z" fill="#E8F5F0" />

    {/* Checkmark on shield */}
    <path
      d="M310 280 L325 300 L360 260"
      stroke="#7CA8C4"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
