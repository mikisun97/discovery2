import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 왼쪽 콘텐츠 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                AI 기반 신약 개발
                <span className="block text-primary-200">빅데이터 분석 플랫폼</span>
              </h1>
              <p className="text-xl lg:text-2xl text-primary-100 leading-relaxed">
                중대분자 사이즈의 신약 개발을 위한 혁신적인 AI 기술과 빅데이터 분석으로 
                새로운 치료제 개발의 가능성을 확장합니다.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/search" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                논문 검색 시작하기
              </Link>
              <Link href="/about" className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                센터 소개 보기
              </Link>
            </div>
            
            {/* 통계 정보 */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">4</div>
                <div className="text-sm text-primary-100">연구 그룹</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">100+</div>
                <div className="text-sm text-primary-100">참여 연구자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-200">AI</div>
                <div className="text-sm text-primary-100">기반 분석</div>
              </div>
            </div>
          </div>
          
          {/* 오른쪽 이미지/일러스트레이션 */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  {/* AI 분석 시각화 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">AI 기반 분석</div>
                      <div className="text-sm text-primary-200">빅데이터 처리 및 패턴 인식</div>
                    </div>
                  </div>
                  
                  {/* 신약 개발 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 text-white flex items-center justify-center">
                        <div className="w-4 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">신약 후보물질</div>
                      <div className="text-sm text-primary-200">효율적인 탐색 및 분석</div>
                    </div>
                  </div>
                  
                  {/* 협력 네트워크 */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-white">국제 협력</div>
                      <div className="text-sm text-primary-200">산학연 협력 체계 구축</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 배경 장식 요소 */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-300 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 