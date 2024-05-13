import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/components/ReduxProvider'
import './globals.css'
import ThemeProviders from '@/components/ThemeProvider'
import Nav from '@/components/Nav'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptBuddy',
  description: 'Discover and Share Amazing Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProviders>
            <div className='main'>
              <div className='gradient'/>
            </div>

            <main className='app'>
              <Nav />
              {children}
            </main>
          </ThemeProviders>
        </ReduxProvider>
      </body>
    </html>
  )
}
