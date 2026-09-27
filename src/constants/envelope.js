// 物理尺寸規格 (以毫米 mm 為基準，改為通用的 A4 紙張規格)
export const PHYSICAL_SPECS = {
  A4_WIDTH_MM: 210,
  A4_HEIGHT_MM: 297,
  // 相容性別名
  A5_WIDTH_MM: 210,
  A5_HEIGHT_MM: 297,
  ENVELOPE_WIDTH_MM: 90,
  ENVELOPE_HEIGHT_MM: 180,
  PRINT_DPI: 300,
  PRINT_WIDTH_PX: 2480,   // 210mm at 300 DPI
  PRINT_HEIGHT_PX: 3508,  // 297mm at 300 DPI
  PREVIEW_WIDTH_PX: 2100, // 210mm at 10 px/mm
  PREVIEW_HEIGHT_PX: 2970 // 297mm at 10 px/mm
};

// 進紙模式對應的基準 X 座標 (以 A4 寬 210mm 為基準，預覽模擬器寬 250px)
export const FEED_CONFIGS = {
  left: {
    key: 'left',
    name: '靠左進紙模式',
    shortName: '靠左進紙',
    envelopeLeftPx: 0,        // (0 / 210) * 250 = 0
    centerX: 45,
    doubleRightX: 45,
    doubleLeftX: 22,
    tripleRightX: 65,
    tripleCenterX: 45,
    tripleLeftX: 25,
    tip: '中心 45mm'
  },
  center: {
    key: 'center',
    name: '居中進紙模式',
    shortName: '居中進紙',
    envelopeLeftPx: 71,       // ((210 - 90) / 2 / 210) * 250 ≈ 71.4px
    centerX: 105,
    doubleRightX: 105,
    doubleLeftX: 82,
    tripleRightX: 125,
    tripleCenterX: 105,
    tripleLeftX: 85,
    tip: '中心 105mm'
  },
  right: {
    key: 'right',
    name: '靠右進紙模式',
    shortName: '靠右進紙',
    envelopeLeftPx: 143,      // ((210 - 90) / 210) * 250 ≈ 142.9px
    centerX: 165,
    doubleRightX: 165,
    doubleLeftX: 142,
    tripleRightX: 185,
    tripleCenterX: 165,
    tripleLeftX: 145,
    tip: '中心 165mm'
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

export const DEFAULT_SETTINGS = {
  mode: 'single',          // 'single' | 'double' | 'triple'
  feedMode: 'center',      // 'left' | 'center' | 'right'
  direction: 'top',        // 'top' (封口朝下) | 'bottom' (封底朝下)
  previewMode: 'front',    // 'front' (正面檢視) | 'tray' (托盤視角)
  rotateOnPrint: true,     // 封底朝下時是否旋轉 180° 列印
  font: 'DFKai-SB',
  // 單欄設定
  s_top: '感謝教練',
  s_bot: '端午安康',
  s_size: 144,
  s_x: 105,
  s_y: 37,
  s_gap: 10,
  // 雙欄設定
  d_right: '教練團獎金',
  d_rsize: 155,
  d_rx: 105,
  d_rtop: 53,
  d_left: '一一五年桌球錦標賽',
  d_lsize: 117,
  d_lx: 82,
  d_ltop: 42,
  // 三欄設定
  t_right: '一一五年全國桌球錦標賽',
  t_rsize: 105,
  t_rx: 125,
  t_rtop: 42,
  t_center: '教練團辛勞獎金',
  t_csize: 145,
  t_cx: 105,
  t_ctop: 50,
  t_left: '後援會全體家長 敬賀',
  t_lsize: 95,
  t_lx: 85,
  t_ltop: 55
};

export const STORAGE_KEY = 'redbag_print_settings_a4_v1';
