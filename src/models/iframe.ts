export interface IFrame {
  id: string | null;
  name: string;
  props: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
