import { createContext } from 'react';

import { noop } from 'figura/utils/noop';
import type { DrawerContextType } from 'figura/models';
import { INITIALDRAWER_CONTEXT_STATE } from 'figura/config/constants';

export const DrawerContext = createContext<DrawerContextType>({
  state: INITIALDRAWER_CONTEXT_STATE,
  hoverSelection: { initX: 0, initY: 0, x: 0, y: 0, width: 0, height: 0 },
  handler: {
    mouseDown: noop,
    mouseUp: noop,
  },
  dispatch: noop,
  handleHoverSelection: noop,
});
