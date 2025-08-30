# CaskChain Backend API

CaskChain 威士忌倉儲NFT平台的後端系統，提供RESTful API服務並整合區塊鏈技術。

## 系統要求

- Node.js >= 18.0.0
- MongoDB >= 5.0
- Redis (optional, for caching)

## 安裝與設定

1. 安裝依賴套件：
```bash
npm install
```

2. 複製環境變數設定檔：
```bash
cp .env.example .env
```

3. 編輯 `.env` 檔案，設定相關環境變數

4. 建置專案：
```bash
npm run build
```

## 開發

### 啟動開發伺服器
```bash
npm run dev
```

### 程式碼檢查
```bash
npm run lint
npm run lint:fix
```

### 測試
```bash
npm test
npm run test:watch
```

## 生產環境

### 建置並啟動
```bash
npm run build
npm start
```

## API 端點

### 系統狀態
- `GET /health` - 系統健康檢查
- `GET /` - API 基本資訊

## 專案結構

```
backend/
├── src/
│   ├── config/         # 設定檔案
│   ├── controllers/    # 控制器
│   ├── middleware/     # 中介軟體
│   ├── models/         # 資料模型
│   ├── routes/         # 路由定義
│   ├── services/       # 業務邏輯服務
│   ├── types/          # TypeScript 型別定義
│   ├── utils/          # 工具函式
│   └── index.ts        # 主要入口點
├── dist/               # 編譯輸出目錄
├── coverage/           # 測試覆蓋率報告
└── uploads/            # 檔案上傳目錄
```

## 技術堆疊

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Blockchain**: Ethers.js
- **File Processing**: Multer, Sharp
- **Testing**: Jest
- **Code Quality**: ESLint
- **Process Manager**: Nodemon (development)

## 環境變數

請參考 `.env.example` 檔案中的詳細說明。

## 授權

MIT License