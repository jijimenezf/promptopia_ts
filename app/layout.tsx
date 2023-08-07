import '@styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
            <main className="app">
              <Nav />
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
