import type { Metadata } from 'next'
import { Roboto_Condensed } from 'next/font/google'
import './globals.css'
import SurveyProvider, { SurveyContext } from './context-provider'

const roboto = Roboto_Condensed({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PermitFlow - Questionaire',
  description: 'SWE | Take Home Assignment',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SurveyProvider>{children}</SurveyProvider>
      </body>
    </html>
  )
}
