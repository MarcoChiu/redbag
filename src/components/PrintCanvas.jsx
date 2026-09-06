import React, { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { PHYSICAL_SPECS } from '../constants/envelope';

const PrintCanvas = forwardRef(function PrintCanvas(props, ref) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div id="printPage" aria-hidden="true">
      <canvas
        ref={ref}
        width={PHYSICAL_SPECS.PRINT_WIDTH_PX}
        height={PHYSICAL_SPECS.PRINT_HEIGHT_PX}
      />
    </div>,
    document.body
  );
});

export default PrintCanvas;
