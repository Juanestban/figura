import { type PropsWithChildren, useState, useReducer } from 'react';
import Konva from 'konva';

import { DrawerContext } from './DrawerContext';
import reducer from './reducer';
import { DrawerType } from 'figura/models';
import type { HoverSelection, IPosition } from 'figura/models';
import {
  INITIAL_POSITIONS,
  INITIALDRAWER_CONTEXT_STATE,
  DEFAULT_HOVER_SELECTION,
} from 'figura/config/constants';

function DrawerProvider({ children }: PropsWithChildren) {
  const [positions, setPositions] = useState<IPosition>(INITIAL_POSITIONS);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoverSelection, setHoverSelection] = useState<HoverSelection>(DEFAULT_HOVER_SELECTION);
  const [state, dispatch] = useReducer(reducer, INITIALDRAWER_CONTEXT_STATE);
  const { action } = state;

  const mouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (action === 'frame') {
      const { evt } = event;
      const { clientX: x, clientY: y } = evt;

      setPositions({ x, y });
      setHoverSelection((prev) => ({ ...prev, initX: x, initY: y, x, y }));
      setIsSelecting(true);
    }
  };

  const handleHoverSelection = (options: Partial<HoverSelection>) => {
    setHoverSelection((prev) => ({ ...prev, ...options }));
  };

  const mouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { x: initX, y: initY } = positions;

    if (action === 'frame' && initX !== null && initY !== null) {
      const { evt } = event;
      const { clientX, clientY } = evt;

      if (initX === clientX && initY === clientY) {
        clearAll();
        return;
      }

      const width = initX > clientX ? initX - clientX : clientX - initX;
      const height = initY > clientY ? initY - clientY : clientY - initY;
      const x = initX > clientX ? initX - width : initX;
      const y = initY > clientY ? initY - height : initY;

      clearAll();
      dispatch({
        type: DrawerType.NEW_FIGURE,
        payload: {
          props: { x, y, width, height, stroke: 'red', strokeWidth: 2 },
        },
      });
    }
  };

  const clearAll = () => {
    setIsSelecting(false);
    handleHoverSelection(DEFAULT_HOVER_SELECTION);
  };

  return (
    <DrawerContext.Provider
      value={{
        state,
        isSelecting,
        hoverSelection,
        handler: {
          mouseDown,
          mouseUp,
        },
        dispatch,
        handleHoverSelection,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
