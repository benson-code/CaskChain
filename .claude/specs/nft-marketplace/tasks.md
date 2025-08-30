# 實作計劃 - 威士忌NFT憑證系統

## 任務概述
威士忌NFT憑證系統將分四個階段實作，每個階段專注於特定功能集。所有任務都遵循原子化原則，確保每個任務可在15-30分鐘內完成，並且具有明確的輸入和輸出。

## 專案結構遵循
任務設計遵循現有CaskChain專案的組織慣例，擴展現有檔案而非建立全新結構。所有新元件將整合到現有的React + TypeScript + Zustand架構中。

## 原子化任務要求
每個任務都符合以下條件：
- **檔案範圍**: 每個任務最多涉及1-3個相關檔案
- **時間限制**: 15-30分鐘內可完成
- **單一目的**: 一個可測試的結果
- **明確檔案**: 指定確切的建立/修改檔案
- **代理友善**: 清楚的輸入/輸出，最少的上下文切換

## 良好 vs 不良任務範例
❌ **不良範例（過於廣泛）**:
- "實作憑證系統" (影響太多檔案，多種目的)
- "新增憑證管理功能" (範圍模糊，無檔案規格)
- "建立完整的NFT介面" (過大，多個元件)

✅ **良好範例（原子化）**:
- "在src/types/index.ts中擴展NFTCertificate介面以新增轉讓歷史"
- "在src/services/api.ts中新增getCertificatesByOwner API方法"
- "建立src/components/nft/CertificateCard.tsx元件以顯示單一憑證"

## 任務

### 第一階段 - 核心憑證功能

- [ ] 1. 擴展NFTCertificate類型定義
  - 檔案: src/types/index.ts
  - 擴展現有NFTCertificate介面以包含狀態、轉讓歷史和重試機制欄位
  - 新增CertificateService和相關輔助類型
  - 目的: 建立憑證系統的類型安全基礎
  - _Leverage: 現有NFTCertificate介面基礎_
  - _Requirements: 1.4, 2.4, 3.6_

- [ ] 2. 擴展區塊鏈服務以支援憑證生成
  - 檔案: src/services/blockchain.ts
  - 在現有BlockchainService類中新增mintCertificateNFT方法
  - 實作自動重試機制和指數退避策略
  - 目的: 提供可靠的NFT憑證生成功能
  - _Leverage: 現有mintNFT方法和錯誤處理_
  - _Requirements: 1.1, 1.5_

- [ ] 3. 擴展API客戶端以支援憑證管理
  - 檔案: src/services/api.ts  
  - 在現有nftApi物件中新增憑證相關的API方法
  - 實作generateCertificate, getCertificatesByOwner, getCertificateById方法
  - 目的: 建立前端與後端的憑證API通訊
  - _Leverage: 現有nftApi結構和錯誤處理_
  - _Requirements: 1.3, 2.1, 2.6_

- [ ] 4. 擴展NFT Store以支援憑證狀態管理
  - 檔案: src/store/index.ts
  - 在現有useNFTStore中新增憑證相關狀態和方法
  - 實作certificates陣列、generationProgress Map和相關更新方法
  - 目的: 集中管理憑證狀態和生成進度
  - _Leverage: 現有useNFTStore結構和Zustand模式_
  - _Requirements: 1.6, 2.6_

- [ ] 5. 建立憑證卡片元件
  - 檔案: src/components/nft/CertificateCard.tsx
  - 建立可重用的憑證顯示卡片元件，包含威士忌詳情和憑證狀態
  - 使用現有的TailwindCSS樣式和Framer Motion動畫
  - 目的: 提供一致的憑證視覺展示
  - _Leverage: 現有威士忌展示卡片樣式和動畫_
  - _Requirements: 2.2, 2.3_

- [ ] 6. 建立憑證列表元件
  - 檔案: src/components/nft/CertificateList.tsx
  - 建立憑證列表展示元件，包含載入狀態和空狀態處理
  - 整合搜尋和篩選功能（使用現有模式）
  - 目的: 提供憑證的清單檢視功能
  - _Leverage: 現有威士忌列表元件的分頁和篩選邏輯_
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 7. 擴展威士忌上傳頁面以觸發憑證生成
  - 檔案: src/pages/Upload.tsx
  - 在現有上傳成功處理函數中新增自動NFT憑證生成邏輯
  - 新增生成進度顯示和錯誤處理
  - 目的: 整合憑證生成到現有威士忌存放流程
  - _Leverage: 現有上傳成功處理和通知系統_
  - _Requirements: 1.1, 1.3, 1.5_

- [ ] 8. 建立憑證頁面
  - 檔案: src/pages/Certificates.tsx
  - 建立全新的憑證管理頁面，整合CertificateList和載入邏輯
  - 實作憑證載入和錯誤處理
  - 目的: 提供客戶查看和管理憑證的主要界面
  - _Leverage: 現有頁面結構和載入模式_
  - _Requirements: 2.1, 2.2, 2.5_

