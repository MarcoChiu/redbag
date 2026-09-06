import React from 'react';

export default function Header() {
  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0';
  const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : '';

  return (
    <header className="app-header">
      <div className="header-title-row">
        <span style={{ fontSize: '26px' }}>🧧</span>
        <h1 className="app-title">紅包袋列印工具</h1>
        <span className="badge-version" title={`建置時間: ${buildTime}`}>
          v{version}
          {buildTime && ` · ${buildTime}`}
        </span>
      </div>
      <p className="subtitle">
        支援印表機進紙對齊校正 ‧ 毫米級精確定標 ‧ 防卡紙 180° 自動翻轉 ‧ 所見即所得
      </p>
    </header>
  );
}
