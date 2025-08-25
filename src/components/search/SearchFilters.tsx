'use client'

import { useState } from 'react'
import { ChevronDown, X, Filter } from 'lucide-react'

interface SearchFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: SearchFilters) => void
}

export interface SearchFilters {
  sortBy: 'relevance' | 'date' | 'title' | 'author'
  dateRange: 'all' | '1year' | '3years' | '5years' | '10years'
  publicationType: string[]
  language: string[]
  subjectArea: string[]
}

const SearchFilters = ({ isOpen, onClose, onApplyFilters }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'relevance',
    dateRange: 'all',
    publicationType: [],
    language: [],
    subjectArea: []
  })

  const publicationTypes = [
    'Journal Article', 'Conference Paper', 'Review', 'Book Chapter', 'Patent'
  ]

  const languages = ['English', 'Korean', 'Chinese', 'Japanese', 'German', 'French']

  const subjectAreas = [
    'AI & Machine Learning', 'Drug Discovery', 'Molecular Biology', 'Chemistry',
    'Biotechnology', 'Pharmacology', 'Genomics', 'Bioinformatics'
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleArrayFilterChange = (key: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[]
      if (checked) {
        return { ...prev, [key]: [...currentArray, value] }
      } else {
        return { ...prev, [key]: currentArray.filter(item => item !== value) }
      }
    })
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      sortBy: 'relevance',
      dateRange: 'all',
      publicationType: [],
      language: [],
      subjectArea: []
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-blue-600 rounded-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">고급 검색 필터</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 필터 내용 */}
        <div className="p-6 space-y-8">
          {/* 정렬 옵션 */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              📊 정렬 기준
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="relevance">🎯 관련도순</option>
              <option value="date">📅 최신순</option>
              <option value="title">📝 제목순</option>
              <option value="author">👨‍🔬 저자순</option>
            </select>
          </div>

          {/* 발행 연도 */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              📅 발행 연도
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="all">🌍 전체 기간</option>
              <option value="1year">🆕 최근 1년</option>
              <option value="3years">⏰ 최근 3년</option>
              <option value="5years">📈 최근 5년</option>
              <option value="10years">📚 최근 10년</option>
            </select>
          </div>

          {/* 발행 유형 */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              📄 발행 유형
            </label>
            <div className="grid grid-cols-1 gap-3">
              {publicationTypes.map((type) => (
                <label key={type} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.publicationType.includes(type)}
                    onChange={(e) => handleArrayFilterChange('publicationType', type, e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 언어 */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              🌐 언어
            </label>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <label key={lang} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.language.includes(lang)}
                    onChange={(e) => handleArrayFilterChange('language', lang, e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 주제 분야 */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              🔬 주제 분야
            </label>
            <div className="grid grid-cols-1 gap-3">
              {subjectAreas.map((area) => (
                <label key={area} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.subjectArea.includes(area)}
                    onChange={(e) => handleArrayFilterChange('subjectArea', area, e.target.checked)}
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{area}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-600 hover:text-red-600 font-semibold transition-all duration-200 hover:bg-red-50 rounded-xl hover:shadow-md"
          >
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>초기화</span>
            </div>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-white hover:border-gray-400 transition-all duration-200 font-semibold hover:shadow-md"
            >
              취소
            </button>
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:from-primary-700 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>필터 적용</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters 