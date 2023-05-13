import { Nunito } from 'next/font/google'

import './globals.css'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Messenger',
  description: 'Hang out anytime, anywhere - Messenger makes it easy and fun to stay close to your favorite people.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
