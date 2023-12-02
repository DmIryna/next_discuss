"use client"

import { ReactNode } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { SessionProvider } from "next-auth/react"

interface PropvidersProps {
  children: ReactNode
}

export default function Providers({ children }: PropvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  )
}
