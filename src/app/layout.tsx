import Link from 'next/link'
import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'PROMPTBLOCKS',
  description: 'One-Tap Copying for AI Prompts'
}

export default function RootLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vbo2chr.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="https://kit.fontawesome.com/fecd077b7d.js" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
