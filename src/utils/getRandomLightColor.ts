export const getAvatarColors = (value?: string | number) => {
  // fallback for undefined/null/empty
  const str =
    value != null && String(value).trim() !== "" ? String(value) : "default";

  // generate hash from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // keep 32-bit
  }

  // pastel range (light colors)
  const pastel = (v: number) => 192 + (Math.abs(v) % 64);
  const r = pastel(hash);
  const g = pastel(hash >> 8);
  const b = pastel(hash >> 16);

  const bgColor = `rgb(${r}, ${g}, ${b})`;

  // text color for contrast
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  const textColor = "#000"; // dark text for all light colors

  return { bgColor, textColor };
};

export const getAvatarColorsRandom = () => {
  // Generate random pastel RGB values (192–255 range)
  const r = 192 + Math.floor(Math.random() * 64);
  const g = 192 + Math.floor(Math.random() * 64);
  const b = 192 + Math.floor(Math.random() * 64);

  const bgColor = `rgb(${r}, ${g}, ${b})`;

  // Text color always dark for contrast
  const textColor = "#000";

  return { bgColor, textColor };
};
