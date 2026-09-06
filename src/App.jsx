import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import EnvelopePreview from './components/EnvelopePreview';
import PrintCanvas from './components/PrintCanvas';
import {
  DEFAULT_SETTINGS,
  FEED_CONFIGS,
  PHYSICAL_SPECS,
  STORAGE_KEY
} from './constants/envelope';
import { drawToCanvas } from './utils/canvasDrawer';

export default function App() {
  const [settings, setSettings] = useState(() => {
    try {
      // 優先讀取新版 key，若無則兼容舊版 HTML 儲存的設定
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('envelope_print_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load saved envelope settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const printCanvasRef = useRef(null);

  // 自動保存到 LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings]);

  // 更新部分狀態
  const updateSettings = useCallback((partial) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  // 切換進紙模式 (自動校正推薦 X 座標)
  const handleFeedModeSelect = useCallback((mode) => {
    const cfg = FEED_CONFIGS[mode];
    if (!cfg) return;

    setSettings((prev) => ({
      ...prev,
      feedMode: mode,
      s_x: cfg.centerX,
      d_rx: cfg.doubleRightX,
      d_lx: cfg.doubleLeftX
    }));
  }, []);

  // 切換放紙方向 (預設切換為正面好排版視角)
  const handleDirectionSelect = useCallback((dir) => {
    setSettings((prev) => ({
      ...prev,
      direction: dir,
      previewMode: 'front'
    }));
  }, []);

  // 切換預覽檢視模式 (正面檢視 vs 托盤視角)
  const handleToggleViewMode = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      previewMode: prev.previewMode === 'front' ? 'tray' : 'front'
    }));
  }, []);

  // 觸發高解析度 300 DPI 列印
  const handlePrint = useCallback(() => {
    if (printCanvasRef.current) {
      drawToCanvas(
        printCanvasRef.current,
        PHYSICAL_SPECS.PRINT_WIDTH_PX,
        PHYSICAL_SPECS.PRINT_HEIGHT_PX,
        true,
        settings
      );
    }
    window.print();
  }, [settings]);

  return (
    <>
      <Header />

      <main className="workspace">
        {/* 左側可滾動的控制設定面板 */}
        <ControlPanel
          state={settings}
          onChange={updateSettings}
          onFeedModeSelect={handleFeedModeSelect}
          onDirectionSelect={handleDirectionSelect}
        />

        {/* 右側 Sticky 釘選預覽區 (不會隨左側滾動而消失) */}
        <EnvelopePreview
          state={settings}
          onToggleViewMode={handleToggleViewMode}
          onPrint={handlePrint}
        />
      </main>

      <footer className="app-footer">
        <div>🧧 紅包袋列印工具 · 毫米級精確定位</div>
        <div className="footer-links">
          <span>Port: 3007</span>
          <span>·</span>
          <span>A5 (148×210mm)</span>
          <span>·</span>
          <span>300 DPI Ultra HD</span>
        </div>
      </footer>

      {/* 列印專用高解析度畫布 */}
      <PrintCanvas ref={printCanvasRef} />
    </>
  );
}
