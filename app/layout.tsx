import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amro Massalha | Head of DevOps @ Beamr',
  description: 'DevOps engineer who saves companies 70% on cloud costs while growing the best avocados in Israel. Kubernetes by day, farming by weekend.',
  keywords: 'DevOps, Cloud Architect, Kubernetes, AWS, Infrastructure as Code, Beamr, Israel',
  authors: [{ name: 'Amro Massalha' }],
  creator: 'Amro Massalha',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amromassalha.github.io/portfolio/',
    title: 'Amro Massalha - DevOps & Cloud Infrastructure Expert',
    description: 'From QA to Head of DevOps. Building scalable infrastructure that saves millions. SOC2 certified on first try!',
    siteName: 'Amro Massalha Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Amro Massalha - DevOps Portfolio',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Amro Massalha - Head of DevOps',
    description: 'Turning infrastructure chaos into scalable solutions. 70% cost savings guaranteed!',
    images: ['/og-image.png'],
  },
  
  icons: {
    icon: [
      { url: '/public/favicon.ico' },
      { url: '/public/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/public/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/public/apple-touch-icon.png' }
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="manifest" href="/portfolio/manifest.json" />
      <meta name="theme-color" content="#3b82f6" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}