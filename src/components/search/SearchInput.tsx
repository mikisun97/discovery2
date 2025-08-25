'use client'

import { useState } from 'react'
import { Search, Filter, Sparkles } from 'lucide-react'

interface SearchInputProps {
  onSearch: (query: string, searchType: 'keyword' | 'natural') => void
  onAdvancedSearch: () => void
}

const SearchInput = ({ onSearch, onAdvancedSearch }: SearchInputProps) => {
  const [query, setQuery] = useState('AI Drug Discovery')
  const [searchType, setSearchType] = useState<'keyword' | 'natural'>('keyword')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim(), searchType)
    }
  }

  const handleNaturalLanguageSearch = () => {
    if (query.trim()) {
      onSearch(query.trim(), 'natural')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 검색 타입 선택 */}
      <div className="flex justify-center mb-4">
        <div className="bg-white rounded-xl p-1.5 shadow-md border border-gray-200">
          <button
            onClick={() => setSearchType('keyword')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              searchType === 'keyword'
                ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <Search className="w-3.5 h-3.5" />
              <span>키워드</span>
            </div>
          </button>
          <button
            onClick={() => setSearchType('natural')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              searchType === 'natural'
                ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 자연어</span>
            </div>
          </button>
        </div>
      </div>

      {/* 검색 입력 폼 */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              searchType === 'keyword'
                ? '키워드를 입력하세요 (예: AI, Drug Discovery, Machine Learning)'
                : '자연어로 검색하고 싶은 내용을 입력하세요'
            }
            className="block w-full pl-14 pr-32 py-3.5 text-base bg-white border-2 border-gray-200 rounded-xl shadow-md focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 hover:shadow-lg"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
            <button
              type="button"
              onClick={onAdvancedSearch}
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
              title="고급 검색 옵션"
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-1.5 shadow-md hover:shadow-lg"
            >
              <Search className="h-4 w-4" />
              <span>검색</span>
            </button>
          </div>
        </div>

        {/* 자연어 검색 강화 기능 */}
        {searchType === 'natural' && (
          <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-800">AI 자연어 이해</span>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              자연어로 입력하시면 AI가 의도를 분석하여 관련 논문을 찾아드립니다. 
              질문 형태나 설명 형태로 자유롭게 입력해보세요.
            </p>
            <button
              type="button"
              onClick={handleNaturalLanguageSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              <span>AI 분석으로 검색</span>
            </button>
          </div>
        )}

        {/* 검색 팁 */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-full border border-primary-200 shadow-sm">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-700 font-medium">
              {searchType === 'keyword' ? (
                <>
                  <strong>💡 팁:</strong> 여러 키워드를 공백으로 구분하여 입력하면 더 정확한 결과를 얻을 수 있습니다.
                </>
              ) : (
                <>
                  <strong>💡 팁:</strong> 질문이나 설명 형태로 입력하면 AI가 의미를 이해하여 관련 논문을 찾아드립니다.
                </>
              )}
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchInput 