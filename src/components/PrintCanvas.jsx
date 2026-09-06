import React, { forwardRef } from 'react';
import { PHYSICAL_SPECS } from '../constants/envelope';

const PrintCanvas = forwardRef(function PrintCanvas(props, ref) {
  return (
    <div id="printPage" aria-hidden="true">
      <canvas
        ref={ref}
        width={PHYSICAL_SPECS.PRINT_WIDTH_PX}
        height={PHYSICAL_SPECS.PRINT_HEIGHT_PX}
      />
    </div>
  );
});

export default PrintCanvas;
