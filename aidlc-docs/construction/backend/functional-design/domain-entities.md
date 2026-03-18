# Domain Entities - Backend API

## Entity Relationship Diagram

```
+----------+     +----------+     +----------+
|  Store   |1---*|  Admin   |     | Category |
+----------+     +----------+     +----+-----+
     |1                                |1
     |                                 |
     |*                                |*
+----+-----+                      +----+-----+
|  Table   |                      |   Menu   |
+----+-----+                      +----------+
     |1
     |
     |*
+----+-----+     +------------+
|  Session  |1--*|   Order    |
+----------+     +-----+------+
                       |1    |1
                       |      |
                       |*     |1
                 +-----+--+  +--------+
                 |OrderItem|  |Payment |
                 +---------+  +--------+
```

## Entity 정의

### Store (매장)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 매장 고유 식별자 |
| name | VARCHAR(100) | NOT NULL | 매장명 |
| createdAt | DATETIME | NOT NULL, DEFAULT NOW | 생성 시각 |

### Admin (관리자)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 관리자 고유 식별자 |
| storeId | UUID | FK(Store), NOT NULL | 소속 매장 |
| username | VARCHAR(50) | NOT NULL, UNIQUE(storeId, username) | 사용자명 |
| passwordHash | VARCHAR(255) | NOT NULL | bcrypt 해시 비밀번호 |
| loginAttempts | INT | DEFAULT 0 | 연속 로그인 실패 횟수 |
| lockedUntil | DATETIME | NULLABLE | 잠금 해제 시각 |
| createdAt | DATETIME | NOT NULL, DEFAULT NOW | 생성 시각 |

### Table (테이블)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 테이블 고유 식별자 |
| storeId | UUID | FK(Store), NOT NULL | 소속 매장 |
| tableNumber | INT | NOT NULL, UNIQUE(storeId, tableNumber) | 테이블 번호 |
| passwordHash | VARCHAR(255) | NOT NULL | bcrypt 해시 비밀번호 |
| createdAt | DATETIME | NOT NULL, DEFAULT NOW | 생성 시각 |

### Session (테이블 세션)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 세션 고유 식별자 |
| tableId | UUID | FK(Table), NOT NULL | 테이블 |
| storeId | UUID | FK(Store), NOT NULL | 매장 |
| startedAt | DATETIME | NOT NULL, DEFAULT NOW | 세션 시작 시각 |
| completedAt | DATETIME | NULLABLE | 이용 완료 시각 |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | 활성 여부 |

### Category (메뉴 카테고리)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 카테고리 고유 식별자 |
| storeId | UUID | FK(Store), NOT NULL | 소속 매장 |
| name | VARCHAR(50) | NOT NULL | 카테고리명 |
| sortOrder | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |

### Menu (메뉴)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 메뉴 고유 식별자 |
| storeId | UUID | FK(Store), NOT NULL | 소속 매장 |
| categoryId | UUID | FK(Category), NOT NULL | 카테고리 |
| name | VARCHAR(100) | NOT NULL | 메뉴명 |
| price | INT | NOT NULL, >= 0 | 가격 (원) |
| description | TEXT | NULLABLE | 설명 |
| imageUrl | VARCHAR(500) | NULLABLE | 이미지 URL |
| sortOrder | INT | NOT NULL, DEFAULT 0 | 정렬 순서 |
| createdAt | DATETIME | NOT NULL, DEFAULT NOW | 생성 시각 |

### Order (주문)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 주문 고유 식별자 |
| storeId | UUID | FK(Store), NOT NULL | 매장 |
| tableId | UUID | FK(Table), NOT NULL | 테이블 |
| sessionId | UUID | FK(Session), NOT NULL | 세션 |
| orderNumber | INT | NOT NULL, AUTO_INCREMENT per store | 주문 번호 |
| status | ENUM('pending','preparing','completed') | NOT NULL, DEFAULT 'pending' | 주문 상태 |
| totalAmount | INT | NOT NULL | 총 금액 |
| createdAt | DATETIME | NOT NULL, DEFAULT NOW | 주문 시각 |

### OrderItem (주문 항목)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 항목 고유 식별자 |
| orderId | UUID | FK(Order), NOT NULL | 주문 |
| menuId | UUID | FK(Menu), NOT NULL | 메뉴 |
| menuName | VARCHAR(100) | NOT NULL | 주문 시점 메뉴명 (스냅샷) |
| quantity | INT | NOT NULL, >= 1 | 수량 |
| unitPrice | INT | NOT NULL | 주문 시점 단가 (스냅샷) |

### Payment (결제)
| 필드 | 타입 | 제약조건 | 설명 |
|------|------|----------|------|
| id | UUID | PK | 결제 고유 식별자 |
| orderId | UUID | FK(Order), NOT NULL, UNIQUE | 주문 |
| status | ENUM('unpaid','paid','failed') | NOT NULL, DEFAULT 'unpaid' | 결제 상태 |
| updatedAt | DATETIME | NOT NULL, DEFAULT NOW | 상태 변경 시각 |
