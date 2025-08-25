'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, TrendingUp, Sparkles, User, Calendar, Globe, Download, Share2, Bookmark, ChevronDown, ChevronUp, Star } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// 검색 필터 타입 정의
interface SearchFiltersType {
  sortBy: 'relevance' | 'date' | 'citations'
  dateRange: string
  language: string[]
  publicationType: string[]
  subjectArea: string[]
}

// 논문 데이터 타입 정의
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
  citations: number
  impactFactor: number
  fullText?: string
}

// 확장된 목업 데이터
const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'AI-Driven Drug Discovery: A Comprehensive Review of Machine Learning Approaches in Pharmaceutical Research',
    authors: ['Kim, J.H.', 'Lee, S.M.', 'Park, Y.K.', 'Chen, X.'],
    abstract: 'This comprehensive review explores the transformative impact of artificial intelligence and machine learning on drug discovery processes. We examine various AI methodologies including deep learning, reinforcement learning, and natural language processing as applied to pharmaceutical research. The study covers recent advances in target identification, drug design, and clinical trial optimization, highlighting both successes and challenges in the field.',
    keywords: ['AI', 'Machine Learning', 'Drug Discovery', 'Pharmaceutical Research', 'Deep Learning'],
    publicationDate: '2024-01-15',
    journal: 'Nature Reviews Drug Discovery',
    doi: '10.1038/nrd.2024.001',
    language: 'English',
    aiSummary: 'AI와 머신러닝을 활용한 신약 개발의 포괄적인 리뷰 논문입니다. 딥러닝, 강화학습, 자연어 처리 등 다양한 AI 방법론을 제약 연구에 적용한 사례를 분석하고, 표적 발굴, 약물 설계, 임상시험 최적화 등에서의 최신 기술 동향을 다룹니다. AI 기술이 신약 개발 과정을 혁신적으로 변화시키고 있으며, 특히 약물 후보 물질 탐색과 독성 예측에서 뛰어난 성과를 보이고 있습니다.',
    isSaved: false,
    citations: 245,
    impactFactor: 57.618
  },
  {
    id: '2',
    title: 'Quantum Computing Applications in Drug Discovery: A New Paradigm',
    authors: ['Chen, L.', 'Wang, Y.', 'Kim, S.J.', 'Anderson, R.', 'Brown, M.'],
    abstract: 'Quantum computing represents a revolutionary approach to computational problems in drug discovery. This paper explores quantum algorithms for molecular docking, drug-target interaction prediction, and optimization of drug properties, demonstrating significant improvements over classical computing methods.',
    keywords: ['Quantum Computing', 'Drug Discovery', 'Molecular Docking', 'Quantum Algorithms', 'Computational Chemistry'],
    publicationDate: '2024-02-28',
    journal: 'Nature Computational Science',
    doi: '10.1038/s43588-024-00528-2',
    language: 'English',
    aiSummary: '양자 컴퓨팅을 활용한 신약 개발의 새로운 패러다임에 대한 연구 논문입니다. 분자 도킹, 약물-표적 상호작용 예측, 약물 특성 최적화를 위한 양자 알고리즘을 탐구하고, 기존 컴퓨팅 방법 대비 상당한 개선을 보여줍니다. 양자 컴퓨팅의 고유한 특성을 활용하여 복잡한 분자 시스템의 계산을 획기적으로 개선할 수 있음을 입증했습니다.',
    isSaved: false,
    citations: 156,
    impactFactor: 12.456
  },
  {
    id: '3',
    title: 'CRISPR-Cas9 Technology in Drug Target Validation and Therapeutic Development',
    authors: ['Smith, A.R.', 'Johnson, B.K.', 'Lee, C.H.', 'Garcia, D.', 'Martinez, E.'],
    abstract: 'CRISPR-Cas9 gene editing technology has revolutionized drug target validation by enabling precise genetic modifications in cellular and animal models. This study demonstrates the application of CRISPR-Cas9 for validating novel drug targets and understanding their role in disease mechanisms, accelerating the drug development pipeline.',
    keywords: ['CRISPR-Cas9', 'Gene Editing', 'Drug Target Validation', 'Therapeutic Development', 'Precision Medicine'],
    publicationDate: '2024-03-10',
    journal: 'Nature Methods',
    doi: '10.1038/s41592-024-01234',
    language: 'English',
    aiSummary: 'CRISPR-Cas9 유전자 편집 기술을 활용한 약물 표적 검증 및 치료제 개발에 대한 연구입니다. 정밀한 유전자 수정을 통해 새로운 약물 표적을 검증하고 질병 메커니즘에서의 역할을 규명함으로써 신약 개발 파이프라인을 가속화할 수 있음을 보여줍니다. 특히 개인맞춤형 치료제 개발에 중요한 기여를 하고 있습니다.',
    isSaved: false,
    citations: 198,
    impactFactor: 18.567
  },
  {
    id: '4',
    title: 'Deep Learning Models for Molecular Property Prediction in Drug Design',
    authors: ['Liu, X.', 'Zhang, M.', 'Kim, H.J.', 'Thompson, R.', 'Wilson, S.'],
    abstract: 'This research presents novel deep learning architectures for predicting molecular properties crucial in drug design. Our models demonstrate superior performance in predicting ADMET properties, solubility, and bioactivity compared to traditional computational methods, significantly reducing the time and cost of drug development.',
    keywords: ['Deep Learning', 'Molecular Properties', 'Drug Design', 'ADMET', 'Bioactivity Prediction'],
    publicationDate: '2024-01-22',
    journal: 'Journal of Chemical Information and Modeling',
    doi: '10.1021/acs.jcim.2024.001',
    language: 'English',
    aiSummary: '약물 설계에 중요한 분자 특성 예측을 위한 새로운 딥러닝 아키텍처를 제시한 연구입니다. ADMET 특성, 용해도, 생물활성 예측에서 기존 계산 방법보다 우수한 성능을 보여주며, 신약 개발의 시간과 비용을 대폭 절감할 수 있음을 입증했습니다. 특히 분자 구조로부터 약물 특성을 정확히 예측하는 혁신적인 방법을 제공합니다.',
    isSaved: false,
    citations: 167,
    impactFactor: 5.463
  },
  {
    id: '5',
    title: 'Natural Language Processing for Biomedical Literature Mining in Drug Discovery',
    authors: ['Davis, K.', 'Miller, J.', 'Park, S.H.', 'Adams, L.', 'Taylor, M.'],
    abstract: 'We developed an advanced NLP system for extracting drug-disease relationships and potential therapeutic targets from biomedical literature. Our approach combines transformer models with domain-specific knowledge graphs to identify novel drug repurposing opportunities and accelerate target discovery.',
    keywords: ['Natural Language Processing', 'Literature Mining', 'Drug Repurposing', 'Knowledge Graphs', 'Biomedical Text'],
    publicationDate: '2024-02-14',
    journal: 'Bioinformatics',
    doi: '10.1093/bioinformatics/btab2024',
    language: 'English',
    aiSummary: '생물의학 문헌 마이닝을 통한 신약 개발을 위한 고급 자연어 처리 시스템 개발 연구입니다. 트랜스포머 모델과 도메인별 지식 그래프를 결합하여 약물-질병 관계와 잠재적 치료 표적을 추출하고, 새로운 약물 재활용 기회를 식별하여 표적 발굴을 가속화합니다. 방대한 문헌 데이터에서 숨겨진 패턴을 찾아내는 혁신적인 접근법을 제시합니다.',
    isSaved: false,
    citations: 134,
    impactFactor: 5.481
  },
  {
    id: '6',
    title: 'Reinforcement Learning for Optimal Drug Dosing and Treatment Protocols',
    authors: ['White, R.', 'Johnson, A.', 'Kim, M.S.', 'Brown, T.', 'Clark, D.'],
    abstract: 'This study applies reinforcement learning algorithms to optimize drug dosing regimens and treatment protocols. Our RL-based approach personalizes treatment strategies based on patient-specific factors, demonstrating improved therapeutic outcomes and reduced adverse effects in clinical simulations.',
    keywords: ['Reinforcement Learning', 'Drug Dosing', 'Personalized Medicine', 'Treatment Optimization', 'Clinical Decision Support'],
    publicationDate: '2024-03-05',
    journal: 'Nature Medicine',
    doi: '10.1038/s41591-024-002',
    language: 'English',
    aiSummary: '강화학습을 활용한 최적 약물 투여량 및 치료 프로토콜 연구입니다. 환자별 특성을 고려한 개인맞춤형 치료 전략을 제공하여 치료 효과를 개선하고 부작용을 감소시킵니다. 임상 시뮬레이션에서 기존 방법 대비 우수한 결과를 보여주며, 정밀의학 구현에 중요한 기여를 하고 있습니다.',
    isSaved: false,
    citations: 189,
    impactFactor: 87.241
  },
  {
    id: '7',
    title: 'Federated Learning for Collaborative Drug Discovery Across Institutions',
    authors: ['Green, S.', 'Lewis, P.', 'Kim, J.Y.', 'Harris, N.', 'Moore, K.'],
    abstract: 'We present a federated learning framework that enables collaborative drug discovery while preserving data privacy across multiple pharmaceutical companies and research institutions. This approach accelerates drug development by leveraging collective knowledge without sharing sensitive proprietary data.',
    keywords: ['Federated Learning', 'Collaborative Research', 'Data Privacy', 'Multi-institutional', 'Drug Development'],
    publicationDate: '2024-01-30',
    journal: 'Nature Biotechnology',
    doi: '10.1038/s41587-024-003',
    language: 'English',
    aiSummary: '여러 기관 간 데이터 프라이버시를 보장하면서 협력적 신약 개발을 가능하게 하는 연합학습 프레임워크 연구입니다. 민감한 기업 데이터를 공유하지 않으면서도 집단 지식을 활용하여 신약 개발을 가속화할 수 있는 혁신적인 방법을 제시합니다. 제약업계의 협력 연구 패러다임을 변화시킬 수 있는 중요한 기술입니다.',
    isSaved: false,
    citations: 142,
    impactFactor: 68.164
  },
  {
    id: '8',
    title: 'Graph Neural Networks for Drug-Target Interaction Prediction',
    authors: ['Yang, H.', 'Chen, W.', 'Park, K.H.', 'Robinson, L.', 'Scott, M.'],
    abstract: 'This research introduces a novel graph neural network architecture for predicting drug-target interactions. By modeling molecular structures and protein domains as graphs, our approach achieves state-of-the-art performance in identifying potential therapeutic targets and off-target effects.',
    keywords: ['Graph Neural Networks', 'Drug-Target Interaction', 'Molecular Graphs', 'Target Prediction', 'Off-target Effects'],
    publicationDate: '2024-02-08',
    journal: 'Cell Systems',
    doi: '10.1016/j.cels.2024.004',
    language: 'English',
    aiSummary: '약물-표적 상호작용 예측을 위한 새로운 그래프 신경망 아키텍처를 제시한 연구입니다. 분자 구조와 단백질 도메인을 그래프로 모델링하여 잠재적 치료 표적과 부작용을 식별하는 데 최첨단 성능을 달성했습니다. 복잡한 생물학적 네트워크를 효과적으로 분석할 수 있는 혁신적인 방법론을 제공합니다.',
    isSaved: false,
    citations: 178,
    impactFactor: 9.234
  },
  {
    id: '9',
    title: 'AI-Powered Virtual Screening for COVID-19 Drug Repurposing',
    authors: ['Martinez, C.', 'Wong, L.', 'Kim, D.J.', 'Evans, R.', 'Phillips, A.'],
    abstract: 'We developed an AI-powered virtual screening platform for identifying existing drugs that can be repurposed for COVID-19 treatment. Our system integrates multiple ML models to evaluate drug efficacy, safety profiles, and potential interactions, successfully identifying several promising candidates.',
    keywords: ['Virtual Screening', 'Drug Repurposing', 'COVID-19', 'Machine Learning', 'Antiviral Drugs'],
    publicationDate: '2024-01-18',
    journal: 'Science Translational Medicine',
    doi: '10.1126/scitranslmed.2024.005',
    language: 'English',
    aiSummary: 'COVID-19 치료를 위한 기존 약물 재활용을 식별하는 AI 기반 가상 스크리닝 플랫폼 개발 연구입니다. 여러 머신러닝 모델을 통합하여 약물 효능, 안전성 프로필, 잠재적 상호작용을 평가하고 유망한 후보 약물들을 성공적으로 식별했습니다. 팬데믹 상황에서 신속한 치료제 개발을 위한 혁신적인 접근법을 제시합니다.',
    isSaved: false,
    citations: 223,
    impactFactor: 17.161
  },
  {
    id: '10',
    title: 'Explainable AI for Drug Safety Assessment and Regulatory Approval',
    authors: ['Turner, B.', 'Hall, K.', 'Lee, J.W.', 'Cooper, S.', 'Reed, M.'],
    abstract: 'This study presents explainable AI methodologies for drug safety assessment that provide transparent and interpretable predictions for regulatory agencies. Our approach enhances trust in AI-driven drug approval processes while maintaining high predictive accuracy for adverse drug reactions.',
    keywords: ['Explainable AI', 'Drug Safety', 'Regulatory Approval', 'Adverse Drug Reactions', 'Interpretable ML'],
    publicationDate: '2024-03-12',
    journal: 'Regulatory Science & Medicine',
    doi: '10.1177/rsm.2024.006',
    language: 'English',
    aiSummary: '약물 안전성 평가를 위한 설명 가능한 AI 방법론을 제시한 연구입니다. 규제 기관에 투명하고 해석 가능한 예측을 제공하여 AI 기반 약물 승인 과정에 대한 신뢰를 높입니다. 부작용 예측에서 높은 정확도를 유지하면서도 의사결정 과정을 명확히 설명할 수 있는 혁신적인 접근법입니다.',
    isSaved: false,
    citations: 167,
    impactFactor: 8.742
  }
]

