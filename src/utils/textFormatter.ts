export const getInitials = (fullName = ""): string => {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ").filter(Boolean);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0].toUpperCase();
  const last = parts[parts.length - 1][0].toUpperCase();

  return first + last;
};
