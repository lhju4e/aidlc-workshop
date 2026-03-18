# Unit of Work Plan

## 개요
모놀리식 아키텍처에서 논리적 모듈 단위로 분해합니다. 단일 배포 단위이지만, CONSTRUCTION 단계에서 단위별로 설계/구현을 진행합니다.

## 분해 전략
- **아키텍처**: 모놀리스 (단일 Backend + 3개 Frontend SPA)
- **분해 기준**: 사용자 인터페이스 + 백엔드 도메인 기준
- **단위 수**: 3개 Unit

## 계획

### Step 1: Unit 정의
- [x] Unit 1: Backend API + Database (핵심 서버)
- [x] Unit 2: Customer Frontend (고객 SPA)
- [x] Unit 3: Admin + Kitchen Frontend (관리자/주방 SPA)

### Step 2: Unit 의존성 정의
- [x] Unit 간 의존성 매트릭스 작성
- [x] 개발 순서 결정

### Step 3: Story-Unit 매핑
- [x] 각 US를 Unit에 매핑

### Step 4: 산출물 생성
- [x] unit-of-work.md
- [x] unit-of-work-dependency.md
- [x] unit-of-work-story-map.md
