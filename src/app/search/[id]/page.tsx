'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PaperDetail from '@/components/PaperDetail'

// 목업 데이터 (실제로는 API에서 가져올 데이터)
const mockPapers = [
  {
    id: '1',
    title: 'AI-Driven Drug Discovery: A Comprehensive Review of Machine Learning Approaches in Pharmaceutical Research',
    authors: ['Kim, J.H.', 'Lee, S.M.', 'Park, Y.K.', 'Chen, X.'],
    abstract: 'This comprehensive review explores the transformative impact of artificial intelligence and machine learning on drug discovery processes. We examine various AI methodologies including deep learning, reinforcement learning, and natural language processing as applied to pharmaceutical research. The study covers recent advances in target identification, drug design, and clinical trial optimization, highlighting both successes and challenges in the field. Our analysis reveals that AI-driven approaches have significantly accelerated the drug discovery pipeline, reducing development time by up to 40% in certain therapeutic areas. However, challenges remain in data quality, interpretability, and regulatory acceptance. We provide recommendations for future research directions and discuss the potential for AI to revolutionize personalized medicine.',
    keywords: ['AI', 'Machine Learning', 'Drug Discovery', 'Pharmaceutical Research', 'Deep Learning', 'Target Identification', 'Drug Design', 'Clinical Trials'],
    publicationDate: '2024-01-15',
    journal: 'Nature Reviews Drug Discovery',
    doi: '10.1038/nrd.2024.001',
    language: 'English',
    aiSummary: 'AI와 머신러닝을 활용한 신약 개발의 포괄적인 리뷰 논문입니다. 딥러닝, 강화학습, 자연어 처리 등 다양한 AI 방법론을 제약 연구에 적용한 사례를 분석하고, 표적 발굴, 약물 설계, 임상시험 최적화 등에서의 최신 기술 동향을 다룹니다. AI 기반 접근법이 신약 개발 파이프라인을 최대 40%까지 가속화했음을 보여주며, 데이터 품질, 해석 가능성, 규제 승인 등에서의 과제와 향후 연구 방향을 제시합니다.',
    isSaved: false,
    citations: 156,
    impactFactor: 84.694,
    fullText: 'This is the full text content of the paper...',
    references: [
      'Smith, A. et al. (2023) "Machine Learning in Drug Discovery" Nature, 45:123-145',
      'Johnson, B. et al. (2023) "AI Applications in Pharmaceutical Research" Science, 67:89-112',
      'Williams, C. et al. (2023) "Deep Learning for Target Identification" Cell, 23:456-478'
    ],
    relatedPapers: [
      'Machine Learning Approaches in Drug Discovery',
      'AI Applications in Pharmaceutical Research',
      'Deep Learning for Target Identification'
    ]
  },
  {
    id: '2',
    title: 'Machine Learning Applications in Drug Target Identification: A Systematic Review',
    authors: ['Park, S.J.', 'Kim, M.H.', 'Lee, J.K.', 'Wang, L.'],
    abstract: 'This systematic review examines the application of machine learning techniques in drug target identification, a critical step in the drug discovery process. We analyze 150+ studies published between 2018-2024, covering various ML algorithms including random forests, support vector machines, and neural networks. Our findings demonstrate that ML-based approaches achieve 85% accuracy in target prediction, significantly outperforming traditional methods. The review identifies key challenges in data integration, model interpretability, and validation strategies.',
    keywords: ['Machine Learning', 'Drug Target', 'Target Identification', 'Neural Networks', 'Random Forest', 'Support Vector Machine'],
    publicationDate: '2024-02-20',
    journal: 'Journal of Medicinal Chemistry',
    doi: '10.1021/acs.jmedchem.2024.002',
    language: 'English',
    aiSummary: '머신러닝을 활용한 약물 표적 발굴에 대한 체계적 리뷰 논문입니다. 2018-2024년간 발표된 150여 편의 연구를 분석하여 랜덤 포레스트, 서포트 벡터 머신, 신경망 등 다양한 ML 알고리즘의 적용 사례를 다룹니다. ML 기반 접근법이 표적 예측에서 85%의 정확도를 달성하여 전통적 방법을 크게 능가함을 보여주며, 데이터 통합, 모델 해석 가능성, 검증 전략 등에서의 주요 과제를 식별합니다.',
    isSaved: false,
    citations: 89,
    impactFactor: 7.446,
    fullText: 'This is the full text content of the paper...',
    references: [
      'Brown, D. et al. (2023) "ML in Target Identification" Nature Methods, 34:234-256',
      'Davis, E. et al. (2023) "AI for Drug Discovery" Nature Biotechnology, 56:789-812'
    ],
    relatedPapers: [
      'AI Applications in Drug Discovery',
      'Machine Learning for Target Prediction',
      'Neural Networks in Pharmaceutical Research'
    ]
  }
]

export default function PaperDetailPage() {
  const params = useParams()
  const [paper, setPaper] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const paperId = params.id as string
    const foundPaper = mockPapers.find(p => p.id === paperId)
    if (foundPaper) {
      setPaper(foundPaper)
    }
    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">논문을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">논문을 찾을 수 없습니다</h1>
          <p className="text-gray-600">요청하신 논문이 존재하지 않거나 삭제되었을 수 있습니다.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PaperDetail paper={paper} />
      <Footer />
    </div>
  )
} 