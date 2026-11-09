# Redbag (紅包袋列印工具) - AI Agent Rules

These rules must be strictly followed by all AI agents operating within this workspace to maintain the established architectural and UX standards.

## 🚀 Standard Tech Stack (統一技術標準)
- **Framework**: React + Vite (SPA 架構)
- **Base URL**: `base: './'` (確保 GitHub Pages 部署路徑正確)
- **Version & Build Timestamp**: 採用與 accounting-axo 一致的 `v.{buildTime}` 機制，在 `vite.config.js` 中透過 `Intl.DateTimeFormat` (Asia/Taipei) 自動生成 `YYYYMMDDHHmm`，UI 顯示為 `v.{buildTime}`。
- **Deployment**: `gh-pages` + `postdeploy.js` (自動提交並推送原始碼到 main 分支)

## 🧧 Redbag Domain Context & Printing Core Constraints
- **實體物理尺寸不可隨意更動**：
  - A4 紙張（最通用標準）：寬 210mm × 高 297mm
  - 標準紅包袋：寬 90mm × 高 180mm
  - 列印解析度：嚴格鎖定 300 DPI (1mm ≈ 11.811px)
- **進紙校正座標系統保護 (以 A4 寬 210mm 為基準)**：
  - 靠左進紙：中心 45mm
  - 居中進紙：中心 105mm
  - 靠右進紙：中心 165mm
- **防卡紙翻轉機制**：封底先進紙時，必須維持 180° 自動旋轉輸出選項，確保印出為正向且避免封口折線捲入印表機卡紙。
- **預覽視角 Sticky 釘選**：右側紅包袋預覽面板必須維持 Sticky 釘選在畫面中，解決控制項過長滾動時看不見即時效果的痛點。
