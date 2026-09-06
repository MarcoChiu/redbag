import React from 'react';

export default function HintCard({ direction, rotateOnPrint }) {
  const isBottom = direction === 'bottom';

  return (
    <div className="hint-card">
      <strong>🖨️ 印表機列印重要指引：</strong>
      <ol>
        <li>印表機紙張尺寸請務必選擇 <strong>A5 (148 × 210 mm)</strong>。</li>
        <li>邊界務必設為 <strong>「無」或「0」</strong>。</li>
        <li>縮放 / 比例請選 <strong>「實際大小 (100%)」</strong>，勿勾選縮小配合頁面。</li>
        <li>
          放紙方向：
          {isBottom ? (
            <span>
              <strong>紅包袋封底（封閉平整端）先朝下放入</strong>進紙托盤。
              {rotateOnPrint
                ? '（系統已自動為您倒轉 180° 列印，印出拿在手上為正向，徹底保護封口不卡紙壓爛！）'
                : '（目前設定為不倒轉列印）'}
            </span>
          ) : (
            <span>
              <strong>紅包袋封口（開口折線端）朝下放入</strong>進紙托盤。
            </span>
          )}
        </li>
      </ol>
    </div>
  );
}
