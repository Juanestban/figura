import { ActionReducerDrawer, DrawerType, DrawerState, Figure } from 'figura/models';
import { generateId } from 'figura/utils/generateId';

export default function reducer(
  state: DrawerState,
  { type, payload }: ActionReducerDrawer,
): DrawerState {
  switch (type) {
    case DrawerType.NEW_FIGURE: {
      const { props } = payload;
      const newFigure: Figure = {
        id: generateId(),
        name: `Frame ${state.figures.length + 1}`,
        type: 'Rect',
        props,
      };
      return {
        ...state,
        figures: structuredClone([...state.figures, newFigure]),
      };
    }
    case DrawerType.CHANGE_DRAW_ACTION:
      return { ...state, action: payload };
    default:
      return state;
  }
}
