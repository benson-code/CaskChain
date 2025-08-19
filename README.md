# CaskChain - 威士忌倉儲NFT平台

## 🥃 專案簡介

CaskChain 是一個創新的威士忌倉儲平台，結合區塊鏈NFT技術，為威士忌收藏家提供安全、可信賴的倉儲服務。每瓶存放的威士忌都會生成獨一無二的NFT憑證，作為數位所有權證明。

### ✨ 主要功能

- **專業倉儲**: 恆溫恆濕環境，24小時監控系統
- **NFT憑證**: 區塊鏈技術生成防偽防竄改的數位憑證
- **優雅介面**: Airbnb風格的黑色簡約設計
- **完整管理**: 從申請、存放到NFT生成的完整流程
- **後台管理**: 管理員可審核申請、生成NFT、管理用戶

### 🛠️ 技術棧

- **Frontend**: React 18 + TypeScript + Vite
- **樣式**: Tailwind CSS + Framer Motion
- **狀態管理**: Zustand
- **區塊鏈**: ethers.js + Web3.js  
- **HTTP客戶端**: Axios + React Query

## 🚀 快速開始

### 環境需求

- Node.js 18+
- npm 或 yarn
- MetaMask 瀏覽器擴展（用於區塊鏈功能）

### 安裝與運行

```bash
# 克隆專案
git clone https://github.com/yourusername/caskchain.git
cd caskchain

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開發伺服器將在 http://localhost:3000 啟動

### 構建生產版本

```bash
npm run build
npm run preview
```

## 📁 專案結構

```
src/
├── components/         # UI組件
│   ├── common/        # 通用組件
│   ├── whiskey/       # 威士忌相關組件  
│   └── nft/          # NFT相關組件
├── pages/             # 頁面組件
├── services/          # API服務
├── store/            # 狀態管理
├── types/            # TypeScript類型
├── styles/           # 樣式檔案
└── hooks/            # 自定義Hooks
```

## 🎯 主要頁面

### 首頁 (Home)
- 平台介紹
- 功能特色展示
- 客戶推薦
- Call-to-Action

### 威士忌畫廊 (Gallery)  
- 所有存放威士忌的展示
- 搜尋和篩選功能
- 網格/列表視圖切換
- 分類和排序

### 上傳申請 (Upload)
- 4步驟申請流程
- 威士忌資訊填寫
- 擁有者資訊
- 照片上傳
- 申請確認

### 後台管理 (Admin)
- 待處理申請管理
- 已存放威士忌管理  
- NFT憑證生成
- 用戶管理

### 威士忌詳情 (WhiskeyDetail)
- 詳細規格展示
- 存放歷程時間軸
- NFT憑證資訊
- 擁有者資訊

### NFT憑證 (NFTCertificate)
- NFT憑證視覺化
- 區塊鏈資訊
- 所有權驗證
- 交易記錄

## 🔗 區塊鏈整合

### 支援網路
- **Ethereum Mainnet** (生產環境)
- **Polygon** (低手續費選項)
- **Goerli Testnet** (測試環境)

### 智能合約功能
- NFT鑄造 (mintWhiskeyNFT)
- 所有權查詢 (ownerOf)
- 憑證轉移 (transferFrom)
- 元資料查詢 (tokenURI)

### MetaMask整合
- 錢包連接
- 網路切換
- 交易簽署
- 餘額查詢

## 🎨 設計系統

### 色彩主題
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

### 組件規範
- **按鈕**: `btn-primary`, `btn-secondary`, `btn-ghost`
- **卡片**: `card`, `card-hover`
- **文字**: `gradient-text`
- **動畫**: `animate-fade-in`, `animate-slide-up`, `animate-float`

## 📱 響應式設計

- **Mobile First**: 移動端優先設計
- **Breakpoints**: 
  - `sm`: 640px+
  - `md`: 768px+
  - `lg`: 1024px+
  - `xl`: 1280px+

## 🧪 開發工具

### 代碼品質
```bash
npm run lint        # ESLint檢查
npm run type-check  # TypeScript類型檢查
npm run format      # Prettier格式化
```

### 測試
```bash
npm run test        # 運行測試
npm run test:watch  # 監控模式測試
npm run test:ui     # 測試UI界面
```

## 🚀 部署

### Vercel 部署 (推薦)
```bash
npm i -g vercel
vercel --prod
```

### 手動部署
```bash
npm run build
# 將 dist/ 目錄上傳到靜態託管服務
```

### 環境變數
```env
VITE_API_BASE_URL=https://api.caskchain.com
VITE_BLOCKCHAIN_NETWORK=polygon
VITE_CONTRACT_ADDRESS=0x...
VITE_INFURA_PROJECT_ID=your_project_id
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud
```

## 🔐 安全性

### 最佳實踐
- 所有API請求使用HTTPS
- 敏感資料不存儲在本地存儲
- JWT Token自動過期機制
- 輸入驗證和清理
- CORS適當配置

### 區塊鏈安全
- 智能合約經過審計
- 元資料存儲在IPFS
- 私鑰永不暴露
- 交易前用戶確認

## 🤝 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打開 Pull Request

## 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解詳情

## 📞 聯絡資訊

- **專案維護者**: CaskChain團隊
- **Email**: info@caskchain.com
- **網站**: https://caskchain.com

## 🔄 更新日誌

### v1.0.0 (2024-03-20)
- ✨ 完整的威士忌倉儲管理系統
- ✨ NFT憑證生成和管理
- ✨ Airbnb風格的UI設計
- ✨ 完整的後台管理功能
- ✨ 區塊鏈錢包整合
- ✨ 響應式設計支援

---

**CaskChain** - 讓每瓶威士忌都有其數位身份證 🥃✨