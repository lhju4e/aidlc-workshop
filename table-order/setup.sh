#!/bin/bash
set -e

echo "========================================="
echo "  테이블오더 서비스 초기 설정 스크립트"
echo "========================================="

# 색상
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 프로젝트 루트
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# 1. MySQL 접속 정보 입력
echo ""
echo -e "${YELLOW}[1/5] MySQL 접속 정보${NC}"
read -p "MySQL 사용자명 (기본: root): " DB_USER
DB_USER=${DB_USER:-root}
read -sp "MySQL 비밀번호: " DB_PASS
echo ""

# 2. DB 생성 + 스키마
echo -e "${YELLOW}[2/5] 데이터베이스 생성 및 스키마 적용${NC}"
mysql -u "$DB_USER" -p"$DB_PASS" < database/schema.sql
echo -e "${GREEN}✅ 스키마 적용 완료${NC}"

# 3. 샘플 데이터 로드
read -p "샘플 데이터를 로드하시겠습니까? (y/N): " LOAD_DATA
if [ "$LOAD_DATA" = "y" ] || [ "$LOAD_DATA" = "Y" ]; then
  mysql -u "$DB_USER" -p"$DB_PASS" tableorder < database/loaddata.sql
  echo -e "${GREEN}✅ 샘플 데이터 로드 완료${NC}"
fi

# 4. Backend .env 생성
echo -e "${YELLOW}[3/5] Backend 환경 설정${NC}"
cat > backend/.env << EOF
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=$DB_USER
DB_PASSWORD="$DB_PASS"
DB_NAME=tableorder
JWT_SECRET=table-order-jwt-secret-key-$(date +%s)
UPLOAD_DIR=uploads/images
MAX_FILE_SIZE=5242880
EOF
mkdir -p backend/uploads/images
echo -e "${GREEN}✅ backend/.env 생성 완료${NC}"

# 5. 의존성 설치
echo -e "${YELLOW}[4/5] 의존성 설치${NC}"
echo "  Backend..."
(cd backend && npm install --silent)
echo "  Customer Frontend..."
(cd frontend/customer && npm install --silent)
echo "  Admin Frontend..."
(cd frontend/admin && npm install --silent)
echo -e "${GREEN}✅ 의존성 설치 완료${NC}"

# 완료
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  설정 완료! 아래 명령어로 실행하세요${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "  # 터미널 1 - Backend (포트 3000)"
echo "  cd table-order/backend && npm run dev"
echo ""
echo "  # 터미널 2 - Customer Frontend (포트 5173)"
echo "  cd table-order/frontend/customer && npm run dev"
echo ""
echo "  # 터미널 3 - Admin Frontend (포트 3001)"
echo "  cd table-order/frontend/admin && npm run dev"
echo ""
echo -e "${YELLOW}샘플 데이터 로그인 정보:${NC}"
echo "  Admin: 매장명=테스트매장 / 사용자명=admin / 비밀번호=password123"
echo "  Customer: 매장ID=f0e2a614-5167-45a4-8ac2-eeaaa3f5f739 / 테이블=1 / 비밀번호=table1234"
