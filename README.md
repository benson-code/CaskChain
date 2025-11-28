# CaskChain - 威士忌倉儲NFT平台 | Whiskey Storage NFT Platform

[中文](#中文) | [English](#english)

---

## 中文

### 🥃 專案簡介

CaskChain 是一個創新的威士忌倉儲平台，結合區塊鏈NFT技術，為威士忌收藏家提供安全、可信賴的倉儲服務。每瓶存放的威士忌都會生成獨一無二的NFT憑證，作為數位所有權證明。

#### ✨ 主要功能

- **專業倉儲**: 恆溫恆濕環境，24小時監控系統
- **NFT憑證**: 區塊鏈技術生成防偽防竄改的數位憑證
- **優雅介面**: Airbnb風格的黑色簡約設計
- **完整管理**: 從申請、存放到NFT生成的完整流程
- **後台管理**: 管理員可審核申請、生成NFT、管理用戶

#### 🛠️ 技術棧

**前端技術:**
- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Zustand (狀態管理)
- ethers.js + Web3.js (區塊鏈整合)
- Axios + React Query (HTTP客戶端)
- React Router DOM (路由)
- React Hot Toast (通知)

**後端技術:**
- Node.js + Express + TypeScript
- MongoDB + Mongoose (數據庫)
- JWT (身份驗證)
- IPFS (去中心化存儲)
- Sharp (圖片處理)
- Helmet (安全性)

**區塊鏈:**
- Ethereum / Polygon / Goerli Testnet
- ERC-721 NFT標準
- MetaMask整合

### 🚀 快速開始

#### 環境需求

- Node.js 18+
- npm 或 yarn
- MetaMask 瀏覽器擴展（用於區塊鏈功能）
- MongoDB (後端數據庫，可選)

#### 前端安裝與運行

```bash
# 克隆專案
git clone https://github.com/benson-code/CaskChain.git
cd CaskChain

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

開發伺服器將在 http://localhost:3000 啟動

#### 後端安裝與運行（可選）

```bash
# 進入後端目錄
cd backend

# 安裝依賴
npm install

# 配置環境變數（複製 .env.example 到 .env）
cp .env.example .env

# 啟動開發伺服器
npm run dev

# 建構生產版本
npm run build

# 啟動生產伺服器
npm start
```

後端伺服器將在 http://localhost:3001 啟動

### 📁 專案結構

```
CaskChain/
├── src/                      # 前端源代碼
│   ├── components/           # UI組件
│   │   ├── common/          # 通用組件 (Layout, Navbar, Footer)
│   │   ├── whiskey/         # 威士忌相關組件
│   │   └── nft/             # NFT相關組件
│   ├── pages/               # 頁面組件
│   │   ├── Home.tsx         # 首頁
│   │   ├── Gallery.tsx      # 威士忌畫廊
│   │   ├── Upload.tsx       # 上傳申請
│   │   ├── Admin.tsx        # 後台管理
│   │   ├── WhiskeyDetail.tsx # 威士忌詳情
│   │   └── NFTCertificate.tsx # NFT憑證
│   ├── services/            # API服務
│   │   ├── api.ts          # REST API客戶端
│   │   └── blockchain.ts    # 區塊鏈服務
│   ├── store/               # Zustand狀態管理
│   ├── types/               # TypeScript類型定義
│   ├── styles/              # 全局樣式
│   ├── App.tsx             # 應用主組件
│   └── main.tsx            # 應用入口
├── backend/                 # 後端源代碼
│   ├── src/
│   │   ├── controllers/     # 控制器
│   │   ├── models/          # 數據模型
│   │   ├── routes/          # API路由
│   │   ├── middleware/      # 中間件
│   │   ├── services/        # 業務邏輯
│   │   ├── config/          # 配置文件
│   │   └── utils/           # 工具函數
│   └── package.json
├── public/                  # 靜態資源
├── dist/                    # 建構輸出
└── package.json
```

### 🎯 主要頁面

#### 首頁 (Home)
- 平台介紹和功能特色展示
- 客戶推薦和成功案例
- Call-to-Action按鈕

#### 威士忌畫廊 (Gallery)
- 所有存放威士忌的展示
- 搜尋和篩選功能（按品牌、年份、產區）
- 網格/列表視圖切換
- 分類和排序

#### 上傳申請 (Upload)
- 4步驟申請流程
  1. 威士忌基本資訊
  2. 擁有者資訊
  3. 照片上傳
  4. 申請確認

#### 後台管理 (Admin)
- 待處理申請管理
- 已存放威士忌管理
- NFT憑證生成
- 用戶管理和統計

#### 威士忌詳情 (WhiskeyDetail)
- 詳細規格展示
- 存放歷程時間軸
- NFT憑證資訊
- 擁有者資訊

#### NFT憑證 (NFTCertificate)
- NFT憑證視覺化
- 區塊鏈資訊（交易哈希、合約地址）
- 所有權驗證
- 交易記錄和歷史

### 🔗 區塊鏈整合

#### 支援網路
- **Ethereum Mainnet** (生產環境)
- **Polygon Mainnet** (低手續費選項，推薦)
- **Goerli Testnet** (測試環境)

#### 智能合約功能
- `mintWhiskeyNFT(address, tokenURI)` - NFT鑄造
- `ownerOf(tokenId)` - 所有權查詢
- `transferFrom(from, to, tokenId)` - 憑證轉移
- `tokenURI(tokenId)` - 元資料查詢
- `balanceOf(address)` - 餘額查詢

#### MetaMask整合
- 錢包連接和斷開
- 網路自動切換
- 交易簽署和確認
- 餘額查詢

### 🎨 設計系統

#### 色彩主題
```css
/* 主要色彩 */
--primary-gold: #eab308      /* 金黃色主調 */
--dark-bg: #0a0a0a          /* 深色背景 */
--card-bg: #1a1a1a          /* 卡片背景 */

/* 狀態色彩 */
--success: #10b981          /* 成功綠色 */
--warning: #f59e0b          /* 警告橙色 */
--error: #ef4444            /* 錯誤紅色 */
--info: #3b82f6             /* 資訊藍色 */
```

#### 組件規範
- **按鈕**: `btn-primary`, `btn-secondary`, `btn-ghost`
- **卡片**: `card`, `card-hover`
- **文字**: `gradient-text`
- **動畫**: `animate-fade-in`, `animate-slide-up`, `animate-float`

### 📱 響應式設計

- **Mobile First**: 移動端優先設計
- **Breakpoints**:
  - `sm`: 640px+ (手機)
  - `md`: 768px+ (平板)
  - `lg`: 1024px+ (筆記型電腦)
  - `xl`: 1280px+ (桌面)

### 🚀 部署

#### Vercel 部署（推薦）

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署到生產環境
vercel --prod
```

或使用 Vercel GitHub 集成自動部署。

#### 環境變數配置

在 Vercel 或 `.env` 文件中配置以下環境變數：

```env
# API 配置
VITE_API_BASE_URL=https://api.caskchain.com

# 區塊鏈配置
VITE_BLOCKCHAIN_NETWORK=polygon
VITE_ETHEREUM_CONTRACT_ADDRESS=0x...
VITE_POLYGON_CONTRACT_ADDRESS=0x...
VITE_INFURA_PROJECT_ID=your_infura_project_id

# IPFS 配置
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
```

#### 後端環境變數

```env
# 服務器配置
NODE_ENV=production
PORT=3001
API_VERSION=v1

# 數據庫
MONGO_URI=mongodb://localhost:27017/caskchain
DB_NAME=caskchain

# JWT 密鑰
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# 區塊鏈
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
BSC_RPC_URL=https://bsc-dataseed1.binance.org/
BLOCKCHAIN_PRIVATE_KEY=your_private_key
WHISKEY_CASK_CONTRACT=0x...
WHISKEY_NFT_CONTRACT=0x...
MARKETPLACE_CONTRACT=0x...

# IPFS
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
IPFS_PROTOCOL=https

# Email
EMAIL_API_KEY=your_email_api_key
EMAIL_SENDER_EMAIL=noreply@caskchain.com
```

### 🔐 安全性

#### 最佳實踐
- ✅ 所有API請求使用HTTPS
- ✅ 敏感資料不存儲在本地存儲
- ✅ JWT Token自動過期機制
- ✅ 輸入驗證和清理（使用Joi）
- ✅ CORS適當配置
- ✅ Helmet安全頭部
- ✅ Rate Limiting（速率限制）

#### 區塊鏈安全
- ✅ 智能合約經過審計
- ✅ 元資料存儲在IPFS
- ✅ 私鑰永不暴露
- ✅ 交易前用戶確認
- ✅ 網路驗證和切換

### 🧪 測試

```bash
# 運行測試
npm run test

# 監控模式測試
npm run test:watch

# 測試覆蓋率
npm run test:coverage
```

### 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打開 Pull Request

### 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解詳情

### 📞 聯絡資訊

- **專案維護者**: CaskChain團隊
- **Email**: info@caskchain.com
- **GitHub**: https://github.com/benson-code/CaskChain

### 🔄 更新日誌

#### v1.0.0 (2024)
- ✨ 完整的威士忌倉儲管理系統
- ✨ NFT憑證生成和管理
- ✨ Airbnb風格的UI設計
- ✨ 完整的後台管理功能
- ✨ 區塊鏈錢包整合（MetaMask）
- ✨ 響應式設計支援
- ✨ 多鏈支援（Ethereum, Polygon, Goerli）

---

## English

### 🥃 Project Overview

CaskChain is an innovative whiskey storage platform that combines blockchain NFT technology to provide secure and trustworthy storage services for whiskey collectors. Each stored whiskey bottle generates a unique NFT certificate as digital proof of ownership.

#### ✨ Key Features

- **Professional Storage**: Constant temperature and humidity environment with 24/7 monitoring system
- **NFT Certificates**: Anti-counterfeit and tamper-proof digital certificates using blockchain technology
- **Elegant Interface**: Airbnb-style minimalist black design
- **Complete Management**: Full workflow from application, storage to NFT generation
- **Admin Dashboard**: Administrators can review applications, generate NFTs, and manage users

#### 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + Framer Motion
- Zustand (State Management)
- ethers.js + Web3.js (Blockchain Integration)
- Axios + React Query (HTTP Client)
- React Router DOM (Routing)
- React Hot Toast (Notifications)

**Backend:**
- Node.js + Express + TypeScript
- MongoDB + Mongoose (Database)
- JWT (Authentication)
- IPFS (Decentralized Storage)
- Sharp (Image Processing)
- Helmet (Security)

**Blockchain:**
- Ethereum / Polygon / Goerli Testnet
- ERC-721 NFT Standard
- MetaMask Integration

### 🚀 Quick Start

#### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask browser extension (for blockchain features)
- MongoDB (for backend, optional)

#### Frontend Installation & Running

```bash
# Clone the repository
git clone https://github.com/benson-code/CaskChain.git
cd CaskChain

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server will start at http://localhost:3000

#### Backend Installation & Running (Optional)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (copy .env.example to .env)
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Backend server will start at http://localhost:3001

### 📁 Project Structure

```
CaskChain/
├── src/                      # Frontend source code
│   ├── components/           # UI Components
│   │   ├── common/          # Common components (Layout, Navbar, Footer)
│   │   ├── whiskey/         # Whiskey-related components
│   │   └── nft/             # NFT-related components
│   ├── pages/               # Page components
│   │   ├── Home.tsx         # Home page
│   │   ├── Gallery.tsx      # Whiskey gallery
│   │   ├── Upload.tsx       # Upload application
│   │   ├── Admin.tsx        # Admin dashboard
│   │   ├── WhiskeyDetail.tsx # Whiskey details
│   │   └── NFTCertificate.tsx # NFT certificate
│   ├── services/            # API Services
│   │   ├── api.ts          # REST API client
│   │   └── blockchain.ts    # Blockchain service
│   ├── store/               # Zustand state management
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── backend/                 # Backend source code
│   ├── src/
│   │   ├── controllers/     # Controllers
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Middleware
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration
│   │   └── utils/           # Utility functions
│   └── package.json
├── public/                  # Static assets
├── dist/                    # Build output
└── package.json
```

### 🎯 Main Pages

#### Home
- Platform introduction and feature showcase
- Customer testimonials and success stories
- Call-to-Action buttons

#### Gallery
- Display of all stored whiskeys
- Search and filter functionality (by brand, vintage, region)
- Grid/List view toggle
- Category and sorting

#### Upload
- 4-step application process
  1. Whiskey basic information
  2. Owner information
  3. Photo upload
  4. Application confirmation

#### Admin Dashboard
- Pending applications management
- Stored whiskeys management
- NFT certificate generation
- User management and statistics

#### Whiskey Detail
- Detailed specifications display
- Storage timeline
- NFT certificate information
- Owner information

#### NFT Certificate
- NFT certificate visualization
- Blockchain information (transaction hash, contract address)
- Ownership verification
- Transaction history

### 🔗 Blockchain Integration

#### Supported Networks
- **Ethereum Mainnet** (Production)
- **Polygon Mainnet** (Low gas fees, recommended)
- **Goerli Testnet** (Testing)

#### Smart Contract Functions
- `mintWhiskeyNFT(address, tokenURI)` - NFT Minting
- `ownerOf(tokenId)` - Ownership Query
- `transferFrom(from, to, tokenId)` - Certificate Transfer
- `tokenURI(tokenId)` - Metadata Query
- `balanceOf(address)` - Balance Query

#### MetaMask Integration
- Wallet connection and disconnection
- Automatic network switching
- Transaction signing and confirmation
- Balance queries

### 🎨 Design System

#### Color Theme
```css
/* Primary Colors */
--primary-gold: #eab308      /* Gold accent */
--dark-bg: #0a0a0a          /* Dark background */
--card-bg: #1a1a1a          /* Card background */

/* State Colors */
--success: #10b981          /* Success green */
--warning: #f59e0b          /* Warning orange */
--error: #ef4444            /* Error red */
--info: #3b82f6             /* Info blue */
```

#### Component Specifications
- **Buttons**: `btn-primary`, `btn-secondary`, `btn-ghost`
- **Cards**: `card`, `card-hover`
- **Text**: `gradient-text`
- **Animations**: `animate-fade-in`, `animate-slide-up`, `animate-float`

### 📱 Responsive Design

- **Mobile First**: Mobile-first design approach
- **Breakpoints**:
  - `sm`: 640px+ (Mobile)
  - `md`: 768px+ (Tablet)
  - `lg`: 1024px+ (Laptop)
  - `xl`: 1280px+ (Desktop)

### 🚀 Deployment

#### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or use Vercel GitHub integration for automatic deployment.

#### Environment Variables Configuration

Configure the following environment variables in Vercel or `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=https://api.caskchain.com

# Blockchain Configuration
VITE_BLOCKCHAIN_NETWORK=polygon
VITE_ETHEREUM_CONTRACT_ADDRESS=0x...
VITE_POLYGON_CONTRACT_ADDRESS=0x...
VITE_INFURA_PROJECT_ID=your_infura_project_id

# IPFS Configuration
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud
VITE_PINATA_API_KEY=your_pinata_api_key
VITE_PINATA_SECRET_KEY=your_pinata_secret_key
```

#### Backend Environment Variables

```env
# Server Configuration
NODE_ENV=production
PORT=3001
API_VERSION=v1

# Database
MONGO_URI=mongodb://localhost:27017/caskchain
DB_NAME=caskchain

# JWT Secrets
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# Blockchain
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
BSC_RPC_URL=https://bsc-dataseed1.binance.org/
BLOCKCHAIN_PRIVATE_KEY=your_private_key
WHISKEY_CASK_CONTRACT=0x...
WHISKEY_NFT_CONTRACT=0x...
MARKETPLACE_CONTRACT=0x...

# IPFS
IPFS_HOST=ipfs.infura.io
IPFS_PORT=5001
IPFS_PROTOCOL=https

# Email
EMAIL_API_KEY=your_email_api_key
EMAIL_SENDER_EMAIL=noreply@caskchain.com
```

### 🔐 Security

#### Best Practices
- ✅ All API requests use HTTPS
- ✅ Sensitive data not stored in local storage
- ✅ JWT token automatic expiration mechanism
- ✅ Input validation and sanitization (using Joi)
- ✅ Proper CORS configuration
- ✅ Helmet security headers
- ✅ Rate limiting

#### Blockchain Security
- ✅ Smart contracts audited
- ✅ Metadata stored on IPFS
- ✅ Private keys never exposed
- ✅ User confirmation before transactions
- ✅ Network validation and switching

### 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode testing
npm run test:watch

# Test coverage
npm run test:coverage
```

### 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

### 📞 Contact

- **Project Maintainer**: CaskChain Team
- **Email**: info@caskchain.com
- **GitHub**: https://github.com/benson-code/CaskChain

### 🔄 Changelog

#### v1.0.0 (2024)
- ✨ Complete whiskey storage management system
- ✨ NFT certificate generation and management
- ✨ Airbnb-style UI design
- ✨ Complete admin dashboard functionality
- ✨ Blockchain wallet integration (MetaMask)
- ✨ Responsive design support
- ✨ Multi-chain support (Ethereum, Polygon, Goerli)

---

**CaskChain** - Every whiskey bottle deserves its digital identity 🥃✨
