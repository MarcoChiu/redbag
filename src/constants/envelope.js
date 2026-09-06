// 物理尺寸規格 (以毫米 mm 為基準)
export const PHYSICAL_SPECS = {
  A5_WIDTH_MM: 148,
  A5_HEIGHT_MM: 210,
  ENVELOPE_WIDTH_MM: 90,
  ENVELOPE_HEIGHT_MM: 180,
  PRINT_DPI: 300,
  PRINT_WIDTH_PX: 1748,   // 148mm at 300 DPI
  PRINT_HEIGHT_PX: 2480,  // 210mm at 300 DPI
  PREVIEW_WIDTH_PX: 1480,
  PREVIEW_HEIGHT_PX: 2100
};

// 進紙模式對應的基準 X 座標 (以 A5 寬 148mm 為基準)
export const FEED_CONFIGS = {
  left: {
    key: 'left',
    name: '靠左進紙模式',
    shortName: '靠左進紙',
    envelopeLeftPx: 0,        // (0 / 148) * 250 = 0
    centerX: 45,
    doubleRightX: 45,
    doubleLeftX: 22,
    tip: '中心 45mm'
  },
  center: {
    key: 'center',
    name: '居中進紙模式',
    shortName: '居中進紙',
    envelopeLeftPx: 49,       // ((148 - 90) / 2 / 148) * 250 ≈ 49px
    centerX: 74,
    doubleRightX: 74,
    doubleLeftX: 51,
    tip: '中心 74mm'
  },
  right: {
    key: 'right',
    name: '靠右進紙模式',
    shortName: '靠右進紙',
    envelopeLeftPx: 98,       // ((148 - 90) / 148) * 250 ≈ 98px
    centerX: 103,
    doubleRightX: 103,
    doubleLeftX: 80,
    tip: '中心 103mm'
  }
};

export const FONT_OPTIONS = [
  {
    value: 'DFKai-SB',
    label: '標楷體 (經典書法氣息)',
    family: '"DFKai-SB", "BiauKai", "標楷體", "Kaiti TC", "STKaiti", serif'
  },
  {
    value: 'Microsoft JhengHei',
    label: '微軟正黑體 (Bold 現代風格)',
    family: '"Microsoft JhengHei", "微軟正黑體", sans-serif'
  },
  {
    value: 'Noto Sans TC',
    label: '思源黑體 (精緻黑體)',
    family: '"Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", sans-serif'
  }
];

export const QUICK_PHRASES = [
  { label: '端午感謝教練', topOrRight: '感謝教練', botOrLeft: '端午安康', isDouble: false },
  { label: '新春感謝教練', topOrRight: '感謝教練', botOrLeft: '新春大吉', isDouble: false },
  { label: '敬謝恩師', topOrRight: '敬謝恩師', botOrLeft: '教誨如春風', isDouble: false },
  { label: '雙欄：教練團獎金', topOrRight: '教練團獎金', botOrLeft: '一一五年桌球錦標賽', isDouble: true },
  { label: '雙欄：比賽獎勵', topOrRight: '優秀選手獎勵金', botOrLeft: '全國桌球公開賽', isDouble: true },
  { label: '雙欄：福壽安康', topOrRight: '福壽雙全安康富貴', botOrLeft: '歲歲平安年年順遂', isDouble: true }
];

export const DEFAULT_SETTINGS = {
  mode: 'single',          // 'single' | 'double'
  feedMode: 'center',      // 'left' | 'center' | 'right'
  direction: 'top',        // 'top' (封口朝下) | 'bottom' (封底朝下)
  previewMode: 'front',    // 'front' (正面檢視) | 'tray' (托盤視角)
  rotateOnPrint: true,     // 封底朝下時是否旋轉 180° 列印
  font: 'DFKai-SB',
  // 單欄設定
  s_top: '感謝教練',
  s_bot: '端午安康',
  s_size: 144,
  s_x: 74,
  s_y: 37,
  s_gap: 10,
  // 雙欄設定
  d_right: '教練團獎金',
  d_rsize: 155,
  d_rx: 74,
  d_rtop: 53,
  d_left: '一一五年桌球錦標賽',
  d_lsize: 117,
  d_lx: 51,
  d_ltop: 42
};

export const STORAGE_KEY = 'redbag_print_settings_v4';
