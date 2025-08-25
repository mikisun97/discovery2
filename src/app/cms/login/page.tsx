'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Workflow, Eye, EyeOff } from 'lucide-react'

export default function CMSLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: 'admin',
    password: 'admin123'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // 간단한 로그인 검증 (실제로는 API 호출)
    if (formData.username === 'admin' && formData.password === 'admin123') {
      // 로그인 성공
      const userData = {
        username: formData.username,
        role: '관리자',
        email: 'admin@example.com'
      }
      
      localStorage.setItem('cmsUser', JSON.stringify(userData))
      localStorage.setItem('cmsLoggedIn', 'true')
      
      router.push('/cms/dashboard')
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 페이지 로드 시 자동 로그인 시도
  useEffect(() => {
    // 기본 계정으로 자동 로그인 시도
    const autoLogin = async () => {
      setIsLoading(true)
      
      // 잠시 대기 후 자동 로그인 실행
      setTimeout(() => {
        const userData = {
          username: 'admin',
          role: '관리자',
          email: 'admin@example.com'
        }
        
        localStorage.setItem('cmsUser', JSON.stringify(userData))
        localStorage.setItem('cmsLoggedIn', 'true')
        
        router.push('/cms/dashboard')
      }, 1000) // 1초 후 자동 로그인
    }

    autoLogin()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
            <Workflow className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">신약개발센터 CMS</h2>
          <p className="mt-2 text-sm text-gray-600">
            관리자 콘솔에 로그인하세요
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? '자동 로그인 중...' : '로그인'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            기본 계정: admin / admin123
          </p>
          <p className="text-xs text-gray-400 mt-1">
            자동으로 로그인됩니다...
          </p>
        </div>
      </div>
    </div>
  )
} 