'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, BookMarked, Settings, Calendar, FileText, Download, Share2, Trash2, Search, Sparkles, Users, Link as LinkIcon, Copy, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [savedPapers, setSavedPapers] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedPaperId, setCopiedPaperId] = useState<string | null>(null)

  // 기본 데이터 (사용자가 선택하지 않았을 때 표시)
  const defaultPapers = [
    {
      id: 'default-1',
      title: 'AI-Driven Drug Discovery: A Comprehensive Review of Machine Learning Approaches in Pharmaceutical Research',
      authors: ['Kim, J.H.', 'Lee, S.M.', 'Park, Y.K.', 'Choi, M.J.'],
      abstract: 'This comprehensive review explores the application of artificial intelligence and machine learning in drug discovery...',
      keywords: ['AI', 'Machine Learning', 'Drug Discovery', 'Pharmaceutical Research', 'Deep Learning'],
      publicationDate: '2024-01-15',
      journal: 'Nature Reviews Drug Discovery',
      doi: '10.1038/nrd.2024.001',
      language: 'English',
      aiSummary: 'AI와 머신러닝을 활용한 신약 개발의 포괄적인 리뷰 논문입니다. 딥러닝, 강화학습, 자연어 처리 등 다양한 AI 방법론을 제약 연구에 적용한 사례를 분석하고, 표적 발굴, 약물 설계, 임상시험 최적화 등에서의 최신 기술 동향을 다룹니다.',
      isSaved: true,
      savedAt: new Date('2024-01-20').toISOString(),
      citations: 245,
      impactFactor: 57.618
    },
    {
      id: 'default-2',
      title: 'Machine Learning Applications in Bioinformatics: From Sequence Analysis to Drug Target Prediction',
      authors: ['Wang, L.', 'Zhang, X.', 'Chen, Y.', 'Liu, Z.'],
      abstract: 'This study demonstrates the effectiveness of machine learning algorithms in bioinformatics applications...',
      keywords: ['Machine Learning', 'Bioinformatics', 'Sequence Analysis', 'Drug Target', 'Neural Networks'],
      publicationDate: '2024-01-10',
      journal: 'Bioinformatics',
      doi: '10.1093/bioinformatics/btw123',
      language: 'English',
      aiSummary: '생물정보학에서 머신러닝을 활용한 시퀀스 분석 및 약물 표적 예측에 대한 연구 논문입니다. 다양한 ML 알고리즘의 성능을 비교 분석하고, 실제 약물 개발 과정에서의 적용 가능성을 검증합니다.',
      isSaved: true,
      savedAt: new Date('2024-01-18').toISOString(),
      citations: 156,
      impactFactor: 6.937
    },
    {
      id: 'default-3',
      title: 'Deep Learning for Protein Structure Prediction: Advances and Challenges',
      authors: ['Johnson, A.', 'Brown, R.', 'Davis, M.', 'Wilson, E.'],
      abstract: 'Recent advances in deep learning have revolutionized protein structure prediction...',
      keywords: ['Deep Learning', 'Protein Structure', 'Prediction', 'AlphaFold', 'Computational Biology'],
      publicationDate: '2024-01-05',
      journal: 'Science',
      doi: '10.1126/science.abc123',
      language: 'English',
      aiSummary: '딥러닝을 활용한 단백질 구조 예측의 최신 발전과 도전과제를 다루는 논문입니다. AlphaFold와 같은 혁신적인 도구들의 원리와 한계점을 분석하고, 향후 연구 방향을 제시합니다.',
      isSaved: true,
      savedAt: new Date('2024-01-15').toISOString(),
      citations: 89,
      impactFactor: 56.9
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    
    if (!isLoggedIn || !userData) {
      router.push('/auth/login')
      return
    }

    setUser(JSON.parse(userData))
    
    // 저장된 논문 불러오기
    const saved = localStorage.getItem('savedPapers')
    if (saved) {
      setSavedPapers(JSON.parse(saved))
    } else {
      // 사용자가 선택하지 않았을 때 기본 데이터 사용
      setSavedPapers(defaultPapers)
    }
  }, [router])

  const handleRemovePaper = (paperId: string) => {
    const updatedPapers = savedPapers.filter(paper => paper.id !== paperId)
    setSavedPapers(updatedPapers)
    localStorage.setItem('savedPapers', JSON.stringify(updatedPapers))
  }

  const handleSharePaper = async (paperId: string) => {
    const shareUrl = `${window.location.origin}/search/${paperId}`
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedPaperId(paperId)
      setTimeout(() => setCopiedPaperId(null), 2000)
    } catch (err) {
      alert('링크 복사에 실패했습니다.')
    }
  }

  const handleInternalShare = (paperId: string) => {
    // 내부 사용자 간 공유 기능 (목업)
    alert('내부 사용자 공유 기능은 개발 중입니다.')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: '개요', icon: User, description: '활동 요약 및 빠른 액세스' },
    { id: 'saved', name: '저장된 논문', icon: BookMarked, description: '개인 계정에 저장된 논문 및 요약' },
    { id: 'shared', name: '공유 관리', icon: Share2, description: '공유한 논문 및 내부 링크 관리' },
    { id: 'settings', name: '설정', icon: Settings, description: '계정 및 알림 설정' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}님의 마이페이지</h1>
              <p className="text-gray-600">{user.email} | {user.institution}</p>
            </div>
          </div>
          
          {/* 기능 안내 배너 */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-4 border border-primary-200">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <div>
                <h3 className="font-semibold text-primary-900">💡 개인 계정 기능</h3>
                <p className="text-sm text-primary-700">
                  논문 요약을 개인 계정에 저장하고, 마이페이지에서 확인하며, URL 또는 내부 사용자 간 링크로 공유할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* 사용자 정보 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 활동 통계</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">저장된 논문</span>
                        <span className="text-2xl font-bold text-primary-600">{savedPapers.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">가입일</span>
                        <span className="text-gray-900">{new Date(user.loginTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">최근 접속</span>
                        <span className="text-gray-900">오늘</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🎯 빠른 액세스</h3>
                    <div className="space-y-3">
                      <Link
                        href="/search"
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Search className="h-5 w-5 text-primary-600" />
                        <span className="font-medium text-gray-900">논문 검색</span>
                      </Link>
                      <button
                        onClick={() => setActiveTab('saved')}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                      >
                        <BookMarked className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-gray-900">저장된 논문</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('shared')}
                        className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 w-full text-left"
                      >
                        <Share2 className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">공유 관리</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 최근 저장된 논문 */}
                {savedPapers.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">📚 최근 저장된 논문</h3>
                      <button
                        onClick={() => setActiveTab('saved')}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        전체 보기
                      </button>
                    </div>
                    <div className="grid gap-4">
                      {savedPapers.slice(0, 3).map((paper) => (
                        <div key={paper.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
                          <Link href={`/search/${paper.id}`} className="block">
                            <h4 className="font-medium text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                              {paper.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {paper.authors.join(', ')} | {paper.journal}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              저장일: {new Date(paper.savedAt).toLocaleDateString()}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">저장된 논문 ({savedPapers.length}개)</h3>
                    <p className="text-sm text-gray-600 mt-1">개인 계정에 저장된 논문과 AI 요약을 확인할 수 있습니다</p>
                  </div>
                </div>

                {savedPapers.length === 0 ? (
                  <div className="text-center py-12">
                    <BookMarked className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">저장된 논문이 없습니다</h3>
                    <p className="text-gray-600 mb-6">
                      관심 있는 논문을 저장하여 나중에 쉽게 찾아보세요.
                    </p>
                    <Link
                      href="/search"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Search className="h-5 w-5" />
                      <span>논문 검색하기</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {savedPapers.map((paper) => (
                      <div key={paper.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="p-2 bg-primary-100 rounded-lg">
                                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <Link href={`/search/${paper.id}`} className="block">
                                  <h4 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 line-clamp-2">
                                    {paper.title}
                                  </h4>
                                </Link>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>{paper.authors.join(', ')}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
                                    </svg>
                                    <span>{paper.journal}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-4-6h8m-8 0H4" />
                                    </svg>
                                    <span>{paper.publicationDate}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {paper.keywords && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {paper.keywords.slice(0, 5).map((keyword: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* AI 요약 미리보기 */}
                            {paper.aiSummary && (
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 mb-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Sparkles className="h-4 w-4 text-purple-600" />
                                  <span className="text-sm font-semibold text-purple-700">AI 한글 요약</span>
                                </div>
                                <p className="text-purple-800 text-sm leading-relaxed line-clamp-3">
                                  {paper.aiSummary}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">저장일:</span>
                                <span className="text-sm font-medium text-gray-700">
                                  {new Date(paper.savedAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleSharePaper(paper.id)}
                                  className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
                                  title="URL 공유"
                                >
                                  {copiedPaperId === paper.id ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <LinkIcon className="h-4 w-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleInternalShare(paper.id)}
                                  className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-all duration-200"
                                  title="내부 사용자 공유"
                                >
                                  <Users className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRemovePaper(paper.id)}
                                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-all duration-200"
                                  title="삭제하기"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shared' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">공유 관리</h3>
                  <p className="text-sm text-gray-600 mt-1">공유한 논문과 내부 링크를 관리할 수 있습니다</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* URL 공유 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <LinkIcon className="h-5 w-5 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-900">URL 공유</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      논문 링크를 복사하여 다른 사람과 공유할 수 있습니다.
                    </p>
                    <div className="space-y-3">
                      {savedPapers.slice(0, 3).map((paper) => (
                        <div key={paper.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{paper.title}</p>
                            <p className="text-xs text-gray-500">{paper.authors.slice(0, 2).join(', ')}</p>
                          </div>
                          <button
                            onClick={() => handleSharePaper(paper.id)}
                            className="ml-2 p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                            title="링크 복사"
                          >
                            {copiedPaperId === paper.id ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 내부 사용자 공유 */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="h-5 w-5 text-green-600" />
                      <h4 className="text-lg font-semibold text-gray-900">내부 사용자 공유</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      같은 기관의 다른 사용자와 논문을 공유할 수 있습니다.
                    </p>
                    <div className="space-y-3">
                      {savedPapers.slice(0, 3).map((paper) => (
                        <div key={paper.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{paper.title}</p>
                            <p className="text-xs text-gray-500">{paper.authors.slice(0, 2).join(', ')}</p>
                          </div>
                          <button
                            onClick={() => handleInternalShare(paper.id)}
                            className="ml-2 p-2 bg-green-100 text-green-600 hover:bg-green-200 rounded-lg transition-colors duration-200"
                            title="내부 공유"
                          >
                            <Users className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {savedPapers.length === 0 && (
                  <div className="text-center py-12">
                    <Share2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">공유할 논문이 없습니다</h3>
                    <p className="text-gray-600 mb-6">
                      논문을 저장한 후 공유 기능을 사용할 수 있습니다.
                    </p>
                    <Link
                      href="/search"
                      className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Search className="h-5 w-5" />
                      <span>논문 검색하기</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 계정 설정</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                      <input
                        type="text"
                        value={user.name}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                      <input
                        type="email"
                        value={user.email}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">소속기관</label>
                      <input
                        type="text"
                        value={user.institution}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary-500"
                        readOnly
                      />
                    </div>
                    <div className="pt-4">
                      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        정보 수정
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 알림 설정</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">이메일 알림</h4>
                        <p className="text-sm text-gray-600">새로운 논문 업데이트 알림</p>
                      </div>
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">저장 알림</h4>
                        <p className="text-sm text-gray-600">논문 저장 시 확인 알림</p>
                      </div>
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 