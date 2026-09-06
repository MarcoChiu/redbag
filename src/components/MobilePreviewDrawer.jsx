import React, { useEffect } from 'react';
import EnvelopePreview from './EnvelopePreview';

export default function MobilePreviewDrawer({
  isOpen,
  onClose,
  state,
  onToggleViewMode,
  onPrint
}) {
  // 當抽屜開啟時鎖定背景滾動
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-drawer-overlay" onClick={onClose}>
      <div
        className="mobile-drawer-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="紅包袋即時預覽抽屜"
      >
        <div className="mobile-drawer-handle" onClick={onClose} />
        <div className="mobile-drawer-header">
          <h3>🧧 紅包袋即時預覽 (所見即所得)</h3>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="關閉預覽"
          >
            ✕
          </button>
        </div>
        <div className="mobile-drawer-body">
          <EnvelopePreview
            state={state}
            onToggleViewMode={onToggleViewMode}
            onPrint={() => {
              onClose();
              onPrint();
            }}
            isDrawer
          />
        </div>
      </div>
    </div>
  );
}
