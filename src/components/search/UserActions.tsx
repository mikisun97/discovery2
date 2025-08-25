'use client'

import { useState } from 'react'
import { Heart, Share2, Download, Bookmark, User, Settings, LogOut, Eye, Clock, Star } from 'lucide-react'

interface UserActionsProps {
  paperId: string
  isSaved: boolean
  onSave: (paperId: string) => void
  onShare: (paperId: string) => void
  onDownload: (paperId: string) => void
}

const UserActions = ({ paperId, isSaved, onSave, onShare, onDownload }: UserActionsProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [shareMethod, setShareMethod] = useState<'url' | 'email' | 'social'>('url')

  const handleShare = (paperId: string) => {
    const url = `${window.location.origin}/search?paper=${paperId}`
    setShareUrl(url)
    setShowShareModal(true)
    onShare(paperId)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('링크가 클립보드에 복사되었습니다!')
    } catch (err) {
      console.error('클립보드 복사 실패:', err)
    }
  }

  const shareViaEmail = () => {
    const subject = '논문 공유'
    const body = `다음 논문을 확인해보세요: ${shareUrl}`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const shareViaSocial = (platform: 'twitter' | 'linkedin' | 'facebook') => {
    const text = 'AI 기반 신약 개발 플랫폼에서 흥미로운 논문을 발견했습니다!'
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
    window.open(urls[platform], '_blank')
  }

  return (
    <>
      {/* 사용자 액션 버튼들 */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onSave(paperId)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isSaved
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
          <span>{isSaved ? '저장됨' : '저장'}</span>
        </button>
        
        <button
          onClick={() => handleShare(paperId)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
        >
          <Share2 className="h-4 w-4" />
          <span>공유</span>
        </button>
        
        <button
          onClick={() => onDownload(paperId)}
          className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
        >
          <Download className="h-4 w-4" />
          <span>다운로드</span>
        </button>

        {/* 사용자 메뉴 */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
          >
            <User className="h-4 w-4" />
            <span>내 정보</span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">사용자님</div>
                    <div className="text-sm text-gray-500">user@example.com</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Bookmark className="h-4 w-4" />
                    <span>저장된 논문</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Clock className="h-4 w-4" />
                    <span>최근 검색</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Star className="h-4 w-4" />
                    <span>즐겨찾기</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Settings className="h-4 w-4" />
                    <span>설정</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                    <LogOut className="h-4 w-4" />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">논문 공유</h3>
              
              {/* 공유 방법 선택 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">공유 방법 선택</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setShareMethod('url')}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      shareMethod === 'url'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">🔗</div>
                      <div className="text-sm font-medium">링크</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShareMethod('email')}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      shareMethod === 'email'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">📧</div>
                      <div className="text-sm font-medium">이메일</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setShareMethod('social')}
                    className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                      shareMethod === 'social'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">📱</div>
                      <div className="text-sm font-medium">소셜</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* 공유 방법별 내용 */}
              {shareMethod === 'url' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">공유 링크</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={shareUrl}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                      >
                        복사
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {shareMethod === 'email' && (
                <div className="space-y-4">
                  <p className="text-gray-600">이메일로 논문을 공유하시겠습니까?</p>
                  <button
                    onClick={shareViaEmail}
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    이메일 앱 열기
                  </button>
                </div>
              )}

              {shareMethod === 'social' && (
                <div className="space-y-4">
                  <p className="text-gray-600">소셜 미디어에 공유하기</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => shareViaSocial('twitter')}
                      className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => shareViaSocial('linkedin')}
                      className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => shareViaSocial('facebook')}
                      className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Facebook
                    </button>
                  </div>
                </div>
              )}

              {/* 닫기 버튼 */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserActions 