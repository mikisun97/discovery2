import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '논문 상세 - AI 기반 신약 개발 빅데이터 분석 플랫폼',
  description: '논문의 상세 정보, AI 요약, 참고문헌 등을 확인할 수 있습니다.',
}

export default function PaperDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 