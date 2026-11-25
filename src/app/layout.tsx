import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
  title: 'test_todo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css" />
      </head>
      <body>
        <Header />
        <div className="main-container">{children}</div>
      </body>
    </html>
  )
}
