export interface Option<O extends string | number = string | number> {
  label: string;
  value: O;
}
