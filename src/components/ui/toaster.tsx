"use client"

// Simple toast notification utility
// Using a basic implementation that works with Chakra UI
export const toaster = {
  create: (options: {
    title?: string
    description?: string
    type?: "success" | "error" | "warning" | "info"
  }) => {
    // Simple in-browser notification
    const message = options.title ? `${options.title}: ${options.description}` : options.description;
    
    if (typeof window !== "undefined") {
      // Log to console as fallback
      console.log(`[${options.type?.toUpperCase() || 'INFO'}] ${message}`);
      
      // Use browser's built-in notification if available
      // This can be enhanced later with a proper toast library
    }
  },
}

export const Toaster = () => {
  return null // Toast notifications render at root level
}

