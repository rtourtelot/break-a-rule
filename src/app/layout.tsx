import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Story Finder',
  description: 'Find your stories worth telling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
