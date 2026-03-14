export const CameraIcon = ({ size = 40, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Camera body */}
    <rect x="30" y="100" width="452" height="320" rx="40" fill="#E8E8E8" />

    {/* Camera top section */}
    <rect x="50" y="60" width="412" height="60" rx="30" fill="#D0D0D0" />

    {/* Camera viewfinder */}
    <rect x="200" y="80" width="112" height="40" rx="20" fill="#5A5A5A" />

    {/* Flash circle (red dot) */}
    <circle cx="70" cy="130" r="20" fill="#FF6B6B" />

    {/* Lens outer ring */}
    <circle cx="256" cy="260" r="110" fill="#6B7280" />

    {/* Lens middle ring */}
    <circle cx="256" cy="260" r="95" fill="#4B5563" />

    {/* Lens blue glass */}
    <circle cx="256" cy="260" r="80" fill="#5B9FFF" />

    {/* Lens shine - white dot top left */}
    <circle cx="225" cy="220" r="18" fill="white" opacity="0.8" />

    {/* Lens shine - small dot top right */}
    <circle cx="275" cy="235" r="12" fill="white" opacity="0.6" />

    {/* Shutter button */}
    <circle cx="430" cy="150" r="22" fill="#5A5A5A" />
    <circle cx="430" cy="150" r="18" fill="#6B7280" />
  </svg>
);
