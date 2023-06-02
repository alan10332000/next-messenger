import { Nunito } from 'next/font/google'

import ActiveStatus from './components/ActiveStatus'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'

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
      <body className={font.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
