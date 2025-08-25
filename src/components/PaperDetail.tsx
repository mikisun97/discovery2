'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Calendar, 
  User, 
  FileText, 
  Tag, 
  Globe, 
  ExternalLink, 
  Check,
  Star,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Brain,
  Microscope,
  TestTube,
  Database,
  Network,
  Layers,
  Lightbulb,
  Award,
  Clock,
  MapPin,
  Link as LinkIcon,
  Users
} from 'lucide-react'

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
  aiSummary: string
  isSaved: boolean
  citations?: number
  impactFactor?: number
  references?: string[]
  relatedPapers?: string[]
  fullText?: string
}

interface PaperDetailProps {
  paper: Paper
}

export default function PaperDetail({ paper }: PaperDetailProps) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(paper.isSaved)
  const [showFullAbstract, setShowFullAbstract] = useState(false)
  const [showFullSummary, setShowFullSummary] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'references'>('overview')

  // AI 요약 확장/축소 토글
  const toggleSummary = () => {
    setShowFullSummary(!showFullSummary)
  }

  // 저장 기능
  const handleSave = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.')
      return
    }

    const savedPapers = JSON.parse(localStorage.getItem('savedPapers') || '[]')
    const isAlreadySaved = savedPapers.some((p: any) => p.id === paper.id)

    if (isAlreadySaved) {
      const updatedPapers = savedPapers.filter((p: any) => p.id !== paper.id)
      localStorage.setItem('savedPapers', JSON.stringify(updatedPapers))
      setIsSaved(false)
      alert('논문이 저장 목록에서 제거되었습니다.')
    } else {
      const paperToSave = {
        ...paper,
        savedAt: new Date().toISOString()
      }
      savedPapers.push(paperToSave)
      localStorage.setItem('savedPapers', JSON.stringify(savedPapers))
      setIsSaved(true)
      alert('논문이 저장되었습니다. 마이페이지에서 확인할 수 있습니다.')
    }
  }

  // 공유 기능
  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // 다운로드 기능
  const handleDownload = () => {
    alert('PDF 다운로드가 시작됩니다.')
  }

  // 키워드 분석 데이터 (시각화용)
  const keywordData = paper.keywords.map((keyword, index) => ({
    name: keyword,
    value: Math.floor(Math.random() * 100) + 20, // 임시 데이터
    color: `hsl(${index * 60}, 70%, 50%)`
  }))

  // 저자별 인용수 데이터 (시각화용)
  const authorData = paper.authors.slice(0, 5).map((author, index) => ({
    name: author,
    citations: Math.floor(Math.random() * 200) + 50,
    papers: Math.floor(Math.random() * 20) + 5
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 페이지 헤더 */}
      <div className="bg-gradient-to-r from-primary-50 via-blue-50 to-indigo-50 border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm border border-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>검색 결과로 돌아가기</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  isSaved
                    ? 'bg-primary-500 text-white shadow-lg hover:bg-primary-600'
                    : 'bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 border border-gray-200'
                }`}
                title={isSaved ? '저장됨' : '저장하기'}
              >
                {isSaved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 bg-white text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200 border border-gray-200"
                title="공유하기"
              >
                {copied ? <Check className="h-5 w-5 text-green-600" /> : <Share2 className="h-5 w-5" />}
              </button>
              
              <button
                onClick={handleDownload}
                className="p-3 bg-blue-500 text-white hover:bg-blue-600 rounded-xl transition-all duration-200 shadow-sm border border-blue-200"
                title="PDF 다운로드"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 논문 기본 정보 */}
        <div className="card mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {paper.title}
            </h1>
            
            {/* 메타 정보 */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">저자</div>
                    <div className="font-medium text-gray-900">{paper.authors.join(', ')}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">저널</div>
                    <div className="font-medium text-gray-900">{paper.journal}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">발행일</div>
                    <div className="font-medium text-gray-900">{paper.publicationDate}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">언어</div>
                    <div className="font-medium text-gray-900">{paper.language === 'Korean' ? '국문' : '영문'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 통계 정보 */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{paper.citations || 0}</div>
                <div className="text-sm text-gray-600">인용수</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{paper.impactFactor || 0}</div>
                <div className="text-sm text-gray-600">임팩트 팩터</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{paper.keywords.length}</div>
                <div className="text-sm text-gray-600">키워드</div>
              </div>
            </div>
          </div>

          {/* 키워드 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="h-5 w-5 text-primary-600 mr-2" />
              주요 키워드
            </h3>
            <div className="flex flex-wrap gap-2">
              {paper.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200 shadow-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* DOI 링크 */}
          {paper.doi && (
            <div className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4 text-gray-500" />
              <a
                href={`https://doi.org/${paper.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                DOI: {paper.doi}
              </a>
            </div>
          )}
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'overview'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>개요</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'analysis'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>AI 분석</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'references'
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <LinkIcon className="h-4 w-4" />
              <span>참고문헌</span>
            </div>
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 초록 */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">초록</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  {showFullAbstract ? paper.abstract : `${paper.abstract.substring(0, 300)}...`}
                </p>
                <button
                  onClick={() => setShowFullAbstract(!showFullAbstract)}
                  className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>{showFullAbstract ? '접기' : '더 보기'}</span>
                  <svg className={`w-4 h-4 transition-transform ${showFullAbstract ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* AI 요약 */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">AI 한글 요약</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    생성형 AI
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {paper.language === 'English' ? '영문→한글' : '한글'}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <p className="text-purple-800 leading-relaxed text-lg">
                  {showFullSummary ? paper.aiSummary : `${paper.aiSummary.substring(0, 400)}...`}
                </p>
                <button
                  onClick={toggleSummary}
                  className="mt-4 text-purple-700 hover:text-purple-800 font-medium text-sm flex items-center space-x-1"
                >
                  <span>{showFullSummary ? '접기' : '더 보기'}</span>
                  <svg className={`w-4 h-4 transition-transform ${showFullSummary ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            {/* 키워드 분석 */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">키워드 중요도 분석</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {keywordData.slice(0, 5).map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{keyword.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${keyword.value}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{keyword.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {keywordData.slice(0, 5).map((keyword, index) => {
                          const angle = (index / 5) * 360
                          const radius = 35
                          const x = 50 + radius * Math.cos((angle - 90) * Math.PI / 180)
                          const y = 50 + radius * Math.sin((angle - 90) * Math.PI / 180)
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="8"
                              fill={keyword.color}
                              className="animate-pulse"
                            />
                          )
                        })}
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">키워드 분포도</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 저자 분석 */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">저자별 연구 성과</h3>
              </div>
              <div className="space-y-4">
                {authorData.map((author, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{author.name}</div>
                        <div className="text-sm text-gray-500">{author.papers}편의 논문</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{author.citations}</div>
                      <div className="text-sm text-gray-500">총 인용수</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 연구 분야 분석 */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <Network className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">연구 분야 네트워크</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Microscope className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-blue-700">실험 연구</div>
                  <div className="text-sm text-blue-600">주요 분야</div>
                </div>
                                 <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                   <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                     <TestTube className="h-6 w-6 text-white" />
                   </div>
                   <div className="text-lg font-bold text-green-700">화학 분석</div>
                   <div className="text-sm text-green-600">보조 분야</div>
                 </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-lg font-bold text-purple-700">데이터 분석</div>
                  <div className="text-sm text-purple-600">지원 분야</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">참고문헌</h3>
            </div>
            <div className="space-y-3">
              {paper.references ? (
                paper.references.map((reference, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-700">{reference}</div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <LinkIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>참고문헌 정보가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 