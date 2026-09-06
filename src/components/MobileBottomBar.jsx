import React, { useEffect, useRef } from 'react';
import { drawToCanvas } from '../utils/canvasDrawer';
import { PHYSICAL_SPECS } from '../constants/envelope';

export default function MobileBottomBar({ state, onOpenPreview, onPrint }) {
  const miniCanvasRef = useRef(null);

  // 迷你縮圖實時繪製
  useEffect(() => {
    if (miniCanvasRef.current) {
      drawToCanvas(
        miniCanvasRef.current,
        PHYSICAL_SPECS.PREVIEW_WIDTH_PX,
        PHYSICAL_SPECS.PREVIEW_HEIGHT_PX,
        false,
        state
      );
    }
  }, [state]);

  return (
    <aside className="mobile-bottom-bar" aria-label="手機快捷預覽操作列">
      <div
        className="mobile-bar-preview-trigger"
        onClick={onOpenPreview}
        role="button"
        tabIndex={0}
        title="點擊展開即時大圖預覽"
      >
        <div className="mini-envelope-box">
          <canvas
            ref={miniCanvasRef}
            className="mini-canvas"
            width={PHYSICAL_SPECS.PREVIEW_WIDTH_PX}
            height={PHYSICAL_SPECS.PREVIEW_HEIGHT_PX}
          />
        </div>
        <div className="mobile-bar-info">
          <div className="mobile-bar-title">
            <span>👁️ 點擊展開即時預覽</span>
          </div>
          <span className="mobile-bar-hint">隨調隨看 · 支援單雙欄</span>
        </div>
      </div>

      <button
        type="button"
        className="mobile-bar-print-btn"
        onClick={onPrint}
        title="直接送出列印"
      >
        <span>🖨️ 列印</span>
      </button>
    </aside>
  );
}
