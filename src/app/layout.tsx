import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 기반 신약 개발 빅데이터 분석 플랫폼',
  description: '중대분자 사이즈의 신약 개발을 위한 AI 기반 빅데이터 분석 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
} 