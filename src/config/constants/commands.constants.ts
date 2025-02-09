import { ICommandName } from 'figura/models';

export const COMMANDS: Record<ICommandName, string[]> = {
  [ICommandName.DELETE]: ['Delete'],
  [ICommandName.CANCEL]: ['Escape'],
  [ICommandName.COPY]: ['Control', 'c'],
  [ICommandName.SAVE]: ['Control', 's'],
  [ICommandName.PASTE]: ['Control', 'v'],
};
