"use client";

import { useColorMode } from "@chakra-ui/react";

export const useColorTokens = () => {
  const { colorMode: mode } = useColorMode();
  const isDark = mode === "dark";

  return {
    pageBg: isDark ? "#0a0f0d" : "#f4f7f5",
    sidebarBg: isDark ? "#0d1410" : "#ffffff",
    cardBg: isDark ? "#101815" : "#ffffff",
    cardBg2: isDark ? "#152018" : "#f0f5f2",
    border: isDark ? "rgba(0,255,136,0.12)" : "rgba(0,150,80,0.15)",
    accent: isDark ? "#00ff88" : "#00a855",
    accentGlow: isDark ? "rgba(0,255,136,0.15)" : "rgba(0,168,85,0.15)",
    accentSubtle: isDark ? "rgba(0,255,136,0.08)" : "rgba(0,168,85,0.08)",
    textPrimary: isDark ? "#ffffff" : "#0a0f0d",
    textMuted: isDark ? "rgba(255,255,255,0.5)" : "rgba(10,15,13,0.65)",
    textSubtle: isDark ? "rgba(255,255,255,0.35)" : "rgba(10,15,13,0.40)",
    shadow: isDark
      ? "0 0 30px rgba(0,255,136,0.05)"
      : "0 2px 12px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.06)",
    shadowHover: isDark
      ? "0 0 50px rgba(0,255,136,0.1)"
      : "0 8px 32px rgba(0,0,0,0.12)",
    tableHover: isDark ? "rgba(0,255,136,0.04)" : "rgba(0,168,85,0.06)",
    sidebarActive: isDark ? "rgba(0,255,136,0.1)" : "rgba(0,168,85,0.15)",
    danger: isDark ? "#fc8181" : "#e53e3e",
    dangerGlow: isDark ? "rgba(252,129,129,0.15)" : "rgba(229,62,62,0.15)",
    warning: isDark ? "#f6c90e" : "#d69e2e",
    warningGlow: isDark ? "rgba(246,201,14,0.15)" : "rgba(214,158,46,0.15)",
    success: isDark ? "#00ff88" : "#00a855",
    successGlow: isDark ? "rgba(0,255,136,0.15)" : "rgba(0,168,85,0.15)",
  };
};
