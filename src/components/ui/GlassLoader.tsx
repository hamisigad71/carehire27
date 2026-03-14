"use client";

import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const styles = `
  @keyframes spinRing {
    to { transform: rotate(360deg); }
  }
  @keyframes cardPulse {
    0%,100% {
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.18),
        inset 0 -1px 0 rgba(0,0,0,0.08),
        0 0 32px rgba(45,125,45,0.10),
        0 16px 48px rgba(0,0,0,0.15);
    }
    50% {
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.22),
        inset 0 -1px 0 rgba(0,0,0,0.08),
        0 0 64px rgba(45,125,45,0.22),
        0 16px 48px rgba(0,0,0,0.15);
    }
  }
  @keyframes shieldBreathe {
    0%,100% {
      transform: scale(1);
      filter: drop-shadow(0 0 12px rgba(74,158,74,0.5));
    }
    50% {
      transform: scale(1.05);
      filter: drop-shadow(0 0 26px rgba(74,158,74,0.85));
    }
  }
  @keyframes drawTick {
    to { stroke-dashoffset: 0; }
  }
  @keyframes dotPulse {
    0%,100% { background: rgba(74,158,74,0.15); transform: scale(1); }
    50%      { background: rgba(74,158,74,0.8);  transform: scale(1.5); }
  }
  @keyframes progressSweep {
    0%   { width: 0%;    margin-left: 0;    opacity: 1; }
    60%  { width: 100%;  margin-left: 0;    opacity: 1; }
    80%  { width: 0%;    margin-left: 100%; opacity: 0; }
    100% { width: 0%;    margin-left: 0;    opacity: 0; }
  }

  .drv-scene {
    min-height: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 24px;
    position: relative;
    overflow: hidden;
  }

  /* spinning rings */
  .drv-ring-outer {
    position: absolute;
    width: 240px; height: 240px;
    border-radius: 50%;
    border: 1px solid rgba(74,158,74,0.12);
    animation: spinRing 12s linear infinite;
  }
  .drv-ring-outer::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 50%;
    border: 1px solid transparent;
    border-top-color: rgba(74,158,74,0.65);
    border-right-color: rgba(74,158,74,0.25);
    animation: spinRing 3s cubic-bezier(0.5,0,0.5,1) infinite;
  }
  .drv-ring-inner {
    position: absolute;
    width: 188px; height: 188px;
    border-radius: 50%;
    border: 1px dashed rgba(74,158,74,0.1);
    animation: spinRing 20s linear infinite reverse;
  }

  /* glass card */
  .drv-glass-card {
    position: relative;
    width: 160px; height: 160px;
    border-radius: 36px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: cardPulse 3s ease-in-out infinite;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }
  .drv-glass-card::before {
    content: '';
    position: absolute;
    top: 10px; left: 10px;
    width: 56px; height: 22px;
    background: linear-gradient(135deg, rgba(255,255,255,0.22), transparent);
    border-radius: 20px;
    transform: rotate(-18deg);
    pointer-events: none;
  }
  .drv-glass-card::after {
    content: '';
    position: absolute;
    bottom: 14px; right: 14px;
    width: 40px; height: 40px;
    background: radial-gradient(circle, rgba(74,158,74,0.12), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  /* shield */
  .drv-shield-svg {
    width: 80px; height: 88px;
    filter: drop-shadow(0 0 12px rgba(74,158,74,0.5));
    animation: shieldBreathe 3s ease-in-out infinite;
  }
  .drv-tick {
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    animation: drawTick 0.8s 1s cubic-bezier(0.4,0,0.2,1) forwards;
  }

  /* dots */
  .drv-dots {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
  }
  .drv-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(74,158,74,0.2);
    animation: dotPulse 1.4s ease-in-out infinite;
  }
  .drv-dot:nth-child(1) { animation-delay: 0.00s; }
  .drv-dot:nth-child(2) { animation-delay: 0.18s; }
  .drv-dot:nth-child(3) { animation-delay: 0.36s; }
  .drv-dot:nth-child(4) { animation-delay: 0.54s; }
  .drv-dot:nth-child(5) { animation-delay: 0.72s; }

  /* progress bar */
  .drv-progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #2d7d2d, #4a9e4a, #72b872);
    animation: progressSweep 2.4s cubic-bezier(0.4,0,0.2,1) infinite;
  }

  /* corner brackets */
  .drv-corner {
    position: absolute;
    width: 20px; height: 20px;
    border-color: rgba(74,158,74,0.2);
    border-style: solid;
  }
  .drv-corner-tl { top: 22px; left: 22px;   border-width: 1px 0 0 1px; border-radius: 5px 0 0 0; }
  .drv-corner-tr { top: 22px; right: 22px;  border-width: 1px 1px 0 0; border-radius: 0 5px 0 0; }
  .drv-corner-bl { bottom: 22px; left: 22px;  border-width: 0 0 1px 1px; border-radius: 0 0 0 5px; }
  .drv-corner-br { bottom: 22px; right: 22px; border-width: 0 1px 1px 0; border-radius: 0 0 5px 0; }
`;

