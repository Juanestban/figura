import { type PropsWithChildren, useState, useReducer } from 'react';
import Konva from 'konva';

import { DrawerContext } from './DrawerContext';
import reducer from './reducer';
import { DrawerType, ICommandName } from 'figura/models';
import type { HoverSelection, IPosition } from 'figura/models';
import {
  INITIAL_POSITIONS,
  INITIALDRAWER_CONTEXT_STATE,
  DEFAULT_HOVER_SELECTION,
} from 'figura/config/constants';
import { useListener } from 'figura/hooks/useListener';

function DrawerProvider({ children }: PropsWithChildren) {
  const [positions, setPositions] = useState<IPosition>(INITIAL_POSITIONS);
  const [hoverSelection, setHoverSelection] = useState<HoverSelection>(DEFAULT_HOVER_SELECTION);
  const [state, dispatch] = useReducer(reducer, INITIALDRAWER_CONTEXT_STATE);
  const { action } = state;

  const mouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (action === 'frame') {
      const { evt } = event;
      const { clientX: x, clientY: y } = evt;

      setPositions({ x, y });
      setHoverSelection((prev) => ({ ...prev, initX: x, initY: y, x, y }));
      dispatch({ type: DrawerType.HOVER_SELECTION, payload: true });
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
          props: { x, y, width, height, stroke: 'red', strokeWidth: 1 },
        },
      });
    }
  };

  const clearAll = () => {
    dispatch({ type: DrawerType.HOVER_SELECTION, payload: false });
    handleHoverSelection(DEFAULT_HOVER_SELECTION);
  };

  useListener((cmd) => {
    if (cmd === ICommandName.CANCEL) {
      clearAll();
      dispatch({ type: DrawerType.FIGURE_SELECTED, payload: null });
    }
  });

  return (
    <DrawerContext.Provider
      value={{
        state,
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
