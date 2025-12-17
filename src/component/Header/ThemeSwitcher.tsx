"use client";

import { themeSwitcherColor } from "@template/common/themeSwitcher";
import { useThemeContext } from "@template/context/ThemeContext";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/ui/select";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium">Theme</label>

      <Select value={theme} onValueChange={(value: string) => setTheme(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Theme" />
        </SelectTrigger>

        <SelectContent>
          {themeSwitcherColor.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                <span className={`theme-color ${item.value}`}></span>
                {item.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSwitcher;
