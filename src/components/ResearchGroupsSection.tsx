import Link from 'next/link'

const ResearchGroupsSection = () => {
  const researchGroups = [
    {
      id: 1,
      name: '1그룹',
      title: 'AI 기반 신약 후보물질 탐색',
      description: '머신러닝과 딥러닝 기술을 활용하여 새로운 신약 후보물질을 효율적으로 탐색하고 분석합니다.',
      focus: ['AI 모델링', '약물 설계', '분자 동역학'],
      color: 'from-blue-500 to-blue-600',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 2,
      name: '2그룹',
      title: '빅데이터 분석 및 시각화',
      description: '대용량 연구 데이터의 체계적 수집, 분석 및 직관적인 시각화를 통해 연구 인사이트를 도출합니다.',
      focus: ['데이터 마이닝', '통계 분석', '시각화'],
      color: 'from-green-500 to-green-600',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 3,
      name: '3그룹',
      title: '생물정보학 및 유전체학',
      description: '유전체 데이터 분석과 생물정보학적 접근을 통해 질병 메커니즘과 치료 표적을 연구합니다.',
      focus: ['유전체 분석', '생물정보학', '표적 발굴'],
      color: 'from-purple-500 to-purple-600',
      icon: (
        <div className="w-12 h-12 text-white flex items-center justify-center">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 8h8M8 12h8M8 16h8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6v2M12 18v2M6 12h2M18 12h2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )
    },
    {
      id: 4,
      name: '4그룹',
      title: '임상 연구 및 검증',
      description: 'AI로 발굴된 신약 후보물질의 임상적 유효성과 안전성을 검증하고 임상 연구를 진행합니다.',
      focus: ['임상 연구', '안전성 평가', '효능 검증'],
      color: 'from-orange-500 to-orange-600',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            연구 그룹별 전문 분야
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            각 연구 그룹은 전문 분야에 집중하여 AI 기반 신약 개발의 모든 과정을 
            체계적으로 연구하고 개발합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {researchGroups.map((group) => (
            <div key={group.id} className="card hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start space-x-6">
                <div className={`bg-gradient-to-br ${group.color} text-white p-4 rounded-xl group-hover:scale-110 transition-transform duration-200`}>
                  {group.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {group.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {group.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {group.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">주요 연구 분야:</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.focus.map((item, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    href={`/research/group${group.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-transform duration-200"
                  >
                    연구 내용 자세히 보기
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/research" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
            모든 연구 분야 보기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ResearchGroupsSection 