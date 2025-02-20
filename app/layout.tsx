import Header from './components/header'
import './globals.css'
import { Inter, Press_Start_2P } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const pixelFont = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
})

export const metadata = {
  title: 'Anderson C.',
  description: 'Portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pixelFont.variable}`}> 
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
