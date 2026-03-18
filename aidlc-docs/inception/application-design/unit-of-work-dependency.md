# Unit of Work Dependencies

## 의존성 매트릭스

| Unit | 의존 대상 | 의존 유형 |
|------|-----------|-----------|
| Unit 2 (Customer Frontend) | Unit 1 (Backend API) | REST API + SSE 소비 |
| Unit 3 (Admin+Kitchen Frontend) | Unit 1 (Backend API) | REST API + SSE 소비 |
| Unit 1 (Backend API) | - | 독립 (MySQL만 필요) |

## 의존성 다이어그램

```
+-------------------------+     +----------------------------+
| Unit 2: Customer FE     |     | Unit 3: Admin+Kitchen FE   |
| (React SPA)             |     | (React SPA)                |
+------------+------------+     +-------------+--------------+
             |                                |
             |  REST API + SSE                |  REST API + SSE
             |                                |
             +---------------+----------------+
                             |
                             v
              +--------------+--------------+
              | Unit 1: Backend API         |
              | (Node.js + Express)         |
              +--------------+--------------+
                             |
                             v
              +--------------+--------------+
              |          MySQL              |
              +-----------------------------+
```

## 개발 순서

| 순서 | Unit | 이유 |
|------|------|------|
| 1 | Unit 1: Backend API + Database | 다른 Unit의 의존 대상. API가 먼저 있어야 Frontend 개발 가능 |
| 2 | Unit 2: Customer Frontend | Backend API 완성 후 고객 UI 구현 |
| 3 | Unit 3: Admin+Kitchen Frontend | Backend API 완성 후 관리자/주방 UI 구현 |

> Unit 2와 Unit 3는 Unit 1 완성 후 병렬 개발 가능
