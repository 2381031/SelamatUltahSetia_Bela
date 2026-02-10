import React from "react"
import type { Metadata, Viewport } from 'next'
import { Quicksand } from 'next/font/google'

import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })

export const metadata: Metadata = {
  title: 'Selamat Ulang Tahun Setia!',
  description: 'Sebuah ucapan ulang tahun spesial untukmu',
}

export const viewport: Viewport = {
  themeColor: '#ffb6c1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${quicksand.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
