'use client'

import { useState } from 'react'
import { BookOpen, User, Calendar, Tag, FileText, Heart, Share2, Download, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface PaperItemProps {
  paper: {
    id: string
    title: string
    authors: string[]
    abstract: string
    keywords: string[]
    publicationDate: string
    journal: string
    doi: string
    language: string
    aiSummary?: string
    isSaved?: boolean
  }
  onSave: (paperId: string) => void
  onShare: (paperId: string) => void
  onDownload: (paperId: string) => void
}

const PaperItem = ({ paper, onSave, onShare, onDownload }: PaperItemProps) => {
  const [showFullAbstract, setShowFullAbstract] = useState(false)
  const [showAISummary, setShowAISummary] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      {/* 제목 및 기본 정보 */}
      <div className="mb-4">
        <Link href={`/search/${paper.id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-primary-600 cursor-pointer transition-colors duration-200">
            {paper.title}
          </h3>
        </Link>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{paper.authors.join(', ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(paper.publicationDate)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{paper.journal}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="h-4 w-4" />
            <span>{paper.language}</span>
          </div>
        </div>

        {/* 키워드 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {paper.keywords.slice(0, 5).map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
            >
              {keyword}
            </span>
          ))}
          {paper.keywords.length > 5 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{paper.keywords.length - 5}개 더
            </span>
          )}
        </div>
      </div>

      {/* 초록 */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">초록</span>
        </div>
        <p className="text-gray-700 leading-relaxed">
          {showFullAbstract ? paper.abstract : truncateText(paper.abstract, 200)}
        </p>
        {paper.abstract.length > 200 && (
          <button
            onClick={() => setShowFullAbstract(!showFullAbstract)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
          >
            {showFullAbstract ? '접기' : '더 보기'}
          </button>
        )}
      </div>

      {/* AI 요약 (있는 경우) */}
      {paper.aiSummary && (
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI 요약</span>
          </div>
          <p className="text-blue-800 leading-relaxed">
            {showAISummary ? paper.aiSummary : truncateText(paper.aiSummary, 150)}
          </p>
          {paper.aiSummary.length > 150 && (
            <button
              onClick={() => setShowAISummary(!showAISummary)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              {showAISummary ? '접기' : '더 보기'}
            </button>
          )}
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onSave(paper.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              paper.isSaved
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Heart className={`h-4 w-4 ${paper.isSaved ? 'fill-current' : ''}`} />
            <span>{paper.isSaved ? '저장됨' : '저장'}</span>
          </button>
          
          <button
            onClick={() => onShare(paper.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            <Share2 className="h-4 w-4" />
            <span>공유</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            DOI 보기
          </a>
          
          <button
            onClick={() => onDownload(paper.id)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>다운로드</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaperItem 