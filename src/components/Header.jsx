export default function Header() {
  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.2.0';
  const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : '';

  return (
    <header className="redbag-header">
      <div className="redbag-header-title-row">
        <h2 className="redbag-title">🧧 紅包袋直排列印工具</h2>
        <span className="redbag-badge-version" title={buildTime ? `建置時間: ${buildTime}` : undefined}>
          v{version}
          {buildTime && ` · ${buildTime}`}
          {' · A4 (210×297mm) · 300 DPI 高畫質'}
        </span>
      </div>
      <p className="redbag-subtitle">
        支援單欄、雙欄、三欄直排書法題詞，具備毫米級精準定位、印表機進紙偏移校正與防卡紙 180° 自動翻轉。
      </p>
    </header>
  );
}
