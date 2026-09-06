# Redbag (紅包袋列印工具) & Global Project Standards - AI Agent Rules

These rules must be strictly followed by all AI agents operating within this workspace to maintain the established architectural, port allocation, and UX standards.

## 🚀 Unified Workspace & Port Allocation Rules (全域工程與 Port 規範)
所有在 `c:\Marco\DeveloperAI\` 底下的專案必須遵守統一的技術架構與連續 Port 編排：

### 1. Port Allocation Matrix (Port 循序分配表)
- `3000`: `localhosttoolbox`
- `3001`: `memorizewords`
- `3002`: `youtubegetlink`
- `3003`: `livepoll`
- `3004`: `kline`
- `3005`: `fs533610tt`
- `3006`: `HIIT`
- `3007`: `redbag` (紅包袋列印工具)
- **`3008+`**: **未來任何新專案必須依序往下遞增分配 (3008, 3009...)，不可跳號或與現有專案衝突。**

### 2. Standard Tech Stack (統一技術標準)
- **Framework**: React + Vite (SPA 架構)
- **Base URL**: `base: './'` (確保 GitHub Pages 部署路徑正確)
- **Build Define**: `__BUILD_TIME__` 與 `__APP_VERSION__` (在 `vite.config.js` 中定義當前打包時間與版本號)
- **Deployment**: `gh-pages` + `postdeploy.js` (自動提交與推送原始碼到 main 分支)

## 🧧 Redbag Domain Context & Printing Core Constraints
- **實體物理尺寸不可隨意更動**：
  - A5 紙張：寬 148mm × 高 210mm
  - 標準紅包袋：寬 90mm × 高 180mm
  - 列印解析度：嚴格鎖定 300 DPI (1mm ≈ 11.811px)
- **進紙校正座標系統保護**：
  - 靠左進紙：中心 45mm
  - 居中進紙：中心 74mm
  - 靠右進紙：中心 103mm
- **防卡紙翻轉機制**：封底先進紙時，必須維持 180° 自動旋轉輸出選項，確保印出為正向且避免封口折線捲入印表機卡紙。
- **預覽視角 Sticky 釘選**：右側紅包袋預覽面板必須維持 Sticky 釘選在畫面中，解決控制項過長滾動時看不見即時效果的痛點。
