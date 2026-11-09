import { FEED_CONFIGS, FONT_OPTIONS } from '../constants/redbagConstants';

/**
 * 繪製直排書法文字至 Canvas
 * @param {HTMLCanvasElement} canvas 
 * @param {number} W 畫布寬度 (px)
 * @param {number} H 畫布高度 (px)
 * @param {boolean} isPrint 是否為高解析度列印模式 (true: 純墨水輸出; false: 介面預覽)
 * @param {object} state 當前排版狀態設定
 */
export function drawToCanvas(canvas, W, H, isPrint, state) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, W, H);

  // 300 DPI: A4 寬 210mm = 2480px, 高 297mm = 3508px
  const DPI = 300;
  const MM = DPI / 25.4; // 1mm 對應之 px (約 11.811px)
  const S = W / 2480;    // 畫布基準縮放比率 (A4 寬 2480px)

  // 解析字型
  const fontObj = FONT_OPTIONS.find((f) => f.value === state.font) || FONT_OPTIONS[0];
  const fontFamily = fontObj.family;

  // 判斷是否旋轉 180°：
  // 1. 列印 (isPrint = true)：封底朝下且勾選「自動旋轉 180°」時旋轉列印
  // 2. 螢幕預覽 (isPrint = false)：預設正面檢視正向，僅在托盤視角 (previewMode === 'tray') 時旋轉
  const shouldRotate = (state.direction === 'bottom' && state.rotateOnPrint) && 
                       (isPrint || state.previewMode === 'tray');

  if (shouldRotate) {
    const centerXMm = FEED_CONFIGS[state.feedMode]?.centerX || 105;
    const centerYMm = 90; // 紅包袋垂直中心 90mm
    const cx = centerXMm * MM * S;
    const cy = centerYMm * MM * S;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(Math.PI);
    ctx.translate(-cx, -cy);
  }

  ctx.fillStyle = '#111111'; // 列印深黑碳墨
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  if (state.mode === 'single') {
    // 單欄居中模式
    const sizePx = Math.round(Number(state.s_size) * S);
    const xMm = Number(state.s_x);
    const yMm = Number(state.s_y);
    const gapMm = Number(state.s_gap);

    const xPx = Math.round(xMm * MM * S);
    const yPx = Math.round(yMm * MM * S);
    const gapPx = Math.round(gapMm * MM * S);

    const chars1 = (state.s_top || '').trim().split('');
    const chars2 = (state.s_bot || '').trim().split('');

    // 字元行進步長 (含適度字距)
    const step = Math.round((Number(state.s_size) + 12) * S);

    ctx.font = `700 ${sizePx}px ${fontFamily}`;

    let curY = yPx;

    // 上半段文字
    chars1.forEach((ch) => {
      ctx.fillText(ch, xPx, curY);
      curY += step;
    });

    // 兩段之間空隙
    curY += gapPx;

    // 下半段文字
    chars2.forEach((ch) => {
      ctx.fillText(ch, xPx, curY);
      curY += step;
    });

  } else if (state.mode === 'double') {
    // 雙欄模式：正中主文 (d_left，X=105mm) + 右側事由 (d_right，X=125mm)
    const rsizePx = Math.round(Number(state.d_rsize) * S);
    const lsizePx = Math.round(Number(state.d_lsize) * S);
    const rxPx = Math.round(Number(state.d_rx) * MM * S);
    const lxPx = Math.round(Number(state.d_lx) * MM * S);
    const rtopPx = Math.round(Number(state.d_rtop) * MM * S);
    const ltopPx = Math.round(Number(state.d_ltop) * MM * S);

    const rChars = (state.d_right || '').trim().split('');
    const lChars = (state.d_left || '').trim().split('');

    const rStep = Math.round((Number(state.d_rsize) + 10) * S);
    const lStep = Math.round((Number(state.d_lsize) + 8) * S);

    // 正中主文
    ctx.font = `700 ${lsizePx}px ${fontFamily}`;
    lChars.forEach((ch, i) => {
      ctx.fillText(ch, lxPx, ltopPx + i * lStep);
    });

    // 右側事由
    ctx.font = `700 ${rsizePx}px ${fontFamily}`;
    rChars.forEach((ch, i) => {
      ctx.fillText(ch, rxPx, rtopPx + i * rStep);
    });
  } else if (state.mode === 'triple') {
    // 三欄並排模式（右欄上款、中欄主文、左欄下款）
    const rsizePx = Math.round(Number(state.t_rsize) * S);
    const csizePx = Math.round(Number(state.t_csize) * S);
    const lsizePx = Math.round(Number(state.t_lsize) * S);

    const rxPx = Math.round(Number(state.t_rx) * MM * S);
    const cxPx = Math.round(Number(state.t_cx) * MM * S);
    const lxPx = Math.round(Number(state.t_lx) * MM * S);

    const rtopPx = Math.round(Number(state.t_rtop) * MM * S);
    const ctopPx = Math.round(Number(state.t_ctop) * MM * S);
    const ltopPx = Math.round(Number(state.t_ltop) * MM * S);

    const rChars = (state.t_right || '').trim().split('');
    const cChars = (state.t_center || '').trim().split('');
    const lChars = (state.t_left || '').trim().split('');

    const rStep = Math.round((Number(state.t_rsize) + 8) * S);
    const cStep = Math.round((Number(state.t_csize) + 10) * S);
    const lStep = Math.round((Number(state.t_lsize) + 8) * S);

    // 左欄（下款 / 敬贈 / 落款）
    ctx.font = `700 ${lsizePx}px ${fontFamily}`;
    lChars.forEach((ch, i) => {
      ctx.fillText(ch, lxPx, ltopPx + i * lStep);
    });

    // 中欄（正文 / 主文 / 獎金）
    ctx.font = `700 ${csizePx}px ${fontFamily}`;
    cChars.forEach((ch, i) => {
      ctx.fillText(ch, cxPx, ctopPx + i * cStep);
    });

    // 右欄（上款 / 賽事 / 題名）
    ctx.font = `700 ${rsizePx}px ${fontFamily}`;
    rChars.forEach((ch, i) => {
      ctx.fillText(ch, rxPx, rtopPx + i * rStep);
    });
  }

  // 還原旋轉矩陣
  if (shouldRotate) {
    ctx.restore();
  }
}

