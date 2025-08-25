'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3,
  FileText, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Edit,
  Eye,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Search as SearchIcon,
  Zap,
  Database,
  Workflow,
  Play,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Grid3X3,
  Heart,
  Shield,
  Layout,
  UserCheck,
  Cog,
  ChevronUp,
  ChevronDown,
  FileText as FileTextIcon,
  Users as UsersIcon,
  Bell,
  FolderOpen,
  BarChart,
  Eye as EyeIcon
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

export default function CMSDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    papers: false,
    news: false,
    content: false,
    users: false,
    system: false
  })

  useEffect(() => {
    const cmsUser = localStorage.getItem('cmsUser')
    const isLoggedIn = localStorage.getItem('cmsLoggedIn')
    
    if (!isLoggedIn || !cmsUser) {
      router.push('/cms/login')
      return
    }

    setUser(JSON.parse(cmsUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('cmsUser')
    localStorage.removeItem('cmsLoggedIn')
    router.push('/cms/login')
  }

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  const handleMenuSelect = (menuId: string) => {
    setActiveTab(menuId)
    // 선택된 메뉴의 부모 메뉴를 자동으로 확장
    const parentMenu = navigation.find(item =>
      item.subItems && item.subItems.some(subItem => subItem.id === menuId)
    )
    if (parentMenu) {
      setExpandedMenus(prev => ({
        ...prev,
        [parentMenu.id]: true
      }))
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // 목업 데이터
  const stats = {
    totalUsers: 1247,
    totalPapers: 8563,
    totalSearches: 15420,
    activeUsers: 89
  }

  const recentPapers = [
    { id: 1, title: 'AI-Driven Drug Discovery: A Comprehensive Review', status: 'published', views: 1247, date: '2024-01-15' },
    { id: 2, title: 'Machine Learning in Pharmaceutical Research', status: 'pending', views: 892, date: '2024-01-14' },
    { id: 3, title: 'Big Data Analysis in Drug Development', status: 'published', views: 1567, date: '2024-01-13' },
    { id: 4, title: 'Neural Networks for Drug Target Prediction', status: 'review', views: 634, date: '2024-01-12' }
  ]

  const executionHistory = [
    { id: 1, workflow: 'Flow', status: 'completed', startedAt: '2025. 7. 31. 오후 4:49:13', completedAt: '2025. 7. 31. 오후 4:49:13', duration: '0s', dataVolume: '522 B', apiCalls: 3, recordsProcessed: 13, executionTime: '4.5s' },
    { id: 2, workflow: 'Flow', status: 'completed', startedAt: '2025. 7. 31. 오전 8:48:23', completedAt: '2025. 7. 31. 오전 8:48:23', duration: '0s', dataVolume: '429 B', apiCalls: 2, recordsProcessed: 11, executionTime: '3.0s' },
    { id: 3, workflow: 'Flow', status: 'completed', startedAt: '2025. 7. 31. 오전 8:38:11', completedAt: '2025. 7. 31. 오전 8:38:11', duration: '0s', dataVolume: '569 B', apiCalls: 2, recordsProcessed: 18, executionTime: '4.4s' },
    { id: 4, workflow: 'Flow', status: 'completed', startedAt: '2025. 7. 31. 오전 8:36:59', completedAt: '2025. 7. 31. 오전 8:36:59', duration: '0s', dataVolume: '658 B', apiCalls: 3, recordsProcessed: 20, executionTime: '8.2s' },
    { id: 5, workflow: 'Flow', status: 'completed', startedAt: '2025. 7. 31. 오전 8:34:21', completedAt: '2025. 7. 31. 오전 8:34:21', duration: '0s', dataVolume: '586 B', apiCalls: 3, recordsProcessed: 14, executionTime: '12.7s' },
    { id: 6, workflow: 'Untitled Flow', status: 'completed', startedAt: '2025. 7. 30. 오전 10:04:37', completedAt: '2025. 7. 30. 오전 10:04:37', duration: '0s', dataVolume: '12.95 KB', apiCalls: 2, recordsProcessed: 428, executionTime: '24.3s' },
    { id: 7, workflow: 'Untitled Flow', status: 'completed', startedAt: '2025. 7. 30. 오전 9:48:03', completedAt: '2025. 7. 30. 오전 9:48:03', duration: '0s', dataVolume: '12.95 KB', apiCalls: 2, recordsProcessed: 428, executionTime: '1m 10s' },
    { id: 8, workflow: 'Untitled Flow', status: 'completed', startedAt: '2025. 7. 30. 오전 8:58:48', completedAt: '2025. 7. 30. 오전 8:58:48', duration: '0s', dataVolume: '12.95 KB', apiCalls: 2, recordsProcessed: 428, executionTime: '43.5s' },
    { id: 9, workflow: 'Untitled Flow', status: 'completed', startedAt: '2025. 7. 30. 오전 8:53:20', completedAt: '2025. 7. 30. 오전 8:53:20', duration: '0s', dataVolume: '12.95 KB', apiCalls: 2, recordsProcessed: 428, executionTime: '41.9s' },
    { id: 10, workflow: 'Untitled Flow', status: 'completed', startedAt: '2025. 7. 30. 오전 8:31:40', completedAt: '2025. 7. 30. 오전 8:31:40', duration: '0s', dataVolume: '14.03 KB', apiCalls: 2, recordsProcessed: 427, executionTime: '38.6s' }
  ]

  const navigation = [
    { 
      id: 'overview', 
      name: '대시보드', 
      icon: Grid3X3, 
      description: '전체 현황 및 통계'
    },
    { 
      id: 'papers', 
      name: '논문 관리', 
      icon: Database, 
      description: '논문 등록 및 관리',
      subItems: [
        { id: 'paper-collection', name: '논문 수집', icon: FileTextIcon },
        { id: 'paper-database', name: '논문 데이터베이스', icon: Database }
      ]
    },
    { 
      id: 'news', 
      name: '소식 관리', 
      icon: Heart, 
      description: '소식 및 공지사항 관리',
      subItems: [
        { id: 'announcements', name: '공지사항', icon: Heart },
        { id: 'job-postings', name: '채용공고', icon: Heart },
        { id: 'event-info', name: '행사안내', icon: Heart },
        { id: 'news', name: '뉴스', icon: Heart },
        { id: 'resource-center', name: '자료실', icon: Heart }
      ]
    },
    { 
      id: 'content', 
      name: '콘텐츠 관리', 
      icon: FileText, 
      description: '콘텐츠 및 연구 정보 관리',
      subItems: [
        { id: 'introduction', name: '소개글 관리', icon: FileTextIcon },
        { id: 'research-content', name: '연구 내용 관리', icon: FileTextIcon },
        { id: 'research-areas', name: '연구 분야', icon: FileTextIcon },
        { id: 'research-groups', name: '연구 그룹', icon: UsersIcon },
        { id: 'member-info', name: '구성원 정보 관리', icon: FileTextIcon },
        { id: 'participating-professors', name: '참여교수', icon: UsersIcon },
        { id: 'members', name: 'Members', icon: UsersIcon },
        { id: 'menu-structure', name: '메뉴 구조 관리', icon: FileTextIcon },
        { id: 'popup-management', name: '팝업 관리', icon: Bell }
      ]
    },
    { 
      id: 'users', 
      name: '사용자 관리', 
      icon: Users, 
      description: '사용자 계정 및 권한 관리',
      subItems: [
        { id: 'user-accounts', name: '사용자 계정', icon: UsersIcon },
        { id: 'permissions', name: '권한 관리', icon: Shield },
        { id: 'user-groups', name: '사용자 그룹', icon: UsersIcon }
      ]
    },
    { 
      id: 'system', 
      name: '시스템 관리', 
      icon: Cog, 
      description: '시스템 설정 및 관리',
      subItems: [
        { id: 'system-environment', name: '시스템 환경', icon: Cog },
        { id: 'security-settings', name: '보안 설정', icon: Shield },
        { id: 'performance-metrics', name: '성능 지표', icon: BarChart },
        { id: 'log-management', name: '통합 로그 관리', icon: EyeIcon }
      ]
    }
  ]

  // 차트 데이터
  const chartData = {
    // 월별 논문 수집 현황
    monthlyCollection: [
      { month: '1월', collected: 45, failed: 3, pending: 8 },
      { month: '2월', collected: 52, failed: 2, pending: 5 },
      { month: '3월', collected: 38, failed: 4, pending: 12 },
      { month: '4월', collected: 67, failed: 1, pending: 3 },
      { month: '5월', collected: 58, failed: 2, pending: 7 },
      { month: '6월', collected: 73, failed: 0, pending: 4 }
    ],
    
    // 수집 소스별 분포
    sourceDistribution: [
      { name: 'PubMed', value: 35, color: '#3B82F6' },
      { name: 'Google Scholar', value: 28, color: '#10B981' },
      { name: 'arXiv', value: 22, color: '#F59E0B' },
      { name: 'ScienceDirect', value: 15, color: '#EF4444' }
    ],
    
    // 일별 수집 현황 (최근 30일)
    dailyCollection: [
      { date: '6/1', collected: 12, target: 15 },
      { date: '6/2', collected: 18, target: 15 },
      { date: '6/3', collected: 14, target: 15 },
      { date: '6/4', collected: 16, target: 15 },
      { date: '6/5', collected: 13, target: 15 },
      { date: '6/6', collected: 19, target: 15 },
      { date: '6/7', collected: 15, target: 15 },
      { date: '6/8', collected: 17, target: 15 },
      { date: '6/9', collected: 14, target: 15 },
      { date: '6/10', collected: 20, target: 15 },
      { date: '6/11', collected: 16, target: 15 },
      { date: '6/12', collected: 18, target: 15 },
      { date: '6/13', collected: 13, target: 15 },
      { date: '6/14', collected: 15, target: 15 },
      { date: '6/15', collected: 17, target: 15 },
      { date: '6/16', collected: 19, target: 15 },
      { date: '6/17', collected: 14, target: 15 },
      { date: '6/18', collected: 16, target: 15 },
      { date: '6/19', collected: 18, target: 15 },
      { date: '6/20', collected: 15, target: 15 },
      { date: '6/21', collected: 17, target: 15 },
      { date: '6/22', collected: 20, target: 15 },
      { date: '6/23', collected: 16, target: 15 },
      { date: '6/24', collected: 14, target: 15 },
      { date: '6/25', collected: 18, target: 15 },
      { date: '6/26', collected: 19, target: 15 },
      { date: '6/27', collected: 15, target: 15 },
      { date: '6/28', collected: 17, target: 15 },
      { date: '6/29', collected: 20, target: 15 },
      { date: '6/30', collected: 16, target: 15 }
    ],
    
    // 연구 분야별 분포
    researchFieldDistribution: [
      { field: '신약 후보물질', papers: 156, percentage: 32 },
      { field: '생물정보학', papers: 134, percentage: 28 },
      { field: '유전체학', papers: 98, percentage: 20 },
      { field: '약물동태학', papers: 67, percentage: 14 },
      { field: '기타', papers: 35, percentage: 6 }
    ],
    
    // 수집 성공률 추이
    successRateTrend: [
      { month: '1월', successRate: 94.2, totalPapers: 48 },
      { month: '2월', successRate: 96.3, totalPapers: 54 },
      { month: '3월', successRate: 90.5, totalPapers: 42 },
      { month: '4월', successRate: 98.5, totalPapers: 68 },
      { month: '5월', successRate: 96.6, totalPapers: 60 },
      { month: '6월', successRate: 100.0, totalPapers: 73 }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const renderMenuItem = (item: any, level: number = 0) => {
    const Icon = item.icon
    const isActive = activeTab === item.id
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedMenus[item.id] || false

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasSubItems) {
              toggleMenu(item.id)
            } else {
              handleMenuSelect(item.id)
            }
          }}
          className={`w-full group relative`}
        >
          <div className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
            isActive
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}>
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${
                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
              <span className="font-medium text-sm">{item.name}</span>
            </div>
            {hasSubItems && (
              <div className="flex items-center">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </div>
            )}
          </div>
        </button>
        
        {/* 서브메뉴 */}
        {hasSubItems && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem: any) => {
              const SubIcon = subItem.icon
              const isSubActive = activeTab === subItem.id
              
              return (
                <button
                  key={subItem.id}
                  onClick={() => handleMenuSelect(subItem.id)}
                  className="w-full group relative"
                >
                  <div className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isSubActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}>
                    <SubIcon className={`h-4 w-4 ${
                      isSubActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    <span className="text-sm">{subItem.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div className={`fixed top-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* 사이드바 헤더 */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div className="text-xl font-bold text-gray-900">신약개발센터</div>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* 네비게이션 메뉴 - 중간 영역 */}
        <nav className="px-4 py-6 space-y-1 flex-1 overflow-y-auto">
          {navigation.map((item) => renderMenuItem(item))}
        </nav>

        {/* 사용자 정보 및 로그아웃 - 하단 고정 */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center space-x-3 px-3 py-3">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">{user.username.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.username}</p>
              <p className="text-xs text-gray-500 truncate">{user.email || 'admin@example.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72">
        {/* 상단 헤더 */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="h-6 w-6 text-gray-500" />
              </button>
              
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">
                  {activeTab === 'overview' && '대시보드'}
                  {activeTab === 'papers' && '논문 관리'}
                  {activeTab === 'paper-collection' && '논문 수집'}
                  {activeTab === 'paper-database' && '논문 데이터베이스'}
                  {activeTab === 'news' && '소식 관리'}
                  {activeTab === 'announcements' && '공지사항'}
                  {activeTab === 'job-postings' && '채용공고'}
                  {activeTab === 'event-info' && '행사안내'}
                  {activeTab === 'resource-center' && '자료실'}
                  {activeTab === 'content' && '콘텐츠 관리'}
                  {activeTab === 'introduction' && '소개글 관리'}
                  {activeTab === 'research-content' && '연구 내용 관리'}
                  {activeTab === 'research-areas' && '연구 분야'}
                  {activeTab === 'research-groups' && '연구 그룹'}
                  {activeTab === 'member-info' && '구성원 정보 관리'}
                  {activeTab === 'participating-professors' && '참여교수'}
                  {activeTab === 'members' && 'Members'}
                  {activeTab === 'menu-structure' && '메뉴 구조 관리'}
                  {activeTab === 'popup-management' && '팝업 관리'}
                  {activeTab === 'users' && '사용자 관리'}
                  {activeTab === 'user-accounts' && '사용자 계정'}
                  {activeTab === 'permissions' && '권한 관리'}
                  {activeTab === 'user-groups' && '사용자 그룹'}
                  {activeTab === 'system' && '시스템 관리'}
                  {activeTab === 'system-environment' && '시스템 환경'}
                  {activeTab === 'security-settings' && '보안 설정'}
                  {activeTab === 'performance-metrics' && '성능 지표'}
                  {activeTab === 'log-management' && '통합 로그 관리'}
                  {!['overview', 'papers', 'paper-collection', 'paper-database', 'news', 'announcements', 'job-postings', 'event-info', 'resource-center', 'content', 'introduction', 'research-content', 'research-areas', 'research-groups', 'member-info', 'participating-professors', 'members', 'menu-structure', 'popup-management', 'users', 'user-accounts', 'permissions', 'user-groups', 'system', 'system-environment', 'security-settings', 'performance-metrics', 'log-management'].includes(activeTab) && '대시보드'}
                </h1>
                <p className="text-sm text-gray-500">
                  {activeTab === 'overview' && '전체 현황 및 통계'}
                  {activeTab === 'papers' && '논문 등록 및 관리'}
                  {activeTab === 'paper-collection' && '다양한 경로를 통한 논문 메타데이터 수집 및 관리'}
                  {activeTab === 'paper-database' && '수집된 논문의 저장, 검색, 관리'}
                  {activeTab === 'news' && '소식 및 공지사항 관리'}
                  {activeTab === 'announcements' && '센터 관련 각종 안내 사항'}
                  {activeTab === 'job-postings' && 'Fellow 관련 사항'}
                  {activeTab === 'event-info' && '각종 행사 일정 및 사진'}
                  {activeTab === 'resource-center' && '연구 자료'}
                  {activeTab === 'content' && '콘텐츠 및 연구 정보 관리'}
                  {activeTab === 'introduction' && '센터 소개 및 센터장 인사말'}
                  {activeTab === 'research-content' && '센터 총괄 내용 기재'}
                  {activeTab === 'research-areas' && '센터 총괄 내용 기재'}
                  {activeTab === 'research-groups' && '그룹별 연구내용'}
                  {activeTab === 'member-info' && '구성원 정보 관리'}
                  {activeTab === 'participating-professors' && '교수 탭을 눌렀을 때 이력 및 메일로 연결되는 링크 연결'}
                  {activeTab === 'members' && '연구 지원 인력'}
                  {activeTab === 'menu-structure' && '메뉴 구조 관리'}
                  {activeTab === 'popup-management' && '팝업 관리'}
                  {activeTab === 'users' && '사용자 계정 및 권한 관리'}
                  {activeTab === 'user-accounts' && '사용자 계정 관리'}
                  {activeTab === 'permissions' && '권한 관리'}
                  {activeTab === 'user-groups' && '사용자 그룹 관리'}
                  {activeTab === 'system' && '시스템 설정 및 관리'}
                  {activeTab === 'system-environment' && '시스템 환경 설정'}
                  {activeTab === 'security-settings' && '보안 설정'}
                  {activeTab === 'performance-metrics' && '성능 지표 모니터링'}
                  {activeTab === 'log-management' && '통합 로그 관리'}
                  {!['overview', 'papers', 'paper-collection', 'paper-database', 'news', 'announcements', 'job-postings', 'event-info', 'resource-center', 'content', 'introduction', 'research-content', 'research-areas', 'research-groups', 'member-info', 'participating-professors', 'members', 'menu-structure', 'popup-management', 'users', 'user-accounts', 'permissions', 'user-groups', 'system', 'system-environment', 'security-settings', 'performance-metrics', 'log-management'].includes(activeTab) && '전체 현황 및 통계'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                <Clock className="h-4 w-4" />
                <span>{new Date().toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 환영 메시지 */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Workflow className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">안녕하세요, {user.username}님!</h2>
                    <p className="text-blue-700">AI 기반 신약 개발 플랫폼 관리 콘솔에 오신 것을 환영합니다.</p>
                  </div>
                </div>
              </div>

              {/* 핵심 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">총 논문 수</p>
                        <p className="text-3xl font-bold text-gray-900">8,563</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-medium">+127</span>
                      <span className="text-gray-500 ml-1">오늘</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">수집 대기 중</p>
                        <p className="text-3xl font-bold text-gray-900">23</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-600 font-medium">-5</span>
                      <span className="text-gray-500 ml-1">어제</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">수집 오류</p>
                        <p className="text-3xl font-bold text-gray-900">5</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-600 font-medium">+2</span>
                      <span className="text-gray-500 ml-1">이번 주</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">활성 사용자</p>
                        <p className="text-3xl font-bold text-gray-900">89</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 font-medium">+12</span>
                      <span className="text-gray-500 ml-1">이번 달</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 논문 수집 현황 및 최근 활동 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 논문 수집 현황 */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>논문 수집 현황</CardTitle>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        전체 보기
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                  


                  {/* 수집 상태 요약 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">PubMed Central</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">45</p>
                        <p className="text-xs text-gray-500">오늘 수집</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium">arXiv</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">23</p>
                        <p className="text-xs text-gray-500">진행 중</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">ScienceDirect</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">3</p>
                        <p className="text-xs text-gray-500">오류</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Google Scholar</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">56</p>
                        <p className="text-xs text-gray-500">완료</p>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>

                {/* 최근 수집된 논문 */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle>최근 수집된 논문</CardTitle>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        전체 보기
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                          AI-Driven Drug Discovery: A Comprehensive Review
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>PubMed Central</span>
                          <span>2시간 전</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                          Machine Learning in Pharmaceutical Research
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>arXiv</span>
                          <span>4시간 전</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                          Big Data Analysis in Drug Development
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>ScienceDirect</span>
                          <span>6시간 전</span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                          Neural Networks for Drug Target Prediction
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Google Scholar</span>
                          <span>8시간 전</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 빠른 액션 */}
              <Card>
                <CardHeader>
                  <CardTitle>빠른 액션</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex flex-col items-center space-y-2 p-4 h-auto bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-blue-900">수동 수집 실행</div>
                        <div className="text-sm text-blue-700">즉시 논문 수집</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex flex-col items-center space-y-2 p-4 h-auto bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 transition-all duration-200 group">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-900">새 수집 작업</div>
                        <div className="text-sm text-green-700">수집 작업 생성</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex flex-col items-center space-y-2 p-4 h-auto bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Settings className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-900">수집 설정</div>
                        <div className="text-sm text-purple-700">키워드 및 스케줄</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex flex-col items-center space-y-2 p-4 h-auto bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-900">수집 통계</div>
                        <div className="text-sm text-orange-700">상세 분석 리포트</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 추가 차트 섹션 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 월별 수집 현황 차트 */}
                <Card>
                  <CardHeader>
                    <CardTitle>월별 수집 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsBarChart data={chartData.monthlyCollection}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="collected" fill="#3b82f6" name="수집 완료" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="failed" fill="#ef4444" name="수집 실패" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pending" fill="#f59e0b" name="수집 대기" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* 수집 성공률 추이 차트 */}
                <Card>
                  <CardHeader>
                    <CardTitle>수집 성공률 추이</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData.successRateTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                        <YAxis stroke="#6b7280" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="successRate" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                          name="성공률 (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* 시스템 상태 및 알림 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 시스템 상태 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">시스템 상태</h3>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">논문 수집 서비스</span>
                      <span className="text-sm font-medium text-green-600">정상</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">데이터베이스 연결</span>
                      <span className="text-sm font-medium text-green-600">정상</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API 연동 상태</span>
                      <span className="text-sm font-medium text-green-600">정상</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">스케줄러</span>
                      <span className="text-sm font-medium text-green-600">정상</span>
                    </div>
                  </div>
                </div>

                {/* 최근 알림 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">최근 알림</h3>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors duration-200">
                      전체 보기
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-900">ScienceDirect 수집 오류</p>
                        <p className="text-xs text-red-700">API 연결 실패 - 2시간 전</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">일일 수집 완료</p>
                        <p className="text-xs text-green-700">127개 논문 수집 완료 - 4시간 전</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900">중복 방지 알림</p>
                        <p className="text-xs text-blue-700">89개 중복 논문 방지 - 6시간 전</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 연구 분야별 분포 차트 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">연구 분야별 논문 분포</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 파이 차트 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">분야별 비율</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={chartData.researchFieldDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="papers"
                        >
                          {chartData.researchFieldDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 막대 차트 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">분야별 논문 수</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsBarChart data={chartData.researchFieldDistribution} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" stroke="#6b7280" fontSize={12} />
                        <YAxis dataKey="field" type="category" stroke="#6b7280" fontSize={11} width={80} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar 
                          dataKey="papers" 
                          fill="#3b82f6" 
                          radius={[0, 4, 4, 0]}
                          name="논문 수"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 논문 관리 관련 페이지들 */}
          {(activeTab === 'papers' || activeTab === 'paper-collection' || activeTab === 'paper-database') && (
            <div className="space-y-6">
              {activeTab === 'papers' && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">논문 관리</h2>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                      <Plus className="h-5 w-5" />
                      <span>새 논문 추가</span>
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">논문 관리 기능</h3>
                      <p className="text-gray-500 mb-6">논문 등록, 수정, 삭제 및 상태 관리를 위한 기능이 개발 중입니다.</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                        <Zap className="h-4 w-4" />
                        <span>곧 업데이트 예정</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'paper-collection' && (
                <div className="space-y-6">
                  {/* 수집 현황 카드 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">오늘 수집된 논문</p>
                          <p className="text-3xl font-bold text-blue-600">127</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">수집 대기 중</p>
                          <p className="text-3xl font-bold text-yellow-600">23</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">수집 오류</p>
                          <p className="text-3xl font-bold text-red-600">5</p>
                        </div>
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">중복 방지된 논문</p>
                          <p className="text-3xl font-bold text-green-600">89</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Shield className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 수집 설정 및 관리 */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 수집 대상 사이트 관리 */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">수집 대상 사이트</h3>
                        <div className="flex items-center space-x-2">
                          <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all duration-200 text-sm flex items-center space-x-1">
                            <Play className="h-3 w-3" />
                            <span>수동 수집</span>
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors duration-200">
                            설정
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">PubMed Central</span>
                          </div>
                          <span className="text-xs text-gray-500">API 연동</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">arXiv</span>
                          </div>
                          <span className="text-xs text-gray-500">API 연동</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">ScienceDirect</span>
                          </div>
                          <span className="text-xs text-gray-500">API 연동</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm font-medium">Google Scholar</span>
                          </div>
                          <span className="text-xs text-gray-500">크롤링</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">* 광주과학기술원과 합의된 4개 사이트</p>
                    </div>

                    {/* 수집 스케줄 관리 */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">수집 스케줄</h3>
                        <div className="flex items-center space-x-2">
                          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm flex items-center space-x-1">
                            <Plus className="h-3 w-3" />
                            <span>새 스케줄</span>
                          </button>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors duration-200">
                            편집
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">일일 자동 수집</p>
                            <p className="text-xs text-gray-500">매일 오전 2시</p>
                          </div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">주간 키워드 수집</p>
                            <p className="text-xs text-gray-500">매주 일요일 오전 3시</p>
                          </div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">월간 전체 업데이트</p>
                            <p className="text-xs text-gray-500">매월 1일 오전 4시</p>
                          </div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 수집 작업 현황 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>최근 수집 작업 현황</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>작업 ID</TableHead>
                              <TableHead>수집 대상</TableHead>
                              <TableHead>상태</TableHead>
                              <TableHead>시작 시간</TableHead>
                              <TableHead>완료 시간</TableHead>
                              <TableHead>수집된 논문</TableHead>
                              <TableHead>중복 방지</TableHead>
                              <TableHead>오류</TableHead>
                              <TableHead>작업</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">#12345</TableCell>
                              <TableCell>PubMed Central</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>
                              </TableCell>
                              <TableCell>2024-01-15 02:00</TableCell>
                              <TableCell>2024-01-15 02:45</TableCell>
                              <TableCell>45</TableCell>
                              <TableCell>12</TableCell>
                              <TableCell>0</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">상세보기</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">#12344</TableCell>
                              <TableCell>arXiv</TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">진행중</Badge>
                              </TableCell>
                              <TableCell>2024-01-15 03:00</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>23</TableCell>
                              <TableCell>8</TableCell>
                              <TableCell>0</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">중지</Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">#12343</TableCell>
                              <TableCell>ScienceDirect</TableCell>
                              <TableCell>
                                <Badge variant="destructive">오류</Badge>
                              </TableCell>
                              <TableCell>2024-01-15 01:00</TableCell>
                              <TableCell>2024-01-15 01:15</TableCell>
                              <TableCell>0</TableCell>
                              <TableCell>0</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">재시도</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 수집 설정 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>수집 설정</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">키워드 설정</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Input type="text" placeholder="키워드 입력" className="flex-1" />
                              <Button size="sm">추가</Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">AI</Badge>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Drug Discovery</Badge>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Machine Learning</Badge>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pharmaceutical</Badge>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">언어 설정</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="english" defaultChecked />
                              <label htmlFor="english" className="text-sm text-gray-700">영문 논문</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="korean" defaultChecked />
                              <label htmlFor="korean" className="text-sm text-gray-700">한글 논문</label>
                            </div>
                          </div>
                        </div>
                        </div>
                      </CardContent>
                    </Card>
                </div>
              )}

              {activeTab === 'paper-database' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">논문 데이터베이스</h2>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                      <Plus className="h-5 w-5" />
                      <span>새 논문 추가</span>
                    </button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-8">
                      <div className="text-center">
                        <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">논문 데이터베이스 기능</h3>
                        <p className="text-gray-500 mb-6">수집된 논문의 저장, 검색, 관리 기능이 개발 중입니다.</p>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                          <Zap className="h-4 w-4" />
                          <span>곧 업데이트 예정</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* 소식 관리 관련 페이지들 */}
          {(activeTab === 'news' || activeTab === 'announcements' || activeTab === 'job-postings' || activeTab === 'event-info' || activeTab === 'resource-center') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">소식 관리</h2>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                  <Plus className="h-5 w-5" />
                  <span>새 소식 추가</span>
                </button>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">소식 관리 기능</h3>
                    <p className="text-gray-500 mb-6">공지사항, 채용공고, 행사안내, 뉴스, 자료실 관리를 위한 기능이 개발 중입니다.</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                      <Zap className="h-4 w-4" />
                      <span>곧 업데이트 예정</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 콘텐츠 관리 관련 페이지들 */}
          {(activeTab === 'content' || activeTab === 'introduction' || activeTab === 'research-content' || activeTab === 'research-areas' || activeTab === 'research-groups' || activeTab === 'member-info' || activeTab === 'participating-professors' || activeTab === 'members' || activeTab === 'menu-structure' || activeTab === 'popup-management') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">콘텐츠 관리</h2>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                  <Plus className="h-5 w-5" />
                  <span>새 콘텐츠 추가</span>
                </button>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">콘텐츠 관리 기능</h3>
                    <p className="text-gray-500 mb-6">소개글, 연구 내용, 연구 분야, 연구 그룹, 구성원 정보, 참여교수, 메뉴 구조, 팝업 관리를 위한 기능이 개발 중입니다.</p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                      <Zap className="h-4 w-4" />
                      <span>곧 업데이트 예정</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* 사용자 관리 관련 페이지들 */}
          {(activeTab === 'users' || activeTab === 'user-accounts' || activeTab === 'permissions' || activeTab === 'user-groups') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">사용자 관리</h2>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                  <Plus className="h-5 w-5" />
                  <span>새 사용자 추가</span>
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">사용자 관리 기능</h3>
                  <p className="text-gray-500 mb-6">사용자 계정 생성, 권한 관리, 사용자 그룹 관리를 위한 기능이 개발 중입니다.</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Zap className="h-4 w-4" />
                    <span>곧 업데이트 예정</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 시스템 관리 관련 페이지들 */}
          {(activeTab === 'system' || activeTab === 'system-environment' || activeTab === 'security-settings' || activeTab === 'performance-metrics' || activeTab === 'log-management') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">시스템 관리</h2>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl">
                  <Settings className="h-5 w-5" />
                  <span>시스템 설정</span>
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <Cog className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">시스템 관리 기능</h3>
                  <p className="text-gray-500 mb-6">시스템 환경, 보안 설정, 성능 지표, 통합 로그 관리를 위한 기능이 개발 중입니다.</p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Zap className="h-4 w-4" />
                    <span>곧 업데이트 예정</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 