### 第二階段 - 轉讓功能

- [ ] 9. 擴展區塊鏈服務以支援憑證轉讓
  - 檔案: src/services/blockchain.ts
  - 在BlockchainService中新增transferCertificate和相關驗證方法
  - 實作地址驗證、所有權確認和Gas費用估算
  - 目的: 提供安全的憑證轉讓功能
  - _Leverage: 現有transferNFT方法和錢包整合_
  - _Requirements: 3.3, 3.4_

- [ ] 10. 擴展API客戶端以支援憑證轉讓
  - 檔案: src/services/api.ts
  - 在nftApi中新增transferCertificate方法
  - 實作轉讓驗證和狀態更新API呼叫
  - 目的: 建立憑證轉讓的API通訊
  - _Leverage: 現有API錯誤處理和認證機制_
  - _Requirements: 3.4, 3.6_

- [ ] 11. 建立憑證轉讓模態元件
  - 檔案: src/components/nft/TransferModal.tsx
  - 建立憑證轉讓的模態對話框，包含地址輸入和確認
  - 實作地址驗證、Gas費用顯示和轉讓確認流程
  - 目的: 提供直覺的憑證轉讓使用者介面
  - _Leverage: 現有模態對話框樣式和表單驗證_
  - _Requirements: 3.1, 3.2_

- [ ] 12. 擴展憑證卡片以支援轉讓按鈕
  - 檔案: src/components/nft/CertificateCard.tsx
  - 在現有CertificateCard中新增條件式轉讓按鈕
  - 實作權限檢查（只有擁有者可以轉讓）
  - 目的: 在憑證卡片中整合轉讓功能
  - _Leverage: 現有按鈕樣式和權限檢查模式_
  - _Requirements: 3.1_

- [ ] 13. 建立轉讓歷史元件
  - 檔案: src/components/nft/TransferHistory.tsx
  - 建立顯示憑證轉讓歷史的時間軸元件
  - 包含交易雜湊連結和時間格式化
  - 目的: 提供憑證轉讓的完整歷史記錄
  - _Leverage: 現有時間格式化函數和連結樣式_
  - _Requirements: 3.6_

### 第三階段 - 取酒驗證

- [ ] 14. 擴展API客戶端以支援取酒驗證
  - 檔案: src/services/api.ts
  - 在nftApi中新增redeemCertificate和verifyCertificate方法
  - 實作取酒驗證和憑證狀態更新
  - 目的: 建立取酒驗證的API功能
  - _Leverage: 現有API驗證模式和錯誤處理_
  - _Requirements: 4.1, 4.6, 5.2_

- [ ] 15. 建立憑證驗證工具元件
  - 檔案: src/components/nft/VerificationTool.tsx
  - 建立憑證驗證查詢介面，包含Token ID輸入和驗證結果顯示
  - 實作區塊鏈驗證狀態指示器（綠色/紅色）
  - 目的: 提供管理員和客戶的憑證驗證工具
  - _Leverage: 現有搜尋輸入和狀態指示器樣式_
  - _Requirements: 5.1, 5.3, 5.4_

- [ ] 16. 建立取酒確認元件
  - 檔案: src/components/nft/RedemptionModal.tsx
  - 建立取酒確認的模態對話框，顯示憑證詳情和確認按鈕
  - 實作取酒後的狀態更新和通知
  - 目的: 提供取酒流程的使用者介面
  - _Leverage: 現有確認對話框和通知系統_
  - _Requirements: 4.2, 4.3, 4.6_

- [ ] 17. 擴展憑證卡片以支援取酒按鈕
  - 檔案: src/components/nft/CertificateCard.tsx
  - 在CertificateCard中新增條件式取酒按鈕（active狀態才顯示）
  - 實作取酒狀態的視覺指示（已使用標記）
  - 目的: 在憑證卡片中整合取酒功能
  - _Leverage: 現有狀態指示器和按鈕樣式_
  - _Requirements: 4.2, 4.4_

### 第四階段 - 完善功能

- [ ] 18. 擴展管理員API以支援憑證管理
  - 檔案: src/services/api.ts
  - 在現有adminApi物件中新增getFailedGenerations和retryGeneration方法
  - 實作憑證統計查詢API呼叫
  - 目的: 建立管理員憑證管理的API支援
  - _Leverage: src/services/api.ts中現有adminApi結構和權限處理_
  - _Requirements: 1.5_

- [ ] 19. 建立基本管理員憑證頁面
  - 檔案: src/pages/AdminCertificates.tsx
  - 建立管理員專用的憑證管理頁面基礎架構和失敗生成清單
  - 實作失敗憑證的載入和顯示
  - 目的: 提供管理員查看失敗憑證的介面
  - _Leverage: src/pages/Admin.tsx的頁面結構和權限檢查_
  - _Requirements: 1.5_

