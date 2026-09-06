# 🧧 紅包袋列印工具 (React + Vite 版)

🚀 **線上直接使用連結：[https://MarcoChiu.github.io/redbag/](https://MarcoChiu.github.io/redbag/)**

[![Privacy First](https://img.shields.io/badge/Privacy-100%25_Local-brightgreen?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20Vite%206-blue?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![Port](https://img.shields.io/badge/Port-3007-orange?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![Version](https://img.shields.io/badge/Version-v1.0.0-gold?style=flat-spec)](https://github.com/MarcoChiu/redbag)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-spec)](https://github.com/MarcoChiu/redbag)

一個專為一般家用/辦公室印表機設計的**紅包袋直排列印工具**。本專案採用 **React + Vite** 現代化架構重構，100% 在瀏覽器端本地端運行，提供毫米級精確定位、印表機進紙偏移校正、防卡紙翻轉與即時預覽體驗。

> [!IMPORTANT]
> **隱私第一（Privacy First）**：本工具的所有運算與文字排版完全在瀏覽器本地 Canvas 完成，不會將文字上傳至任何伺服器，安全、快速且支援離線使用！

---

## 🌟 核心特色 (Key Features)

### 1. 🖨️ 印表機進紙方式校正（解決偏心與歪斜問題）
- **居中進紙**（預設，中心 74mm）：適用於雙邊導軌向中央收縮的印表機。
- **靠左進紙**（中心 45mm）：適用於固定靠左進紙的印表機。
- **靠右進紙**（中心 103mm）：適用於固定靠右進紙的印表機。
- 自動聯動調整預覽紅包袋與水平座標數值，亦支援手動微調至 1mm 精度。

### 2. 🛡️ 防卡紙 180° 自動翻轉技術（保護封口折線不被壓爛）
- **封口朝下（傳統模式）**：開口端先進紙。
- **封底朝下（推薦防卡紙）**：紅包袋平整封閉端先進紙，徹底避免封口處捲入印表機搓紙輪而卡紙或刮損。
- **180° 自動旋轉輸出**：勾選後列印自動倒轉 180°，列印完成拿起紅包袋時，**字體完全正向、不顛倒**。
- **正面 / 托盤視角一鍵切換**：預覽預設以「正面完成效果」呈現，字體永遠正向方便排版，亦可點擊切換為「托盤視角」模擬進紙狀態。

### 3. 📝 單欄與雙欄靈活排版
- **單欄模式**：支援上半段與下半段直排文字，可自訂字級、上下段間距與水平/垂直位置。
- **雙欄模式**：支援右欄（主文）與左欄（副文），獨立調整兩欄字級與位置，適用於「賽事獎勵」、「感謝恩師」等正式題字。
- **經典書法字體支援**：內建標楷體、微軟正黑體、思源黑體，字韻典雅。
- **常用範本快速填入**：提供多組常見祝賀詞，一鍵套用。

### 4. 📌 右側 Sticky 固定釘選預覽（解決控制項長度痛點）
- 針對設定項目繁多、表單滾動過長的痛點，右側 A5 托盤與紅包袋模擬器採用 **Sticky 釘選機制**。
- 不管左側滾動微調到哪一個滑桿，右側紅包袋文字與排版效果始終保持在視窗正中央！
- 預覽區下方直接集成**大尺寸「立即列印」按鈕**，無需滾動到底部即可隨時列印。

### 5. 🎯 300 DPI 超高解析度輸出
- 專門針對標準 A5 托盤 (148 × 210 mm) 與標準紅包袋 (90 × 180 mm) 定制。
- 繪製層使用 1748 × 2480 px 高解析度 Canvas，字體邊緣銳利清晰，無毛邊鋸齒。

---

## 🚀 Unified Workspace & Port 規範

本專案遵循 `c:\Marco\DeveloperAI\` 統一專案連續 Port 分配矩陣：

| Port | 專案名稱 | 說明 |
| :--- | :--- | :--- |
| `3000` | `localhosttoolbox` | 本地萬能 PDF 與圖片工具箱 |
| `3001` | `memorizewords` | 單字記憶工具 |
| `3002` | `youtubegetlink` | YouTube 連結解析工具 |
| `3003` | `livepoll` | 即時投票系統 |
| `3004` | `kline` | K線預測量化分析 |
| `3005` | `fs533610tt` | 桌球賽事管理 |
| `3006` | `HIIT` | 間歇運動計時器 |
| **`3007`** | **`redbag`** | **紅包袋列印工具 (本專案)** |
| `3008+` | *(未來專案)* | *依序往下遞增分配* |

---

## 💻 快速開始 (Getting Started)

### 1. 本地開發
```bash
# 安裝相依套件
npm install

# 啟動 Vite 開發伺服器 (指定 Port 3007)
npm run dev
```
啟動後於瀏覽器開啟：`http://localhost:3007`

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
│   └── AGENTS.md             # AI Agent 規範與 Port 分配約定
├── public/
│   └── favicon.svg           # 紅包袋向量圖示
├── src/
│   ├── components/
│   │   ├── Header.jsx        # 標題與版本號/建置時間 Badge
│   │   ├── ControlPanel.jsx  # 控制設定面板 (進紙校正、字型、滑桿)
│   │   ├── EnvelopePreview.jsx # Sticky 釘選預覽與快捷列印按鈕
│   │   ├── HintCard.jsx      # 動態列印設定指引
│   │   └── PrintCanvas.jsx   # 300 DPI 列印專用畫布
│   ├── constants/
│   │   └── envelope.js       # 尺寸規格、進紙定義、祝賀詞範本
│   ├── utils/
│   │   └── canvasDrawer.js   # 高解析度直排書法 Canvas 繪製核心
│   ├── App.jsx               # 狀態管理、LocalStorage 存取與整體版面
│   ├── index.css             # 黑金主題、Glassmorphism、Sticky 樣式
│   └── main.jsx              # React 19 掛載點
├── index.html                # HTML 模板與 Google Fonts 引用
├── package.json              # 專案相依與 scripts
├── vite.config.js            # Vite 配置 (Port 3007, base: './', __BUILD_TIME__)
├── postdeploy.js             # GitHub Pages 自動發佈與原始碼同步腳本
└── 紅包袋列印工具.html       # 原版備份參考檔案
```

---

## 📝 授權條款 (License)

本專案採用 **ISC License** 授權開源。
