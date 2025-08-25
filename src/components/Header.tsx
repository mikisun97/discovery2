'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, LogOut, Settings, BookMarked, Shield } from 'lucide-react'

const Header = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    // 로그인 상태 확인
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('user')
      
      if (loginStatus === 'true' && userData) {
        setIsLoggedIn(true)
        setUser(JSON.parse(userData))
      }
    }

    checkLoginStatus()
    
    // 페이지 변경 시에도 상태 확인
    window.addEventListener('storage', checkLoginStatus)
    return () => window.removeEventListener('storage', checkLoginStatus)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    localStorage.removeItem('savedPapers')
    setIsLoggedIn(false)
    setUser(null)
    setShowUserMenu(false)
    router.push('/')
  }

  const navigation = [
    {
      name: '소개',
      href: '/about',
      subItems: [
        { name: '센터소개', href: '/about/center', description: '센터 소개 및 센터장 인사말' },
        { name: '비전', href: '/about/vision', description: '센터 전체 구상도' },
        { name: '네트워크', href: '/about/network', description: '국제 협력 네트워크 구성' },
        { name: '조직도', href: '/about/organization', description: '그룹별 참여인원' },
        { name: '연혁', href: '/about/history', description: '과거 순으로 작성' },
        { name: '찾아오시는길', href: '/about/contact', description: '위치 및 연락처' },
      ]
    },
    {
      name: '연구',
      href: '/research',
      subItems: [
        { name: '연구분야', href: '/research/areas', description: '센터 총괄 내용 기재' },
        { name: '1그룹', href: '/research/group1', description: '그룹별 연구내용' },
        { name: '2그룹', href: '/research/group2', description: '그룹별 연구내용' },
        { name: '3그룹', href: '/research/group3', description: '그룹별 연구내용' },
        { name: '4그룹', href: '/research/group4', description: '그룹별 연구내용' },
      ]
    },
    {
      name: '구성원',
      href: '/members',
      subItems: [
        { name: '참여교수', href: '/members/professors', description: '교수 탭을 눌렀을 때 이력 및 메일로 연결되는 링크 연결' },
        { name: 'Members', href: '/members/staff', description: '연구 지원 인력' },
      ]
    },
    {
      name: '검색',
      href: '/search',
      subItems: [
        { name: 'Search', href: '/search', description: '논문 검색' },
      ]
    },
    {
      name: '소식',
      href: '/news',
      subItems: [
        { name: '공지사항', href: '/news/announcements', description: '센터 관련 각종 안내 사항' },
        { name: '채용공고', href: '/news/jobs', description: 'Fellow 관련 사항' },
        { name: '행사안내', href: '/news/events', description: '각종 행사 일정 및 사진' },
        { name: '뉴스', href: '/news/press', description: '보도 자료' },
        { name: '자료실', href: '/news/resources', description: '연구 자료' },
      ]
    },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">신약개발센터</h1>
                <p className="text-sm text-gray-500">AI 기반 빅데이터 분석 플랫폼</p>
              </div>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex space-x-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="nav-link flex items-center space-x-1">
                    <span>{item.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* 드롭다운 메뉴 */}
                  <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="font-medium text-gray-900">{subItem.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{subItem.description}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* 로그인/사용자 메뉴 */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 사용자 드롭다운 메뉴 */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user?.name}</div>
                          <div className="text-sm text-gray-500">{user?.email}</div>
                          <div className="text-xs text-gray-400">{user?.institution}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/mypage"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>마이페이지</span>
                      </Link>
                      <Link
                        href="/mypage/saved"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BookMarked className="h-4 w-4" />
                        <span>저장된 논문</span>
                      </Link>
                      <Link
                        href="/mypage/settings"
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="h-4 w-4" />
                        <span>설정</span>
                      </Link>
                      
                      {/* CMS 링크 (관리자용) */}
                      {(user?.username === 'admin' || user?.username === 'editor' || user?.username === 'analyst') && (
                        <Link
                          href="/cms/dashboard"
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-purple-700 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="h-4 w-4" />
                          <span>CMS 관리</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>로그아웃</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary-700 hover:to-blue-700 transition-all duration-200"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="font-medium text-gray-900 px-3 py-2">{item.name}</div>
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-6 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 