- [ ] 20. 在管理員憑證頁面新增重試功能
  - 檔案: src/pages/AdminCertificates.tsx
  - 在現有AdminCertificates頁面中新增重試按鈕和處理邏輯
  - 實作批次重試和單一重試操作
  - 目的: 提供管理員重試失敗憑證生成的功能
  - _Leverage: 現有批次操作模式和確認對話框_
  - _Requirements: 1.5_

- [ ] 21. 建立憑證統計儀表板元件
  - 檔案: src/components/admin/CertificateStats.tsx
  - 建立憑證生成統計的儀表板元件，顯示成功率和失敗數量
  - 使用現有圖表樣式和即時數據更新
  - 目的: 提供憑證系統的運營統計視覺化
  - _Leverage: 現有統計卡片和圖表樣式_
  - _Requirements: 系統可靠性監控_

- [ ] 22. 建立憑證效能監控服務基礎
  - 檔案: src/services/monitoring.ts
  - 建立新的監控服務檔案以追蹤憑證生成時間
  - 實作基本的計時和記錄功能
  - 目的: 建立30秒生成目標的監控基礎
  - _Leverage: 現有錯誤處理和日誌模式_
  - _Requirements: 效能 - 憑證生成必須在30秒內完成_

- [ ] 23. 在監控服務中新增警報機制
  - 檔案: src/services/monitoring.ts
  - 在現有監控服務中新增效能警報和通知功能
  - 實作超時檢測和管理員通知
  - 目的: 確保效能目標不被超越時能及時警報
  - _Leverage: 現有通知系統和useUIStore_
  - _Requirements: 效能 - 憑證生成必須在30秒內完成_

- [ ] 24. 在Upload頁面新增通知整合
  - 檔案: src/pages/Upload.tsx
  - 在現有上傳成功處理中新增憑證生成通知邏輯
  - 實作進度通知和完成通知
  - 目的: 讓使用者了解憑證生成狀態
  - _Leverage: 現有react-hot-toast通知系統_
  - _Requirements: 1.3_

- [ ] 25. 在CertificateList中新增空狀態處理
  - 檔案: src/components/nft/CertificateList.tsx
  - 在現有CertificateList元件中新增無憑證時的空狀態顯示
  - 實作友善的引導訊息和存酒連結
  - 目的: 改善首次使用者體驗
  - _Leverage: 現有空狀態設計模式_
  - _Requirements: 2.5_

- [ ] 26. 新增憑證相關路由配置
  - 檔案: src/App.tsx
  - 在現有路由配置中新增憑證頁面和管理員憑證頁面路由
  - 實作路由權限保護（登入和管理員權限）
  - 目的: 整合憑證頁面到應用程式導航
  - _Leverage: src/App.tsx中現有路由結構和權限檢查_
  - _Requirements: 2.1_

- [ ] 27. 擴展導航列以包含憑證連結
  - 檔案: src/components/common/Navbar.tsx
  - 在現有導航列中新增「我的憑證」連結
  - 實作登入狀態檢查（只有登入使用者才顯示）
  - 目的: 讓使用者能輕易存取憑證功能
  - _Leverage: 現有導航樣式和useAuthStore權限檢查_
  - _Requirements: 2.1_

- [ ] 28. 建立憑證生成整合測試
  - 檔案: src/tests/integration/certificate-generation.test.ts
  - 建立憑證生成流程的端對端測試，包含威士忌存放到憑證生成
  - 實作Mock區塊鏈服務和API回應
  - 目的: 確保憑證生成流程的可靠性
  - _Leverage: 現有測試架構和Mock模式_
  - _Requirements: 1.1, 1.3, 1.6_

- [ ] 29. 建立憑證轉讓整合測試
  - 檔案: src/tests/integration/certificate-transfer.test.ts
  - 建立憑證轉讓流程的端對端測試，包含驗證和錢包互動
  - 實作轉讓成功和失敗場景測試
  - 目的: 確保憑證轉讓功能的正確性
  - _Leverage: 現有測試架構和錢包Mock_
  - _Requirements: 3.3, 3.4, 3.6_

- [ ] 30. 建立憑證取酒整合測試
  - 檔案: src/tests/integration/certificate-redemption.test.ts
  - 建立憑證取酒驗證流程的端對端測試
  - 實作取酒成功和失敗場景測試
  - 目的: 確保取酒驗證系統的可靠性
  - _Leverage: 現有測試架構和API Mock_
  - _Requirements: 4.1, 4.2, 4.6_

## 注意事項

### 檔案修改策略
- 所有現有檔案的修改都應該擴展現有功能，而非替換
- 保持向後相容性，不破壞現有威士忌管理功能
- 使用TypeScript嚴格模式確保類型安全

### 錯誤處理要求
- 每個任務都必須包含適當的錯誤處理
- 所有使用者介面元件都要有載入和錯誤狀態
- API呼叫必須包含重試邏輯和優雅降級

### 測試要求
- 每個新元件都應該包含基本的單元測試
- API方法需要Mock測試
- 使用者互動流程需要整合測試