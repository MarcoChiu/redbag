import { useState, useEffect, useRef, useCallback } from 'react';
import RedbagControlPanel from './redbag/RedbagControlPanel';
import RedbagPreview from './redbag/RedbagPreview';
import RedbagMobileSegmentedTabs from './redbag/RedbagMobileSegmentedTabs';
import RedbagMobileBottomBar from './redbag/RedbagMobileBottomBar';
import RedbagMobilePreviewDrawer from './redbag/RedbagMobilePreviewDrawer';
import {
  DEFAULT_SETTINGS,
  FEED_CONFIGS,
  PHYSICAL_SPECS,
  STORAGE_KEY
} from '../constants/redbagConstants';
import { drawToCanvas } from '../utils/redbagCanvasDrawer';
import '../style/redbag.css';

export default function RedbagPrint() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('tabletennis_redbag_settings_v3') ||
        localStorage.getItem('tabletennis_redbag_settings_v2') ||
        localStorage.getItem('tabletennis_redbag_settings_v1') ||
        localStorage.getItem('redbag_print_settings_a4_v1') ||
        localStorage.getItem('redbag_print_settings_v4') ||
        localStorage.getItem('envelope_print_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.s_x === 74 && parsed.feedMode === 'center') {
          parsed.s_x = 105;
          parsed.d_rx = 125;
          parsed.d_lx = 105;
        }
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
      d_lx: cfg.doubleLeftX,
      t_rx: cfg.tripleRightX,
      t_cx: cfg.tripleCenterX,
      t_lx: cfg.tripleLeftX
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

  // 確保列印畫布隨時繪製完畢
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

  // 觸發高解析度 300 DPI 列印 (使用 iframe 隔離避免主頁面樣式閃爍破版)
  const handlePrint = useCallback(() => {
    syncPrintCanvas();
    if (!printCanvasRef.current) return;

    const dataUrl = printCanvasRef.current.toDataURL('image/png');
    let iframe = document.getElementById('redbag-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'redbag-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>紅包袋列印</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 210mm !important;
      height: 297mm !important;
      overflow: hidden !important;
      background: transparent !important;
    }
    img {
      display: block;
      width: 210mm !important;
      height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
    }
  </style>
</head>
<body>
  <img src="${dataUrl}" alt="紅包袋列印" />
</body>
</html>`);
    doc.close();

    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 250);
  }, [syncPrintCanvas]);

  // 監聽鍵盤快捷鍵 (Ctrl+P / Cmd+P) 直接調用高畫質隔離列印
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePrint]);

  const buildTime = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'DEV';

  return (
    <div className="redbag-container">
      {/* 標題與簡介 */}
      <div className="redbag-header">
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
      </div>

      {/* 手機版頂部切換分頁 (桌面版自動隱藏) */}
      <RedbagMobileSegmentedTabs
        activeTab={mobileTab}
        onChange={setMobileTab}
      />

      <div className="redbag-workspace">
        {/* 控制設定面板 */}
        <div className={`redbag-workspace-pane redbag-pane-settings ${mobileTab === 'settings' ? 'active-mobile' : ''}`}>
          <RedbagControlPanel
            state={settings}
            onChange={updateSettings}
            onFeedModeSelect={handleFeedModeSelect}
            onDirectionSelect={handleDirectionSelect}
          />
        </div>

        {/* 右側 Sticky 釘選預覽區 */}
        <div className={`redbag-workspace-pane redbag-pane-preview ${mobileTab === 'preview' ? 'active-mobile' : ''}`}>
          <RedbagPreview
            state={settings}
            onToggleViewMode={handleToggleViewMode}
            onPrint={handlePrint}
          />
        </div>
      </div>

      {/* 手機版專屬底部懸浮快捷列 (桌面版自動隱藏) */}
      <RedbagMobileBottomBar
        state={settings}
        onOpenPreview={() => setIsDrawerOpen(true)}
        onPrint={handlePrint}
      />

      {/* 手機版彈出式即時預覽抽屜 */}
      <RedbagMobilePreviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        state={settings}
        onToggleViewMode={handleToggleViewMode}
        onPrint={handlePrint}
      />

      {/* 隱藏式高解析度列印專用畫布 */}
      <canvas
        ref={printCanvasRef}
        width={PHYSICAL_SPECS.PRINT_WIDTH_PX}
        height={PHYSICAL_SPECS.PRINT_HEIGHT_PX}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
}
