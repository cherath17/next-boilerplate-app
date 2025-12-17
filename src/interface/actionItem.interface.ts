export type ActionItem<T> = {
  label: string;
  onClick: (row: T) => void;
  separator?: boolean;
  disabled?: boolean;
};

export type ActionMenuProps<T> = {
  row: T;
  actions: ActionItem<T>[];
  label?: string;
};
