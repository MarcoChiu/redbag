import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import EnvelopePreview from './components/EnvelopePreview';
import PrintCanvas from './components/PrintCanvas';
import MobileSegmentedTabs from './components/MobileSegmentedTabs';
import MobileBottomBar from './components/MobileBottomBar';
import MobilePreviewDrawer from './components/MobilePreviewDrawer';
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

  // 手機版切換分頁 ('settings' | 'preview')
  const [mobileTab, setMobileTab] = useState('settings');
  // 手機版彈出式預覽抽屜
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  // 確保列印畫布隨時繪製完畢 (支援按鈕點擊、Ctrl+P 或瀏覽器列印選單)
  const syncPrintCanvas = useCallback(() => {
    if (printCanvasRef.current) {
      drawToCanvas(
        printCanvasRef.current,
        PHYSICAL_SPECS.PRINT_WIDTH_PX,
        PHYSICAL_SPECS.PRINT_HEIGHT_PX,
        true,
        settings
      );
    }
  }, [settings]);

  // 設定或字型變更時即時預先繪製高解析度列印畫布
  useEffect(() => {
    syncPrintCanvas();
  }, [syncPrintCanvas]);

  // 監聽瀏覽器 beforeprint 事件 (無論按按鈕、Ctrl+P 或瀏覽器選單列印都確保畫布是最新的)
  useEffect(() => {
    const onBeforePrint = () => {
      syncPrintCanvas();
    };
    window.addEventListener('beforeprint', onBeforePrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
    };
  }, [syncPrintCanvas]);

  // 觸發高解析度 300 DPI 列印
  const handlePrint = useCallback(() => {
    syncPrintCanvas();
    // 延遲 50ms 確保瀏覽器完成 Canvas 重繪緩衝
    setTimeout(() => {
      window.print();
    }, 50);
  }, [syncPrintCanvas]);

  return (
    <>
      <Header />

      {/* 手機版頂部切換分頁 (桌面版自動隱藏) */}
      <MobileSegmentedTabs
        activeTab={mobileTab}
        onChange={setMobileTab}
      />

      <main className="workspace">
        {/* 控制設定面板 (手機版在 settings tab 時顯示，桌面版永遠顯示) */}
        <div className={`workspace-pane pane-settings ${mobileTab === 'settings' ? 'active-mobile' : ''}`}>
          <ControlPanel
            state={settings}
            onChange={updateSettings}
            onFeedModeSelect={handleFeedModeSelect}
            onDirectionSelect={handleDirectionSelect}
          />
        </div>

        {/* 右側 Sticky 釘選預覽區 (手機版在 preview tab 時顯示，桌面版永遠顯示) */}
        <div className={`workspace-pane pane-preview ${mobileTab === 'preview' ? 'active-mobile' : ''}`}>
          <EnvelopePreview
            state={settings}
            onToggleViewMode={handleToggleViewMode}
            onPrint={handlePrint}
          />
        </div>
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

      {/* 手機版專屬底部懸浮快捷列 (桌面版自動隱藏) */}
      <MobileBottomBar
        state={settings}
        onOpenPreview={() => setIsDrawerOpen(true)}
        onPrint={handlePrint}
      />

      {/* 手機版彈出式即時預覽抽屜 (隨調隨看) */}
      <MobilePreviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        state={settings}
        onToggleViewMode={handleToggleViewMode}
        onPrint={handlePrint}
      />

      {/* 列印專用高解析度畫布 */}
      <PrintCanvas ref={printCanvasRef} />
    </>
  );
}
