"use client";

import React from "react";
import { GlassLoader } from "@/components/ui/GlassLoader";
import { useLoading } from "@/context/LoadingContext";

export const GlobalLoader: React.FC = () => {
  const { isLoading } = useLoading();

  return isLoading ? <GlassLoader fullscreen /> : null;
};
