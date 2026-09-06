import React, { useEffect, useRef } from 'react';
import { FEED_CONFIGS, PHYSICAL_SPECS } from '../constants/envelope';
import { drawToCanvas } from '../utils/canvasDrawer';

export default function EnvelopePreview({
  state,
  onToggleViewMode,
  onPrint,
  isDrawer = false
}) {
  const canvasRef = useRef(null);
  const cfg = FEED_CONFIGS[state.feedMode] || FEED_CONFIGS.center;

  // 當任何狀態改變時重繪預覽
  useEffect(() => {
    if (canvasRef.current) {
      drawToCanvas(
        canvasRef.current,
        PHYSICAL_SPECS.PREVIEW_WIDTH_PX,
        PHYSICAL_SPECS.PREVIEW_HEIGHT_PX,
        false,
        state
      );
    }
  }, [state]);

  const isBottom = state.direction === 'bottom';
  const isTrayView = state.previewMode === 'tray';

  // 狀態徽章文字
  let dirBadgeText = ' ‧ 封口朝下';
  if (isBottom) {
    dirBadgeText = isTrayView ? ' ‧ 封底朝下(托盤視角)' : ' ‧ 封底朝下(正面檢視)';
  }

  return (
    <div className={`preview-column ${isDrawer ? 'in-drawer' : ''}`}>
      <div className="preview-header">
        <span className="preview-label">A5 托盤與紅包袋模擬</span>
        <div className="preview-tools">
          {isBottom && (
            <button
              type="button"
              className={`view-flip-btn ${isTrayView ? 'active' : ''}`}
              onClick={onToggleViewMode}
              title={isTrayView ? '點擊切換為正面檢視' : '點擊切換為托盤進紙視角'}
            >
              {isTrayView ? '🖨️ 托盤視角' : '👁️ 正面檢視'}
            </button>
          )}
          <span className="feed-status-badge">
            {cfg.shortName}{dirBadgeText}
          </span>
        </div>
      </div>

      {/* A5 紙張模擬框 (250px × 354.7px) */}
      <div className="a5-container">
        {/* 進紙入口引導文字 */}
        <div
          className="a5-feed-arrow"
          style={
            isBottom && !isTrayView
              ? { background: 'rgba(200, 169, 110, 0.1)', color: '#c8a96e' }
              : {}
          }
        >
          {isBottom && !isTrayView
            ? '✨ 正面檢視（字體正向，直覺好微調）'
            : isBottom && isTrayView
            ? '▼ 印表機進紙入口（封底先進入）'
            : '▼ 印表機進紙入口（開口端先進入）'}
        </div>

        {/* A5 正中央虛線 */}
        <div className="a5-center-line" title="A5 紙張正中央"></div>

        {/* 擬真紅包袋 */}
        <div
          className={`envelope-mockup ${isBottom && isTrayView ? 'is-bottom-feed' : ''}`}
          style={{ left: `${cfg.envelopeLeftPx}px` }}
        >
          <div className="envelope-center-guide" title="紅包袋正中央"></div>
          <div className="envelope-flap-label">
            {isBottom && isTrayView
              ? '── 封口折線端 (在後) ──'
              : isBottom
              ? '── 封口折線端 ──'
              : '── 封口折線端 (先入) ──'}
          </div>
        </div>

        {/* 預覽文字 Canvas */}
        <canvas
          ref={canvasRef}
          className="preview-canvas"
          width={PHYSICAL_SPECS.PREVIEW_WIDTH_PX}
          height={PHYSICAL_SPECS.PREVIEW_HEIGHT_PX}
        />
      </div>

      {/* 快捷立即列印按鈕（釘選在預覽區下方，設定後隨時點擊列印） */}
      <button
        type="button"
        className="btn-print"
        onClick={onPrint}
        title="開啟瀏覽器高解析度 A5 列印對話框"
      >
        <span>🖨️</span> 立即列印紅包袋
      </button>

      {/* 底部說明文字 */}
      <p className="preview-footer-note">
        {isBottom
          ? isTrayView
            ? '🖨️ 目前為「托盤進紙視角」：模擬實體封底先進紙時托盤狀態，文字倒轉列印以保證印出後正向。'
            : '✨ 目前為「正面完成效果」：字體維持正向好閱讀。列印時系統會自動旋轉 180° 輸出，印出拿在手上完全正向且防卡紙！'
          : '白色區域代表印表機 A5 托盤，紅色區塊為實體紅包袋。文字將精準印在紅包袋中央。'}
      </p>
    </div>
  );
}
