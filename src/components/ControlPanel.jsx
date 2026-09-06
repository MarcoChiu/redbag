import React from 'react';
import { FEED_CONFIGS, FONT_OPTIONS } from '../constants/envelope';
import HintCard from './HintCard';

export default function ControlPanel({
  state,
  onChange,
  onFeedModeSelect,
  onDirectionSelect
}) {
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };

  const handleNumberChange = (field, value) => {
    onChange({ [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="panel">
      {/* 模式切換 Tabs */}
      <div className="tabs">
        <button
          type="button"
          className={`tab ${state.mode === 'single' ? 'active' : ''}`}
          onClick={() => onChange({ mode: 'single' })}
        >
          <span>✏️</span> 單欄居中模式
        </button>
        <button
          type="button"
          className={`tab ${state.mode === 'double' ? 'active' : ''}`}
          onClick={() => onChange({ mode: 'double' })}
        >
          <span>📜</span> 雙欄並排模式
        </button>
      </div>

      {/* 1. 印表機進紙方式校正 */}
      <div className="control-card">
        <div className="section-title">
          <span>1. 印表機進紙位置校正</span>
        </div>
        <div className="feed-modes">
          {Object.values(FEED_CONFIGS).map((cfg) => (
            <button
              key={cfg.key}
              type="button"
              className={`feed-btn ${state.feedMode === cfg.key ? 'active' : ''}`}
              onClick={() => onFeedModeSelect(cfg.key)}
            >
              {cfg.shortName}
              <small>{cfg.tip}</small>
            </button>
          ))}
        </div>
      </div>

      {/* 2. 紅包袋放紙方向 (防卡紙防壓爛) */}
      <div className="control-card">
        <div className="section-title">
          <span>2. 紅包袋放紙方向（防爛防卡紙）</span>
        </div>
        <div className="feed-directions">
          <button
            type="button"
            className={`dir-btn ${state.direction === 'top' ? 'active' : ''}`}
            onClick={() => onDirectionSelect('top')}
          >
            封口朝下 (開口先入)
            <small>傳統模式 ‧ 開口端先進紙</small>
          </button>
          <button
            type="button"
            className={`dir-btn ${state.direction === 'bottom' ? 'active' : ''}`}
            onClick={() => onDirectionSelect('bottom')}
          >
            封底朝下 (封閉端先入) ★
            <small>防止封口壓爛 ‧ 順暢進紙</small>
          </button>
        </div>

        {/* 封底朝下選項 */}
        {state.direction === 'bottom' && (
          <div className="bottom-feed-options">
            <label className="rotate-toggle-row">
              <input
                type="checkbox"
                checked={state.rotateOnPrint}
                onChange={(e) => onChange({ rotateOnPrint: e.target.checked })}
              />
              <span><strong>列印自動旋轉 180°</strong>（確保印出拿在手上為正向）</span>
            </label>
            <div className="bottom-feed-tip">
              💡 <strong>說明：</strong>封底先放入印表機時，是自紙張底部打印。系統列印時會<strong>自動倒轉 180°</strong> 輸出，印出後拿起紅包袋（封口在上方）時，<strong>文字完全正向、不顛倒</strong>！
            </div>
          </div>
        )}
      </div>

      {/* 3. 字體風格 */}
      <div className="control-card">
        <div className="section-title">
          <span>3. 字體風格</span>
        </div>

        <div className="field">
          <label>
            <span>字體風格</span>
            <span className="label-hint">楷體具經典喜慶氣息</span>
          </label>
          <select
            value={state.font}
            onChange={(e) => handleInputChange('font', e.target.value)}
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. 文字內容與排版控制項 */}
      <div className="control-card">
        {state.mode === 'single' ? (
          <>
            <div className="section-title">
              <span>4. 單欄文字與毫米級排版</span>
            </div>

            <div className="field">
              <label>上半段文字（直排）</label>
              <input
                type="text"
                value={state.s_top}
                onChange={(e) => handleInputChange('s_top', e.target.value)}
                placeholder="如：感謝教練"
              />
            </div>

            <div className="field">
              <label>下半段文字（直排）</label>
              <input
                type="text"
                value={state.s_bot}
                onChange={(e) => handleInputChange('s_bot', e.target.value)}
                placeholder="如：端午安康"
              />
            </div>

            <div className="field">
              <label>
                <span>字級大小</span>
                <span className="label-hint">微調字體視覺張力</span>
              </label>
              <div className="range-row">
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={state.s_size}
                  onChange={(e) => handleNumberChange('s_size', e.target.value)}
                />
                <span className="range-val">{state.s_size}</span>
              </div>
            </div>

            <div className="field">
              <label>
                <span>水平位置（mm）</span>
                <span className="label-hint">依進紙模式自動置中，亦可手動微調</span>
              </label>
              <div className="range-row">
                <input
                  type="range"
                  min="15"
                  max="135"
                  value={state.s_x}
                  onChange={(e) => handleNumberChange('s_x', e.target.value)}
                />
                <span className="range-val">{state.s_x}</span>
              </div>
            </div>

            <div className="field">
              <label>
                <span>垂直起始位置（mm）</span>
                <span className="label-hint">可避開頂部壓紋圖樣</span>
              </label>
              <div className="range-row">
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={state.s_y}
                  onChange={(e) => handleNumberChange('s_y', e.target.value)}
                />
                <span className="range-val">{state.s_y}</span>
              </div>
            </div>

            <div className="field">
              <label>
                <span>上下段文字間距（mm）</span>
                <span className="label-hint">微調兩段語意間距</span>
              </label>
              <div className="range-row">
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={state.s_gap}
                  onChange={(e) => handleNumberChange('s_gap', e.target.value)}
                />
                <span className="range-val">{state.s_gap}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="section-title">
              <span>4. 雙欄文字與毫米級排版</span>
            </div>

            {/* 右欄主文 */}
            <div className="field">
              <label>右欄主文（直排）</label>
              <input
                type="text"
                value={state.d_right}
                onChange={(e) => handleInputChange('d_right', e.target.value)}
                placeholder="如：教練團獎金"
              />
            </div>
            <div className="field">
              <label>右欄字級大小</label>
              <div className="range-row">
                <input
                  type="range"
                  min="60"
                  max="180"
                  value={state.d_rsize}
                  onChange={(e) => handleNumberChange('d_rsize', e.target.value)}
                />
                <span className="range-val">{state.d_rsize}</span>
              </div>
            </div>
            <div className="field">
              <label>右欄水平位置（mm）</label>
              <div className="range-row">
                <input
                  type="range"
                  min="20"
                  max="130"
                  value={state.d_rx}
                  onChange={(e) => handleNumberChange('d_rx', e.target.value)}
                />
                <span className="range-val">{state.d_rx}</span>
              </div>
            </div>
            <div className="field">
              <label>右欄上方邊距（mm）</label>
              <div className="range-row">
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={state.d_rtop}
                  onChange={(e) => handleNumberChange('d_rtop', e.target.value)}
                />
                <span className="range-val">{state.d_rtop}</span>
              </div>
            </div>

            {/* 左欄副文 */}
            <div className="field" style={{ marginTop: '10px' }}>
              <label>左欄副文（直排）</label>
              <input
                type="text"
                value={state.d_left}
                onChange={(e) => handleInputChange('d_left', e.target.value)}
                placeholder="如：一一五年桌球錦標賽"
              />
            </div>
            <div className="field">
              <label>左欄字級大小</label>
              <div className="range-row">
                <input
                  type="range"
                  min="40"
                  max="140"
                  value={state.d_lsize}
                  onChange={(e) => handleNumberChange('d_lsize', e.target.value)}
                />
                <span className="range-val">{state.d_lsize}</span>
              </div>
            </div>
            <div className="field">
              <label>左欄水平位置（mm）</label>
              <div className="range-row">
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={state.d_lx}
                  onChange={(e) => handleNumberChange('d_lx', e.target.value)}
                />
                <span className="range-val">{state.d_lx}</span>
              </div>
            </div>
            <div className="field">
              <label>左欄上方邊距（mm）</label>
              <div className="range-row">
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={state.d_ltop}
                  onChange={(e) => handleNumberChange('d_ltop', e.target.value)}
                />
                <span className="range-val">{state.d_ltop}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 列印注意事項卡片 */}
      <HintCard direction={state.direction} rotateOnPrint={state.rotateOnPrint} />
    </div>
  );
}
