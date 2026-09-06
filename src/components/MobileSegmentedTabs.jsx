import React from 'react';

export default function MobileSegmentedTabs({ activeTab, onChange }) {
  return (
    <div className="mobile-segmented-tabs" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'settings'}
        className={`mobile-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
        onClick={() => onChange('settings')}
      >
        <span>⚙️</span> 參數設定
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'preview'}
        className={`mobile-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
        onClick={() => onChange('preview')}
      >
        <span>🧧</span> 紅包預覽與列印
      </button>
    </div>
  );
}
