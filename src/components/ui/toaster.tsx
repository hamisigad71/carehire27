"use client"

import { toast } from "@chakra-ui/react"

// Toast notifications utility
export const toaster = {
  create: (options: {
    title?: string
    description?: string
    type?: "success" | "error" | "warning" | "info"
  }) => {
    toast({
      title: options.title,
      description: options.description,
      status: options.type as any,
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
    })
  },
}

export const Toaster = () => {
  return null // Toast notifications render at root level
}

