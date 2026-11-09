export default function Header() {
  const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'DEV';

  return (
    <header className="redbag-header">
      <div className="redbag-header-title-row">
        <h2 className="redbag-title">🧧 紅包袋直排列印工具</h2>
        <span className="redbag-badge-version" title={`系統建置版本：v.${buildTime}`}>
          v.{buildTime}
        </span>
        <span className="redbag-badge-version">A4 (210×297mm) · 300 DPI 高畫質</span>
      </div>
      <p className="redbag-subtitle">
        支援單欄、雙欄、三欄直排書法題詞，具備毫米級精準定位、印表機進紙偏移校正與防卡紙 180° 自動翻轉。
      </p>
    </header>
  );
}