const STATUS_MESSAGES = [
  "Verifying credentials",
  "Loading fleet data",
  "Authenticating user",
  "Almost ready",
];

interface GlassLoaderProps {
  /** Text shown below the shield. Cycles automatically if not provided. */
  message?: string;
  /** Show as a fixed full-screen overlay with a blurred dark backdrop */
  fullscreen?: boolean;
}

export function GlassLoader({ message, fullscreen = false }: GlassLoaderProps) {
  const [statusIdx, setStatusIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) return; // use static message if provided
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length);
        setVisible(true);
      }, 320);
    }, 2400);
    return () => clearInterval(id);
  }, [message]);

  const statusText = message ?? STATUS_MESSAGES[statusIdx];

  const loader = (
    <>
      <style>{styles}</style>
      <div className="drv-scene">
        {/* corner brackets */}
        <div className="drv-corner drv-corner-tl" />
        <div className="drv-corner drv-corner-tr" />
        <div className="drv-corner drv-corner-bl" />
        <div className="drv-corner drv-corner-br" />

        {/* logo */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              background: "rgba(45,125,45,0.15)",
              border: "1px solid rgba(74,158,74,0.25)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
            }}
          >
            🚘
          </div>
          <span
            style={{
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(160,180,160,0.85)",
              letterSpacing: "0.04em",
            }}
          >
            Drive<span style={{ color: "rgba(74,158,74,0.85)" }}>KE</span>
          </span>
        </div>

        {/* spinning rings */}
        <div className="drv-ring-outer" />
        <div className="drv-ring-inner" />

        {/* glass card */}
        <div className="drv-glass-card">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Shield SVG */}
            <svg
              className="drv-shield-svg"
              viewBox="0 0 80 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="drv-sg"
                  x1="0"
                  y1="0"
                  x2="80"
                  y2="88"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#52b852" />
                  <stop offset="100%" stopColor="#1e6e1e" />
                </linearGradient>
                <linearGradient
                  id="drv-sh"
                  x1="16"
                  y1="10"
                  x2="48"
                  y2="44"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              {/* shield body */}
              <path
                d="M40 4 L72 16 L72 40 C72 60 56 76 40 84 C24 76 8 60 8 40 L8 16 Z"
                fill="url(#drv-sg)"
                stroke="rgba(74,158,74,0.45)"
                strokeWidth="1"
              />
              {/* inner rim */}
              <path
                d="M40 11 L66 21 L66 40 C66 57 52 71 40 78 C28 71 14 57 14 40 L14 21 Z"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* glass sheen */}
              <path
                d="M40 11 L66 21 L66 40 C66 57 52 71 40 78 C28 71 14 57 14 40 L14 21 Z"
                fill="url(#drv-sh)"
              />
              {/* tick mark — draws itself on mount */}
              <path
                className="drv-tick"
                d="M25 44 L35 54 L56 32"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* wave dots */}
            <div className="drv-dots">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="drv-dot" />
              ))}
            </div>
          </div>
        </div>

        {/* label */}
        <div
          style={{
            position: "absolute",
            bottom: 78,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "rgba(240,245,240,0.9)",
              marginBottom: 4,
            }}
          >
            Securing your session
          </p>
          <p
            style={{
              fontSize: 11,
              fontWeight: 400,
              color: "rgba(200,220,200,0.55)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {statusText}
          </p>
        </div>

        {/* progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(74,158,74,0.1)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div className="drv-progress-fill" />
          </div>
        </div>
      </div>
    </>
  );

  // ── fullscreen overlay mode ──────────────────────────────────────────────
  if (fullscreen) {
    return (
      <Box
        position="fixed"
        inset={0}
        zIndex={9999}
        bg="rgba(0,0,0,0.6)"
        backdropFilter="blur(6px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box w={{ base: "100%", md: "480px" }}>{loader}</Box>
      </Box>
    );
  }

  return <>{loader}</>;
}
