# 🧧 紅包袋列印工具 (React + Vite 版)

🚀 **線上直接使用連結：[https://MarcoChiu.github.io/redbag/](https://MarcoChiu.github.io/redbag/)**

[![Privacy First](https://img.shields.io/badge/Privacy-100%25_Local-brightgreen?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Vite%206-blue?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![Version](https://img.shields.io/badge/Version-v1.2.0-gold?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-spec)](https://github.com/MarcoChiu/redbag)

一個專為一般家用/辦公室印表機設計的**紅包袋直排列印工具**。本專案採用 **React + Vite** 現代化架構重構，100% 在瀏覽器端本地端運行，提供毫米級精確定位、印表機進紙偏移校正、防卡紙翻轉與即時預覽體驗。

> [!IMPORTANT]
> **隱私第一（Privacy First）**：本工具的所有運算與文字排版完全在瀏覽器本地 Canvas 完成，不會將文字上傳至任何伺服器，安全、快速且支援離線使用！

---

## 🌟 核心特色 (Key Features)

### 1. 🖨️ 印表機進紙方式校正（解決偏心與歪斜問題）
- **居中進紙**（預設，中心 105mm）：適用於雙邊導軌向中央收縮的標準 A4 印表機。
- **靠左進紙**（中心 45mm）：適用於固定靠左進紙的印表機。
- **靠右進紙**（中心 165mm）：適用於固定靠右進紙的印表機。
- 自動聯動調整預覽紅包袋與水平座標數值，亦支援手動微調至 1mm 精度。

### 2. 🛡️ 防卡紙 180° 自動翻轉技術（保護封口折線不被壓爛）
- **封口朝下（傳統模式）**：開口端先進紙。
- **封底朝下（推薦防卡紙）**：紅包袋平整封閉端先進紙，徹底避免封口處捲入印表機搓紙輪而卡紙或刮損。
- **180° 自動旋轉輸出**：勾選後列印自動倒轉 180°，列印完成拿起紅包袋時，**字體完全正向、不顛倒**。
- **正面 / 托盤視角一鍵切換**：預覽預設以「正面完成效果」呈現，字體永遠正向方便排版，亦可點擊切換為「托盤視角」模擬進紙狀態。

### 3. 📝 單欄、雙欄與三欄靈活排版
- **單欄模式**：支援上半段與下半段直排文字，可自訂字級、上下段間距與水平/垂直位置。
- **雙欄模式（正中主文 + 右側事由）**：支援右欄（賽事 / 事由）與中欄（正中主文 / 獎金），字級與位置獨立微調，適用於「賽事獎勵」、「感謝恩師」等題字。
- **三欄模式（經典書法題詞）**：支援右欄（上款/題名）、中欄（正文/獎金主文）、左欄（下款/致贈人敬賀），完整呈現傳統典雅紅包袋格局，各自具備獨立字級與毫米級座標微調。
- **經典書法字體支援**：內建標楷體、微軟正黑體、思源黑體，字韻典雅。

### 4. 📌 右側 Sticky 固定釘選預覽（解決控制項長度痛點）
- 針對設定項目繁多、表單滾動過長的痛點，右側 A4 托盤與紅包袋模擬器採用 **Sticky 釘選機制**。
- 不管左側滾動微調到哪一個滑桿，右側紅包袋文字與排版效果始終保持在視窗正中央！
- 預覽區下方直接集成**大尺寸「立即列印」按鈕**，無需滾動到底部即可隨時列印。

### 5. 🎯 300 DPI 超高解析度輸出與隔離列印
- 專門針對通用標準 A4 托盤 (210 × 297 mm) 與標準紅包袋 (90 × 180 mm) 定制。
- 繪製層使用 2480 × 3508 px 超高解析度 Canvas，字體邊緣銳利清晰，無毛邊鋸齒。
- 採用獨立隱藏 iframe 列印技術，確保列印不受外部 CSS 污染，無邊距、無多餘頁面。

---

## 💻 快速開始 (Getting Started)

### 1. 本地開發
```bash
# 安裝相依套件
npm install

# 啟動 Vite 開發伺服器
npm run dev
```

### 2. 專案打包
```bash
npm run build
```

### 3. 一鍵部署至 GitHub Pages
```bash
npm run deploy
```
系統會自動執行打包，透過 `gh-pages` 發佈至遠端，並藉由 `postdeploy.js` 自動提交並推送原始碼到 `main` 分支。

---

## 📁 專案架構 (Project Structure)

```text
redbag/
├── .agents/
│   └── AGENTS.md             # AI Agent 開發指引
├── public/
│   └── favicon.svg           # 紅包袋向量圖示
├── src/
│   ├── components/
│   │   ├── RedbagPrint.jsx   # 核心紅包袋列印主元件 (含高畫質隔離列印)
│   │   ├── redbag/           # 模組化設定面板與預覽抽屜元件群
│   │   │   ├── RedbagControlPanel.jsx
│   │   │   ├── RedbagPreview.jsx
│   │   │   ├── RedbagMobileBottomBar.jsx
│   │   │   ├── RedbagMobilePreviewDrawer.jsx
│   │   │   ├── RedbagMobileSegmentedTabs.jsx
│   │   │   └── RedbagHintCard.jsx
│   ├── constants/
│   │   └── redbagConstants.js # 尺寸規格、進紙定義、雙欄/三欄預設
│   ├── style/
│   │   └── redbag.css        # 紅包袋專用樣式與響應式抽屜版面
│   ├── utils/
│   │   └── redbagCanvasDrawer.js # 高解析度直排書法 Canvas 繪製核心
│   ├── App.jsx               # 根元件
│   ├── index.css             # 全域重設與背景樣式
│   └── main.jsx              # React 19 掛載點
├── index.html                # HTML 模板與 Google Fonts 引用
├── package.json              # 專案相依與 scripts
├── vite.config.js            # Vite 配置 (base: './', __BUILD_TIME__)
├── postdeploy.js             # GitHub Pages 自動發佈與原始碼同步腳本
└── 紅包袋列印工具.html       # 原版備份參考檔案
```

---

## 📝 授權條款 (License)

本專案採用 **ISC License** 授權開源。