export default function SearchPage() {
  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('AI Drug Discovery')
  const [searchType, setSearchType] = useState<'keyword' | 'natural'>('keyword')
  const [searchResults, setSearchResults] = useState<Paper[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'citations'>('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [expandedSummaries, setExpandedSummaries] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState({
    language: [] as string[],
    publicationType: [] as string[],
    subjectArea: [] as string[],
    dateRange: '',
    minCitations: '',
    minImpactFactor: ''
  })

  const itemsPerPage = 8
  const totalPages = Math.ceil(searchResults.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentResults = searchResults.slice(startIndex, startIndex + itemsPerPage)

  // 검색 로직
  const handleSearch = (query: string, type: 'keyword' | 'natural') => {
    setIsSearching(true)
    setSearchQuery(query)
    setSearchType(type)
    
    setTimeout(() => {
      if (query.trim()) {
        let filtered = mockPapers.filter(paper => {
          const searchText = `${paper.title} ${paper.abstract} ${paper.keywords.join(' ')} ${paper.authors.join(' ')} ${paper.journal}`.toLowerCase()
          const queryLower = query.toLowerCase()
          
          if (type === 'keyword') {
            const keywords = queryLower.split(' ').filter(word => word.length > 0)
            return keywords.some(keyword => searchText.includes(keyword))
          } else {
            const words = queryLower.split(' ').filter(word => word.length > 2)
            if (words.length === 0) return true
            
            const matchScore = words.reduce((score, word) => {
              if (paper.title.toLowerCase().includes(word)) score += 3
              if (paper.keywords.some(k => k.toLowerCase().includes(word))) score += 2
              if (paper.abstract.toLowerCase().includes(word)) score += 1
              return score
            }, 0)
            
            return matchScore > 0
          }
        })
        
        // 필터 적용
        filtered = applyFilters(filtered)
        
        // 정렬 적용
        const sorted = [...filtered].sort((a, b) => {
          switch (sortBy) {
            case 'date':
              return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
            case 'citations':
              return b.citations - a.citations
            default:
              return 0
          }
        })
        
        setSearchResults(sorted)
      } else {
        let filtered = mockPapers
        filtered = applyFilters(filtered)
        setSearchResults(filtered)
      }
      setIsSearching(false)
      setCurrentPage(1)
    }, 1000)
  }

  // 필터 적용 함수
  const applyFilters = (papers: Paper[]) => {
    return papers.filter(paper => {
      // 언어 필터
      if (filters.language.length > 0 && !filters.language.includes(paper.language)) {
        return false
      }
      
      // 출판 유형 필터 (저널 기반)
      if (filters.publicationType.length > 0) {
        const paperType = getPublicationType(paper.journal)
        if (!filters.publicationType.includes(paperType)) {
          return false
        }
      }
      
      // 주제 영역 필터
      if (filters.subjectArea.length > 0) {
        const hasSubjectArea = filters.subjectArea.some(area => 
          paper.keywords.some(keyword => 
            keyword.toLowerCase().includes(area.toLowerCase())
          )
        )
        if (!hasSubjectArea) {
          return false
        }
      }
      
      // 날짜 범위 필터
      if (filters.dateRange) {
        const paperDate = new Date(paper.publicationDate)
        const currentDate = new Date()
        const monthsAgo = parseInt(filters.dateRange)
        const cutoffDate = new Date(currentDate.getTime() - (monthsAgo * 30 * 24 * 60 * 60 * 1000))
        
        if (paperDate < cutoffDate) {
          return false
        }
      }
      
      // 최소 인용수 필터
      if (filters.minCitations && paper.citations < parseInt(filters.minCitations)) {
        return false
      }
      
      // 최소 임팩트 팩터 필터
      if (filters.minImpactFactor && paper.impactFactor < parseFloat(filters.minImpactFactor)) {
        return false
      }
      
      return true
    })
  }

  // 출판 유형 판별 함수
  const getPublicationType = (journal: string) => {
    const journalLower = journal.toLowerCase()
    if (journalLower.includes('nature') || journalLower.includes('science') || journalLower.includes('cell')) {
      return 'High Impact'
    } else if (journalLower.includes('journal') || journalLower.includes('letters')) {
      return 'Research Journal'
    } else if (journalLower.includes('reviews') || journalLower.includes('review')) {
      return 'Review'
    } else {
      return 'Other'
    }
  }

  // 요약 확장/축소
  const toggleSummary = (paperId: string) => {
    const newExpanded = new Set(expandedSummaries)
    if (newExpanded.has(paperId)) {
      newExpanded.delete(paperId)
    } else {
      newExpanded.add(paperId)
    }
    setExpandedSummaries(newExpanded)
  }

  // 저장 기능
  const handleSave = (paperId: string) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      alert('로그인이 필요한 기능입니다.')
      return
    }

    const savedPapers = JSON.parse(localStorage.getItem('savedPapers') || '[]')
    const isAlreadySaved = savedPapers.some((p: any) => p.id === paperId)

    if (isAlreadySaved) {
      const updatedPapers = savedPapers.filter((p: any) => p.id !== paperId)
      localStorage.setItem('savedPapers', JSON.stringify(updatedPapers))
      alert('논문이 저장 목록에서 제거되었습니다.')
    } else {
      const paper = mockPapers.find(p => p.id === paperId)
      if (paper) {
        const paperToSave = { ...paper, savedAt: new Date().toISOString() }
        savedPapers.push(paperToSave)
        localStorage.setItem('savedPapers', JSON.stringify(savedPapers))
        alert('논문이 저장되었습니다. 마이페이지에서 확인할 수 있습니다.')
      }
    }

    setSearchResults(prev => 
      prev.map(paper => 
        paper.id === paperId ? { ...paper, isSaved: !paper.isSaved } : paper
      )
    )
  }

  // 공유 기능
  const handleShare = (paperId: string) => {
    const shareUrl = `${window.location.origin}/search/${paperId}`
    navigator.clipboard.writeText(shareUrl)
    alert('논문 링크가 클립보드에 복사되었습니다!')
  }

  // 다운로드 기능
  const handleDownload = (paperId: string) => {
    const paper = searchResults.find(p => p.id === paperId)
    if (paper) {
      alert(`${paper.title} 논문 다운로드를 시작합니다.`)
    }
  }

  // 페이지 로드 시 초기 검색
  useEffect(() => {
    handleSearch(searchQuery, searchType)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
             {/* 검색 히어로 섹션 */}
       <section className="bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-50 border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="text-center mb-6">
                         <h1 className="text-3xl font-bold text-gray-900 mb-3">
               AI 기반 논문 검색
             </h1>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
               첨단 AI 기술로 신약개발 관련 논문을 빠르고 정확하게 검색하고, 
               한글 요약으로 핵심 내용을 쉽게 파악하세요
             </p>
            
            
          </div>

          {/* 검색 인터페이스 */}
          <div className="max-w-4xl mx-auto">
            {/* 검색 타입 선택 */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-xl p-1.5 shadow-md border border-gray-200">
                <button
                  onClick={() => setSearchType('keyword')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    searchType === 'keyword'
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Search className="w-3.5 h-3.5" />
                    <span>키워드 검색</span>
                  </div>
                </button>
                <button
                  onClick={() => setSearchType('natural')}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    searchType === 'natural'
                      ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI 자연어 검색</span>
                  </div>
                </button>
              </div>
            </div>

            {/* 검색 입력 */}
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery, searchType); }} className="relative">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchType === 'keyword'
                      ? '키워드를 입력하세요 (예: AI, Drug Discovery, Machine Learning)'
                      : '자연어로 검색하고 싶은 내용을 입력하세요 (예: AI를 활용한 신약 후보물질 탐색 연구)'
                  }
                  className="block w-full pl-12 pr-32 py-4 text-lg bg-white border-2 border-gray-200 rounded-xl shadow-lg focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 placeholder-gray-400 hover:shadow-xl"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-2">
                                     <button
                     type="button"
                     onClick={() => setShowFilters(true)}
                     className={`p-2.5 rounded-lg transition-all duration-200 ${
                       Object.values(filters).some(value => 
                         Array.isArray(value) ? value.length > 0 : value !== ''
                       )
                         ? 'bg-primary-100 text-primary-600'
                         : 'text-gray-400 hover:text-primary-600 hover:bg-primary-50'
                     }`}
                     title="고급 검색 옵션"
                   >
                     <Filter className="h-4 w-4" />
                   </button>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isSearching ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    <span>{isSearching ? '검색중...' : '검색'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 검색 결과 섹션 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSearching ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI가 논문을 검색하고 있습니다</h3>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <>
            {/* 검색 결과 헤더 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  검색 결과
                </h2>
                <p className="text-gray-600">
                  총 {searchResults.length.toLocaleString()}건의 논문을 찾았습니다
                  {searchResults.length > 0 && (
                    <span> ({startIndex + 1}-{Math.min(startIndex + itemsPerPage, searchResults.length)} / {searchResults.length.toLocaleString()})</span>
                  )}
                </p>
              </div>

              {/* 정렬 옵션 */}
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">정렬:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'relevance' | 'date' | 'citations')
                    handleSearch(searchQuery, searchType)
                  }}
                  className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                >
                  <option value="relevance">관련도순</option>
                  <option value="date">최신순</option>
                  <option value="citations">인용순</option>
                </select>
              </div>
            </div>

            {/* 논문 목록 */}
            <div className="space-y-6">
              {currentResults.map((paper) => (
                <article key={paper.id} className="card hover:shadow-lg transition-all duration-300 hover:border-primary-200">
                  <div className="flex items-start">
                    <div className="flex-1">
                      {/* 논문 제목 및 메타정보 */}
                      <div className="mb-4">
                        {/* 제목과 액션 버튼을 같은 줄에 배치 */}
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 flex-1">
                            <Link href={`/search/${paper.id}`} className="hover:underline">
                              {paper.title}
                            </Link>
                          </h3>
                          {/* 액션 버튼들과 Impact Factor - 제목 옆에만 배치 */}
                          <div className="flex flex-col items-end space-y-2 ml-4 flex-shrink-0">
                            {/* 액션 버튼들 */}
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => handleSave(paper.id)}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  paper.isSaved
                                    ? 'bg-primary-500 text-white shadow-sm hover:bg-primary-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={paper.isSaved ? '저장됨' : '저장하기'}
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                onClick={() => handleShare(paper.id)}
                                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-all duration-200"
                                title="공유하기"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                onClick={() => handleDownload(paper.id)}
                                className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-sm"
                                title="PDF 다운로드"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            {/* Impact Factor */}
                            <div className="text-xs text-gray-500 text-right">
                              Impact Factor: {paper.impactFactor}
                            </div>
                          </div>
                        </div>
                        
                        {/* 메타정보 */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                            <User className="w-3.5 h-3.5 text-gray-500" />
                            <span className="font-medium">{paper.authors.slice(0, 3).join(', ')}{paper.authors.length > 3 ? ` 외 ${paper.authors.length - 3}명` : ''}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
                            <span className="font-medium">{paper.journal}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-sm font-medium">{paper.publicationDate}</span>
                          </div>
                          <div className="flex items-center space-x-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 text-gray-500" />
                            <span className="font-medium">{paper.citations} 인용</span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Globe className="w-3.5 h-3.5 text-gray-500" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              paper.language === 'Korean' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {paper.language === 'Korean' ? '국문' : '영문'}
                            </span>
                          </div>
                        </div>

                        {/* 키워드 */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {paper.keywords.slice(0, 5).map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI 요약 */}
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <Sparkles className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-purple-700">AI 한글 요약</span>
                          </div>
                          <button
                            onClick={() => toggleSummary(paper.id)}
                            className="text-purple-600 hover:text-purple-700 transition-colors p-1 rounded hover:bg-purple-100"
                          >
                            {expandedSummaries.has(paper.id) ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          {expandedSummaries.has(paper.id) 
                            ? paper.aiSummary
                            : `${paper.aiSummary.substring(0, 150)}...`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    이전
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        page === currentPage
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    다음
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">
              다른 키워드로 다시 검색해보세요
            </p>
          </div>
        )}
             </section>

       {/* 고급 검색 필터 모달 */}
       {showFilters && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
             <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-gray-900">고급 검색 필터</h3>
                 <button
                   onClick={() => setShowFilters(false)}
                   className="text-gray-400 hover:text-gray-600 transition-colors"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </button>
               </div>

               <div className="space-y-6">
                 {/* 언어 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">언어</label>
                   <div className="space-y-2">
                     {['English', 'Korean'].map((lang) => (
                       <label key={lang} className="flex items-center">
                         <input
                           type="checkbox"
                           checked={filters.language.includes(lang)}
                           onChange={(e) => {
                             if (e.target.checked) {
                               setFilters(prev => ({ ...prev, language: [...prev.language, lang] }))
                             } else {
                               setFilters(prev => ({ ...prev, language: prev.language.filter(l => l !== lang) }))
                             }
                           }}
                           className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                         />
                         <span className="ml-2 text-sm text-gray-700">{lang === 'English' ? '영문' : '국문'}</span>
                       </label>
                     ))}
                   </div>
                 </div>

                 {/* 출판 유형 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">출판 유형</label>
                   <div className="space-y-2">
                     {['High Impact', 'Research Journal', 'Review', 'Other'].map((type) => (
                       <label key={type} className="flex items-center">
                         <input
                           type="checkbox"
                           checked={filters.publicationType.includes(type)}
                           onChange={(e) => {
                             if (e.target.checked) {
                               setFilters(prev => ({ ...prev, publicationType: [...prev.publicationType, type] }))
                             } else {
                               setFilters(prev => ({ ...prev, publicationType: prev.publicationType.filter(t => t !== type) }))
                             }
                           }}
                           className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                         />
                         <span className="ml-2 text-sm text-gray-700">{type}</span>
                       </label>
                     ))}
                   </div>
                 </div>

                 {/* 주제 영역 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">주제 영역</label>
                   <div className="space-y-2">
                     {['AI', 'Machine Learning', 'Drug Discovery', 'Quantum Computing', 'CRISPR', 'Deep Learning'].map((area) => (
                       <label key={area} className="flex items-center">
                         <input
                           type="checkbox"
                           checked={filters.subjectArea.includes(area)}
                           onChange={(e) => {
                             if (e.target.checked) {
                               setFilters(prev => ({ ...prev, subjectArea: [...prev.subjectArea, area] }))
                             } else {
                               setFilters(prev => ({ ...prev, subjectArea: prev.subjectArea.filter(a => a !== area) }))
                             }
                           }}
                           className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                         />
                         <span className="ml-2 text-sm text-gray-700">{area}</span>
                       </label>
                     ))}
                   </div>
                 </div>

                 {/* 날짜 범위 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">발행 기간</label>
                   <select
                     value={filters.dateRange}
                     onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                   >
                     <option value="">전체 기간</option>
                     <option value="6">최근 6개월</option>
                     <option value="12">최근 1년</option>
                     <option value="24">최근 2년</option>
                     <option value="60">최근 5년</option>
                   </select>
                 </div>

                 {/* 최소 인용수 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">최소 인용수</label>
                   <input
                     type="number"
                     value={filters.minCitations}
                     onChange={(e) => setFilters(prev => ({ ...prev, minCitations: e.target.value }))}
                     placeholder="예: 100"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                   />
                 </div>

                 {/* 최소 임팩트 팩터 필터 */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-3">최소 임팩트 팩터</label>
                   <input
                     type="number"
                     value={filters.minImpactFactor}
                     onChange={(e) => setFilters(prev => ({ ...prev, minImpactFactor: e.target.value }))}
                     placeholder="예: 5.0"
                     step="0.1"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                   />
                 </div>
               </div>

               {/* 액션 버튼 */}
               <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                 <button
                   onClick={() => {
                     setFilters({
                       language: [],
                       publicationType: [],
                       subjectArea: [],
                       dateRange: '',
                       minCitations: '',
                       minImpactFactor: ''
                     })
                   }}
                   className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                 >
                   초기화
                 </button>
                 <button
                   onClick={() => {
                     setShowFilters(false)
                     handleSearch(searchQuery, searchType)
                   }}
                   className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                 >
                   필터 적용
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}
       
       <Footer />
     </div>
   )
 } 