import { type PropsWithChildren, useState, useReducer } from 'react';
import Konva from 'konva';

import { INITIAL_STATE, DrawerContext } from './DrawerContext';
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

function DrawerProvider({ children }: PropsWithChildren) {
  const [positions, setPositions] = useState<IPosition>(INITIAL_POSITIONS);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { action } = state;

  const mouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (action === 'frame') {
      const { evt } = event;
      const { clientX: x, clientY: y } = evt;

      setPositions({ x, y });
    }
  };

  const mouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const { x: initX, y: initY } = positions;

    if (action === 'frame' && initX !== null && initY !== null) {
      const { evt } = event;
      const { clientX, clientY } = evt;

      console.log('<-- frame [created] -->', { ...positions, end: { clientX, clientY } });

      const width = initX > clientX ? initX - clientX : clientX - initX;
      const height = initY > clientY ? initY - clientY : clientY - initY;
      const x = initX > clientX ? initX - width : initX;
      const y = initY > clientY ? initY - height : initY;

      dispatch({
        type: DrawerType.NEW_FIGURE,
        payload: {
          props: { x, y, width, height, stroke: 'red', strokeWidth: 2 },
        },
      });
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        state,
        handler: {
          mouseDown,
          mouseUp,
        },
        dispatch,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export default DrawerProvider;
