import { type PropsWithChildren, useState, useReducer } from 'react';
import Konva from 'konva';

import { INITIAL_STATE, DrawerContext, type HoverSelection } from './DrawerContext';
import reducer from './reducer';
import { DrawerType } from 'figura/models';

type IPosition = {
  x: number | null;
  y: number | null;
};

const INITIAL_POSITIONS: IPosition = {
  x: null,
  y: null,
};

const DEFAULT_HOVER_SELECTION: HoverSelection = {
  x: 0,
  initX: 0,
  y: 0,
  initY: 0,
  width: 0,
  height: 0,
};

function DrawerProvider({ children }: PropsWithChildren) {
  const [positions, setPositions] = useState<IPosition>(INITIAL_POSITIONS);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoverSelection, setHoverSelection] = useState<HoverSelection>(DEFAULT_HOVER_SELECTION);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
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
