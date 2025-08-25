'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CMSPage() {
  const router = useRouter()

  useEffect(() => {
    // CMS 로그인 상태 확인
    const cmsUser = localStorage.getItem('cmsUser')
    const isLoggedIn = localStorage.getItem('cmsLoggedIn')
    
    if (isLoggedIn && cmsUser) {
      // 로그인된 경우 대시보드로 이동
      router.push('/cms/dashboard')
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      router.push('/cms/login')
    }
  }, [router])

  // 로딩 중 표시
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">CMS 로딩 중...</p>
      </div>
    </div>
  )
} 