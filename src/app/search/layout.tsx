import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '논문 검색 - AI 기반 신약 개발 빅데이터 분석 플랫폼',
  description: 'AI 기반 자연어 검색과 키워드 검색을 통해 관련 논문을 빠르게 찾아보세요. 생성형 AI가 논문 내용을 요약하여 핵심 정보를 제공합니다.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 