'use client'

import { useState, useEffect } from 'react'
import { BarChart3, PieChart, TrendingUp, Calendar, Globe, Users, BookOpen } from 'lucide-react'

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

interface SearchVisualizationProps {
  papers: Paper[]
  searchQuery: string
}

const SearchVisualization = ({ papers, searchQuery }: SearchVisualizationProps) => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'authors'>('keywords')

  // 데이터 분석 함수들


  const getTopKeywords = () => {
    const keywordCounts = papers.reduce((acc, paper) => {
      paper.keywords.forEach(keyword => {
        acc[keyword] = (acc[keyword] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(keywordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }))
  }

  const getTopAuthors = () => {
    const authorCounts = papers.reduce((acc, paper) => {
      paper.authors.forEach(author => {
        acc[author] = (acc[author] || 0) + 1
      })
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(authorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([author, count]) => ({ author, count }))
  }

  const topKeywords = getTopKeywords()
  const topAuthors = getTopAuthors()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 탭 네비게이션 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('keywords')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'keywords'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4 inline mr-2" />
          주요 키워드
        </button>
        <button
          onClick={() => setActiveTab('authors')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'authors'
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          주요 저자
        </button>
      </div>



      {/* 키워드 탭 */}
      {activeTab === 'keywords' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">검색 결과 키워드 분석</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topKeywords.map((item, index) => (
              <div key={item.keyword} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index < 3 ? 'bg-primary-600' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-700">{item.keyword}</span>
                </div>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                  {item.count}회
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 저자 탭 */}
      {activeTab === 'authors' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">검색 결과 저자 분석</h3>
          <div className="space-y-3">
            {topAuthors.map((item, index) => (
              <div key={item.author} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index < 3 ? 'bg-primary-600' : 'bg-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-700">{item.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${(item.count / Math.max(...topAuthors.map(a => a.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">
                    {item.count}편
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchVisualization 