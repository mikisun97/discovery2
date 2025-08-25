'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { SearchFilters } from './SearchFilters'

interface Paper {
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

interface SearchResultsProps {
  papers: Paper[]
  totalResults: number
  currentPage: number
  onPageChange: (page: number) => void
  onSave: (paperId: string) => void
  onShare: (paperId: string) => void
  onDownload: (paperId: string) => void
  onApplyFilters: (filters: SearchFilters) => void
}

const SearchResults = ({
  papers,
  totalResults,
  currentPage,
  onPageChange,
  onSave,
  onShare,
  onDownload,
  onApplyFilters
}: SearchResultsProps) => {
  const [showFilters, setShowFilters] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'title'>('relevance')

  const itemsPerPage = 10
  const totalPages = Math.ceil(totalResults / itemsPerPage)
  const startResult = (currentPage - 1) * itemsPerPage + 1
  const endResult = Math.min(currentPage * itemsPerPage, totalResults)

  const handleSort = (field: 'relevance' | 'date' | 'title') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const getSortLabel = (field: 'relevance' | 'date' | 'title') => {
    if (sortBy !== field) return field === 'relevance' ? '관련도순' : field === 'date' ? '날짜순' : '제목순'
    return `${field === 'relevance' ? '관련도순' : field === 'date' ? '날짜순' : '제목순'} ${sortOrder === 'asc' ? '↑' : '↓'}`
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
        <p className="text-gray-600 mb-6">
          다른 키워드로 검색해보시거나 검색 조건을 조정해보세요.
        </p>
        <button
          onClick={() => setShowFilters(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <Filter className="h-5 w-5" />
          <span>검색 조건 조정</span>
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* 결과 헤더 */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 px-8 py-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              검색 결과
            </h2>
            <p className="text-gray-600 mt-1">
              총 {totalResults.toLocaleString()}건의 논문을 찾았습니다
              {totalResults > 0 && (
                <span className="text-primary-600 font-medium">
                  ({startResult}-{endResult} / {totalResults})
                </span>
              )}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="h-4 w-4" />
              <span>필터</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => handleSort('relevance')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  sortBy === 'relevance'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {getSortLabel('relevance')}
              </button>
              <button
                onClick={() => handleSort('date')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  sortBy === 'date'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {getSortLabel('date')}
              </button>
              <button
                onClick={() => handleSort('title')}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  sortBy === 'title'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {getSortLabel('title')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 검색 결과 목록 */}
      <div className="p-8">
        <div className="grid gap-6">
          {papers.map((paper) => (
            <div key={paper.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary-300 hover:bg-gradient-to-r hover:from-white hover:to-gray-50">
              <div className="flex items-start">
                <div className="p-3 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl shadow-sm mr-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <div className="flex-1">
                  {/* 제목과 액션 버튼들 - 제목만 오른쪽에 버튼 */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors duration-200 flex-1">
                      <Link href={`/search/${paper.id}`} className="hover:underline">
                        {paper.title}
                      </Link>
                    </h3>
                    {/* 액션 버튼들 - 제목 옆에만 배치 */}
                    <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => onSave(paper.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          paper.isSaved
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm hover:shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                        }`}
                        title={paper.isSaved ? '저장됨' : '저장하기'}
                      >
                        {paper.isSaved ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                          </svg>
                        )}
                      </button>
                      
                      <button
                        onClick={() => onShare(paper.id)}
                        className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm rounded-lg transition-all duration-200"
                        title="공유하기"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => onDownload(paper.id)}
                        className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        title="PDF 다운로드"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* 나머지 내용 - 전체 가로 너비 사용 */}
                  <div>
                    {/* 메타데이터 */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="font-medium">{paper.authors.join(', ')}</span>
                      </span>
                      <span className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
                        </svg>
                        <span className="font-medium">{paper.journal}</span>
                      </span>
                      <span className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
                        </svg>
                        <span className="font-medium">{paper.publicationDate}</span>
                      </span>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        paper.language === 'Korean' 
                          ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 border border-green-300 shadow-sm' 
                          : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border border-blue-300 shadow-sm'
                      }`}>
                        {paper.language === 'Korean' ? '국문' : '영문'}
                      </span>
                    </div>
                    
                    {/* 초록 */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {paper.abstract.length > 200 
                          ? `${paper.abstract.substring(0, 200)}...` 
                          : paper.abstract
                        }
                      </p>
                    </div>
                    
                    {/* 키워드 */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {paper.keywords.slice(0, 5).map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      
                      {/* AI 요약 */}
                      {paper.aiSummary && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">🤖</span>
                            </div>
                            <span className="text-sm font-semibold text-purple-700">AI 요약</span>
                          </div>
                          <p className="text-purple-800 text-sm leading-relaxed">
                            {paper.aiSummary.length > 150 
                              ? `${paper.aiSummary.substring(0, 150)}...` 
                              : paper.aiSummary
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {/* 페이지 번호 */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="text-center mt-3 text-sm text-gray-500">
                페이지 {currentPage} / {totalPages}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 필터 모달 */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">검색 필터</h3>
              <p className="text-gray-600 mb-6">
                검색 결과를 더 정확하게 찾기 위해 필터를 설정하세요.
              </p>
              
              {/* 간단한 필터 옵션들 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    발행 연도
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">전체 기간</option>
                    <option value="1year">최근 1년</option>
                    <option value="3years">최근 3년</option>
                    <option value="5years">최근 5년</option>
                    <option value="10years">최근 10년</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    언어
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['English', 'Korean', 'Chinese', 'Japanese'].map((lang) => (
                      <label key={lang} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="text-sm text-gray-700">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    onApplyFilters({
                      sortBy: 'relevance',
                      dateRange: 'all',
                      publicationType: [],
                      language: [],
                      subjectArea: []
                    })
                    setShowFilters(false)
                  }}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  필터 적용
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchResults 