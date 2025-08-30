# Design Document - Backend System

## Overview

CaskChain後端系統是一個全面的威士忌倉儲NFT平台後端架構，整合區塊鏈技術，為威士忌倉儲、NFT生成、用戶管理和數據處理提供安全可靠的服務基礎。本系統採用微服務架構模式，支援RESTful API，整合多鏈區塊鏈網絡，實現去中心化的威士忌資產數字化管理。

系統核心功能包括：
- JWT基礎的用戶認證與授權系統
- 威士忌資產註冊、管理與審核流程
- 自動化NFT生成與區塊鏈整合
- 多鏈區塊鏈支援與智能合約管理
- 安全的文件上傳與處理系統
- 全面的監控、日誌與審計系統

## Steering Document Alignment

### Technical Standards (tech.md)
由於專案中尚未建立tech.md文件，本設計將遵循以下技術標準：
- RESTful API設計原則
- JWT認證標準
- OpenAPI 3.0規格
- 微服務架構最佳實踐
- 容器化部署標準
- 安全編碼最佳實踐

### Project Structure (structure.md)
本實作將遵循Node.js/TypeScript專案的標準目錄結構：
```
backend/
├── src/
│   ├── controllers/     # API控制器
│   ├── services/        # 業務邏輯服務
│   ├── models/          # 數據模型
│   ├── middleware/      # 中間件
│   ├── routes/          # 路由定義
│   ├── utils/           # 工具函數
│   └── config/          # 配置文件
├── tests/               # 測試文件
├── docs/               # API文檔
└── docker/             # 容器化配置
```

## Code Reuse Analysis

### Existing Components to Leverage
由於目前專案主要為前端實作，後端系統將建立新的程式碼基礎，但會與現有前端組件整合：

- **前端API服務 (src/services/api.ts)**: 後端API設計將與現有前端API服務接口保持一致
- **區塊鏈服務 (src/services/blockchain.ts)**: 後端將實作對應的智能合約調用和區塊鏈整合邏輯
- **類型定義 (src/types/index.ts)**: 後端將共享和擴展現有的TypeScript類型定義

### Integration Points
- **前端應用**: 通過RESTful API提供數據和業務邏輯服務
- **區塊鏈網絡**: 整合現有的ethers.js和web3.js使用模式
- **數據庫**: 新建數據庫架構支援現有前端功能需求

## Architecture

本系統採用分層微服務架構，確保高可用性、可擴展性和可維護性：

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[React Frontend]
        MOBILE[Mobile App]
        API_DOCS[API Documentation]
    end

    subgraph "API Gateway Layer"
        GATEWAY[API Gateway]
        AUTH_MW[Authentication Middleware]
        RATE_LIMIT[Rate Limiting]
        LOGGING[Request Logging]
    end

    subgraph "Application Layer"
        USER_SVC[User Service]
        WHISKEY_SVC[Whiskey Service]
        NFT_SVC[NFT Service]
        FILE_SVC[File Service]
        BLOCKCHAIN_SVC[Blockchain Service]
        NOTIFICATION_SVC[Notification Service]
    end

    subgraph "Data Layer"
        POSTGRES[(PostgreSQL)]
        REDIS[(Redis Cache)]
        IPFS[IPFS Storage]
        S3[File Storage]
    end

    subgraph "External Services"
        ETHEREUM[Ethereum Network]
        POLYGON[Polygon Network]
        BSC[BSC Network]
        EMAIL[Email Service]
        SMS[SMS Service]
    end

    subgraph "Infrastructure"
        MONITOR[Monitoring]
        LOGS[Log Aggregation]
        METRICS[Metrics Collection]
        ALERTS[Alert System]
    end

    WEB --> GATEWAY
    MOBILE --> GATEWAY
    API_DOCS --> GATEWAY

    GATEWAY --> AUTH_MW
    AUTH_MW --> RATE_LIMIT
    RATE_LIMIT --> LOGGING

    LOGGING --> USER_SVC
    LOGGING --> WHISKEY_SVC
    LOGGING --> NFT_SVC
    LOGGING --> FILE_SVC
    LOGGING --> BLOCKCHAIN_SVC
    LOGGING --> NOTIFICATION_SVC

    USER_SVC --> POSTGRES
    USER_SVC --> REDIS
    WHISKEY_SVC --> POSTGRES
    WHISKEY_SVC --> REDIS
    NFT_SVC --> POSTGRES
    NFT_SVC --> IPFS
    FILE_SVC --> S3
    BLOCKCHAIN_SVC --> ETHEREUM
    BLOCKCHAIN_SVC --> POLYGON
    BLOCKCHAIN_SVC --> BSC
    NOTIFICATION_SVC --> EMAIL
    NOTIFICATION_SVC --> SMS

    USER_SVC --> MONITOR
    WHISKEY_SVC --> MONITOR
    NFT_SVC --> MONITOR
    FILE_SVC --> MONITOR
    BLOCKCHAIN_SVC --> MONITOR
    NOTIFICATION_SVC --> MONITOR

    MONITOR --> LOGS
    MONITOR --> METRICS
    METRICS --> ALERTS
```

## Components and Interfaces

### API Gateway
- **Purpose:** 統一的API入口點，處理請求路由、認證、限流和日誌記錄
- **Interfaces:** HTTP REST API endpoints
- **Dependencies:** Express.js, helmet, cors, compression middleware
- **Reuses:** 整合現有前端API調用模式

### User Service (用戶服務)
- **Purpose:** 處理用戶註冊、登入、認證和授權
- **Interfaces:**
  - `POST /api/v1/auth/register` - 用戶註冊
  - `POST /api/v1/auth/login` - 用戶登入
  - `POST /api/v1/auth/refresh` - token刷新
  - `POST /api/v1/auth/logout` - 用戶登出
  - `GET /api/v1/users/profile` - 獲取用戶資料
  - `PUT /api/v1/users/profile` - 更新用戶資料
- **Dependencies:** bcrypt, jsonwebtoken, validator
- **Reuses:** 與前端認證流程整合

### Whiskey Service (威士忌服務)
- **Purpose:** 管理威士忌資產的註冊、審核、查詢和更新
- **Interfaces:**
  - `POST /api/v1/whiskeys` - 註冊威士忌
  - `GET /api/v1/whiskeys` - 查詢威士忌列表
  - `GET /api/v1/whiskeys/:id` - 獲取威士忌詳情
  - `PUT /api/v1/whiskeys/:id` - 更新威士忌資訊
  - `PUT /api/v1/whiskeys/:id/approve` - 審核威士忌
  - `GET /api/v1/whiskeys/search` - 搜尋威士忌
- **Dependencies:** PostgreSQL ORM, image processing libraries
- **Reuses:** 支援現有前端威士忌展示功能

### NFT Service (NFT服務)
- **Purpose:** 處理NFT生成、鑄造和管理
- **Interfaces:**
  - `POST /api/v1/nfts/generate` - 生成NFT
  - `GET /api/v1/nfts/:tokenId` - 獲取NFT資訊
  - `GET /api/v1/nfts/user/:userId` - 獲取用戶NFT
  - `POST /api/v1/nfts/verify-ownership` - 驗證所有權
- **Dependencies:** IPFS client, smart contract ABIs
- **Reuses:** 整合現有區塊鏈服務邏輯

### Blockchain Service (區塊鏈服務)
- **Purpose:** 與多個區塊鏈網絡整合，處理智能合約調用
- **Interfaces:**
  - `POST /api/v1/blockchain/deploy-contract` - 部署合約
  - `POST /api/v1/blockchain/mint-nft` - 鑄造NFT
  - `GET /api/v1/blockchain/transaction/:hash` - 查詢交易
  - `GET /api/v1/blockchain/gas-price` - 獲取gas價格
- **Dependencies:** ethers.js, web3.js, contract ABIs
- **Reuses:** 擴展現有前端區塊鏈整合

### File Service (文件服務)
- **Purpose:** 處理文件上傳、處理和存儲
- **Interfaces:**
  - `POST /api/v1/files/upload` - 上傳文件
  - `GET /api/v1/files/:id` - 獲取文件
  - `DELETE /api/v1/files/:id` - 刪除文件
  - `POST /api/v1/files/process-image` - 處理圖片
- **Dependencies:** multer, sharp, AWS SDK
- **Reuses:** 支援前端文件上傳功能

## Data Models

### User Model (用戶模型)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    wallet_address VARCHAR(42),
    role VARCHAR(50) DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
```

### Whiskey Model (威士忌模型)
```sql
CREATE TABLE whiskeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    distillery VARCHAR(255),
    age INTEGER,
    vintage INTEGER,
    region VARCHAR(100),
    category VARCHAR(100),
    alcohol_content DECIMAL(4,2),
    volume DECIMAL(8,2),
    storage_location VARCHAR(255),
    condition VARCHAR(100),
    market_value DECIMAL(12,2),
    currency VARCHAR(10) DEFAULT 'USD',
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    nft_token_id VARCHAR(100),
    blockchain_network VARCHAR(50),
    contract_address VARCHAR(42),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_whiskeys_owner ON whiskeys(owner_id);
CREATE INDEX idx_whiskeys_brand ON whiskeys(brand);
CREATE INDEX idx_whiskeys_status ON whiskeys(status);
CREATE INDEX idx_whiskeys_nft_token ON whiskeys(nft_token_id);
```

### NFT Model (NFT模型)
```sql
CREATE TABLE nfts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whiskey_id UUID NOT NULL REFERENCES whiskeys(id) ON DELETE CASCADE,
    token_id VARCHAR(100) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    blockchain_network VARCHAR(50) NOT NULL,
    owner_wallet VARCHAR(42) NOT NULL,
    metadata_uri VARCHAR(500),
    ipfs_hash VARCHAR(100),
    transaction_hash VARCHAR(66),
    block_number BIGINT,
    mint_timestamp TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'minting',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_nfts_token_contract ON nfts(token_id, contract_address);
CREATE INDEX idx_nfts_whiskey ON nfts(whiskey_id);
CREATE INDEX idx_nfts_owner ON nfts(owner_wallet);
```

### File Model (文件模型)
```sql
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whiskey_id UUID REFERENCES whiskeys(id) ON DELETE CASCADE,
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    upload_by UUID NOT NULL REFERENCES users(id),
    storage_provider VARCHAR(50) DEFAULT 'local',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_files_whiskey ON files(whiskey_id);
CREATE INDEX idx_files_upload_by ON files(upload_by);
```

### Audit Log Model (審計日誌模型)
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

### Token Blacklist Model (Token黑名單模型)
```sql
CREATE TABLE token_blacklist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_token_blacklist_hash ON token_blacklist(token_hash);
CREATE INDEX idx_token_blacklist_expires ON token_blacklist(expires_at);
```

## Error Handling

### Error Scenarios

1. **認證錯誤**
   - **Handling:** 返回401 Unauthorized，清除客戶端token
   - **User Impact:** 用戶被重定向到登入頁面

2. **授權錯誤**
   - **Handling:** 返回403 Forbidden，記錄未授權存取嘗試
   - **User Impact:** 顯示權限不足提示

3. **資源不存在**
   - **Handling:** 返回404 Not Found，提供建議操作
   - **User Impact:** 顯示友好的錯誤頁面和導航選項

4. **請求驗證失敗**
   - **Handling:** 返回400 Bad Request，詳細的字段錯誤資訊
   - **User Impact:** 表單顯示具體的驗證錯誤提示

5. **區塊鏈交易失敗**
   - **Handling:** 實施重試機制，記錄失敗原因，提供手動重試選項
   - **User Impact:** 顯示交易狀態和重試按鈕

6. **文件上傳錯誤**
   - **Handling:** 驗證文件類型和大小，提供清晰的錯誤訊息
   - **User Impact:** 顯示上傳要求和錯誤原因

7. **數據庫連接失敗**
   - **Handling:** 實施連接池重連，Circuit Breaker模式
   - **User Impact:** 暫時的服務不可用提示

8. **第三方服務不可用**
   - **Handling:** 實施降級模式，使用快取數據
   - **User Impact:** 功能受限提示，但核心功能可用

## Testing Strategy

### Unit Testing
- **框架:** Jest + Supertest
- **覆蓋率目標:** 90%以上
- **重點測試組件:**
  - 認證中間件
  - 業務邏輯服務
  - 數據模型驗證
  - 工具函數
  - 區塊鏈整合功能

### Integration Testing
- **測試環境:** Docker Compose測試環境
- **測試範圍:**
  - API端點完整流程測試
  - 數據庫操作測試
  - 第三方服務整合測試
  - 區塊鏈交互測試
  - 文件上傳處理測試

### End-to-End Testing
- **工具:** Playwright或Cypress
- **測試場景:**
  - 完整用戶註冊到NFT生成流程
  - 威士忌註冊審核流程
  - 多用戶協作場景
  - 錯誤恢復場景
  - 性能壓力測試

### Load Testing
- **工具:** Apache JMeter或k6
- **測試指標:**
  - 1000並發用戶負載測試
  - API響應時間測試
  - 數據庫性能測試
  - 文件上傳性能測試

### Security Testing
- **滲透測試:** OWASP Top 10檢查
- **依賴項掃描:** npm audit
- **靜態程式碼分析:** SonarQube
- **API安全測試:** 認證繞過、注入攻擊測試

### Blockchain Testing
- **本地區塊鏈:** Hardhat本地節點
- **測試網絡:** Goerli, Mumbai測試網
- **智能合約測試:** 合約功能和gas優化測試
- **交易模擬:** 各種網絡條件下的交易測試

## Technology Stack

### Backend Framework
- **Node.js**: 18.x LTS版本
- **Express.js**: Web應用框架
- **TypeScript**: 型別安全開發

### Database
- **PostgreSQL**: 14.x主要數據庫
- **Redis**: 6.x快取和會話存儲
- **TypeORM**: 數據庫ORM

### Authentication & Security
- **jsonwebtoken**: JWT令牌管理
- **bcrypt**: 密碼加密
- **helmet**: 安全中間件
- **cors**: 跨域請求處理

### Blockchain Integration
- **ethers.js**: 以太坊整合
- **web3.js**: Web3功能支援
- **IPFS**: 去中心化存儲

### File Processing
- **multer**: 文件上傳處理
- **sharp**: 圖片處理
- **AWS SDK**: 雲端存儲整合

### Monitoring & Logging
- **Winston**: 日誌管理
- **Prometheus**: 指標收集
- **Grafana**: 監控儀表板
- **New Relic/DataDog**: APM監控

### Testing
- **Jest**: 單元測試框架
- **Supertest**: API測試
- **Playwright**: E2E測試

### Development Tools
- **ESLint**: 程式碼檢查
- **Prettier**: 程式碼格式化
- **Husky**: Git hooks
- **Docker**: 容器化開發

## Development Environment Setup

### Prerequisites
```bash
# Node.js 18.x LTS
nvm install 18
nvm use 18

# PostgreSQL 14.x
# Redis 6.x
# Docker & Docker Compose
```

### Project Initialization
```bash
# 創建後端專案目錄
mkdir caskchain-backend
cd caskchain-backend

# 初始化Node.js專案
npm init -y

# 安裝核心依賴
npm install express cors helmet compression bcrypt jsonwebtoken
npm install pg redis ioredis typeorm reflect-metadata
npm install ethers web3 ipfs-http-client
npm install multer sharp aws-sdk
npm install winston prometheus-client

# 安裝開發依賴
npm install -D typescript @types/node @types/express
npm install -D jest @types/jest supertest @types/supertest
npm install -D eslint prettier husky nodemon ts-node
```

### Environment Configuration
```env
# .env
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/caskchain
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-key
POLYGON_RPC_URL=https://polygon-rpc.com
BSC_RPC_URL=https://bsc-dataseed.binance.org

# IPFS
IPFS_API_URL=https://ipfs.infura.io:5001

# File Storage
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=caskchain-files

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

### Docker Development Setup
```yaml
# docker-compose.dev.yml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: caskchain
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    environment:
      NODE_ENV: development
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
  redis_data:
```

## Deployment Architecture

### Production Infrastructure
```mermaid
graph TB
    subgraph "Load Balancer Layer"
        ALB[Application Load Balancer]
        CF[CloudFlare CDN]
    end

    subgraph "Application Tier"
        APP1[Backend Instance 1]
        APP2[Backend Instance 2]
        APP3[Backend Instance 3]
    end

    subgraph "Database Tier"
        PG_PRIMARY[(PostgreSQL Primary)]
        PG_REPLICA[(PostgreSQL Replica)]
        REDIS_CLUSTER[(Redis Cluster)]
    end

    subgraph "Storage Tier"
        S3[AWS S3]
        IPFS_CLUSTER[IPFS Cluster]
    end

    subgraph "Blockchain Networks"
        ETH[Ethereum]
        POLYGON[Polygon]
        BSC[BSC]
    end

    subgraph "Monitoring"
        PROMETHEUS[Prometheus]
        GRAFANA[Grafana]
        ALERTS[Alert Manager]
    end

    CF --> ALB
    ALB --> APP1
    ALB --> APP2
    ALB --> APP3

    APP1 --> PG_PRIMARY
    APP2 --> PG_PRIMARY
    APP3 --> PG_PRIMARY

    PG_PRIMARY --> PG_REPLICA
    
    APP1 --> REDIS_CLUSTER
    APP2 --> REDIS_CLUSTER
    APP3 --> REDIS_CLUSTER

    APP1 --> S3
    APP2 --> S3
    APP3 --> S3

    APP1 --> IPFS_CLUSTER
    APP2 --> IPFS_CLUSTER
    APP3 --> IPFS_CLUSTER

    APP1 --> ETH
    APP2 --> POLYGON
    APP3 --> BSC

    APP1 --> PROMETHEUS
    APP2 --> PROMETHEUS
    APP3 --> PROMETHEUS
    PROMETHEUS --> GRAFANA
    PROMETHEUS --> ALERTS
```

### Container Deployment
```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runtime

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

USER nextjs

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

### Kubernetes Deployment
```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: caskchain-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: caskchain-backend
  template:
    metadata:
      labels:
        app: caskchain-backend
    spec:
      containers:
      - name: backend
        image: caskchain/backend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: caskchain-secrets
              key: database-url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Backend

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run test
    - run: npm run lint

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Build Docker Image
      run: |
        docker build -t caskchain/backend:${{ github.sha }} .
        docker tag caskchain/backend:${{ github.sha }} caskchain/backend:latest
    
    - name: Push to Registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push caskchain/backend:${{ github.sha }}
        docker push caskchain/backend:latest
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/caskchain-backend backend=caskchain/backend:${{ github.sha }}
        kubectl rollout status deployment/caskchain-backend
```

### Monitoring and Observability
- **Application Metrics**: Response time, throughput, error rates
- **Infrastructure Metrics**: CPU, memory, disk, network usage
- **Business Metrics**: User registrations, whiskey registrations, NFT generations
- **Blockchain Metrics**: Transaction success rates, gas usage, block confirmations
- **Log Aggregation**: Centralized logging with ELK Stack
- **Alerting**: PagerDuty integration for critical issues
- **Health Checks**: Comprehensive health endpoints for all services

### Security Measures
- **Network Security**: VPC, security groups, WAF protection
- **Data Encryption**: TLS 1.3 in transit, AES-256 at rest
- **Access Control**: IAM roles, principle of least privilege
- **Secret Management**: AWS Secrets Manager or HashiCorp Vault
- **Container Security**: Image scanning, runtime protection
- **Compliance**: GDPR, SOC 2 considerations

### Backup and Disaster Recovery
- **Database Backups**: Daily automated backups with point-in-time recovery
- **File Storage Backups**: Cross-region S3 replication
- **IPFS Data**: Redundant pinning across multiple nodes
- **Recovery Testing**: Monthly disaster recovery drills
- **RTO/RPO**: Recovery Time Objective < 4 hours, Recovery Point Objective < 1 hour

此設計文檔提供了CaskChain後端系統的全面技術架構，涵蓋了所有需求中的8個核心系統，並確保了高可用性、可擴展性和安全性。系統設計遵循微服務架構原則，支援未來的功能擴展和技術演進。