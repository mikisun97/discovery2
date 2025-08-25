# Discovery2 - 신약개발센터 논문 검색 및 관리 시스템

신약개발센터를 위한 AI 기반 논문 검색, 요약, 관리 시스템입니다.

## 🚀 주요 기능

### 📚 논문 검색 및 관리
- **AI 기반 논문 검색**: 자연어로 논문 검색
- **자동 요약**: AI가 논문을 한국어로 요약
- **개인 저장**: 관심 논문을 개인 계정에 저장
- **공유 기능**: 논문 링크 공유 및 내부 사용자 간 공유

### 🎯 CMS 관리 시스템
- **논문 수집 관리**: 다양한 소스에서 논문 자동 수집
- **사용자 관리**: 계정 및 권한 관리
- **통계 대시보드**: 수집 현황 및 시스템 모니터링
- **설정 관리**: 시스템 환경 및 보안 설정

### 💡 AI 기능
- **자연어 처리**: 한국어/영어 논문 자동 분석
- **키워드 추출**: 논문 핵심 키워드 자동 식별
- **요약 생성**: 논문 내용을 한국어로 요약
- **중복 방지**: DOI 기반 중복 논문 방지

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks
- **Authentication**: Local Storage 기반

## 📁 프로젝트 구조

```
Discovery2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # 인증 페이지
│   │   ├── cms/               # CMS 관리 시스템
│   │   ├── mypage/            # 마이페이지
│   │   ├── search/            # 검색 페이지
│   │   └── layout.tsx         # 루트 레이아웃
│   ├── components/            # 재사용 컴포넌트
│   │   ├── ui/               # shadcn/ui 컴포넌트
│   │   ├── Header.tsx        # 헤더 컴포넌트
│   │   ├── Footer.tsx        # 푸터 컴포넌트
│   │   └── search/           # 검색 관련 컴포넌트
│   └── lib/                  # 유틸리티 함수
├── public/                    # 정적 파일
├── package.json              # 프로젝트 의존성
└── README.md                 # 프로젝트 설명서
```

## 🚀 시작하기

### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/discovery2.git
cd discovery2
```

### 2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

### 3. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

### 4. 브라우저에서 확인
```
http://localhost:3000
```

## 🔐 기본 로그인 정보

### CMS 관리자 계정
- **아이디**: admin
- **비밀번호**: admin123
- **접속**: http://localhost:3000/cms

### 일반 사용자 계정
- **아이디**: user
- **비밀번호**: user123
- **접속**: http://localhost:3000/auth/login

## 📱 주요 페이지

### 🏠 메인 페이지
- 신약개발센터 소개
- 주요 연구 분야 안내
- 논문 검색 바로가기

### 🔍 검색 페이지
- 논문 검색 및 필터링
- AI 요약 제공
- 개인 저장 및 공유

### 👤 마이페이지
- 저장된 논문 관리
- 공유 관리
- 개인 설정

### ⚙️ CMS 관리
- 논문 수집 현황
- 사용자 관리
- 시스템 설정

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일/데스크톱 최적화
- **QuickFlow 스타일**: 현대적이고 직관적인 인터페이스
- **shadcn/ui**: 일관된 컴포넌트 시스템
- **다크/라이트 모드**: 사용자 선호도에 따른 테마

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 📊 주요 통계

- **논문 수집**: PubMed, arXiv, ScienceDirect 등 다중 소스
- **AI 요약**: 한국어 자동 요약 제공
- **사용자 관리**: 계정별 권한 및 설정 관리
- **시스템 모니터링**: 실시간 수집 현황 및 성능 지표

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Discovery2** - 신약개발의 미래를 위한 AI 기반 논문 관리 시스템 🚀 