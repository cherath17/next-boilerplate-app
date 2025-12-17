// Sort Title
export function SortTitle({
  title,
  show = true,
}: {
  title: string;
  show?: boolean;
}) {
  if (!show) return null;
  return <span>{title}</span>;
}
