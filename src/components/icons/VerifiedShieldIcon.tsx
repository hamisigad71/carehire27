import { SVGProps } from "react";

interface VerifiedShieldIconProps extends SVGProps<SVGSVGElement> {
  size?: string | number;
}

export const VerifiedShieldIcon = ({
  size = 40,
  color = "#10B981",
  ...props
}: VerifiedShieldIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Shield shape */}
      <path
        d="M20 4L8 10V18C8 27 20 34 20 34C20 34 32 27 32 18V10L20 4Z"
        fill={`${color}15`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Checkmark inside shield */}
      <g>
        {/* Vertical line of checkmark */}
        <line
          x1="17"
          y1="18"
          x2="17"
          y2="22"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Horizontal line of checkmark */}
        <line
          x1="17"
          y1="22"
          x2="24"
          y2="15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Verification circle around checkmark */}
      <circle
        cx="20"
        cy="19"
        r="7.5"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
};
