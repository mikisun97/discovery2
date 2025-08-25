import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'CMS - AI 기반 신약 개발 빅데이터 분석 플랫폼',
  description: '관리자 콘솔 - 플랫폼 관리 및 콘텐츠 관리 시스템',
}

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
} 