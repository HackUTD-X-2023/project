import { Work_Sans } from 'next/font/google'
import './globals.css'

const inter = Work_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'MAE.I',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='p-0'>
          {children}
        </div>
      </body>
    </html>
  )
}
