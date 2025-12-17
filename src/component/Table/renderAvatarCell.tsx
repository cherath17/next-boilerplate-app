// Utilities
import { getInitials } from "@/utils/getInitials";
import { getAvatarColors } from "@/utils/getRandomLightColor";

export const renderAvatarCell = (row: any, value: string) => {
  const display = value?.trim() || "--";
  const initials = getInitials(display);

  const { bgColor, textColor } = getAvatarColors(display);

  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {initials}
      </div>

      <div className="text-primary-accent hover:underline">{display}</div>
    </div>
  );
};
