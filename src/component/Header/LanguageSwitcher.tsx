"use client";

import { Label } from "@/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";
import { languages } from "@template/common/language";
import { useLanguageContext } from "@template/context/LanguageContext";

type Language = "en" | "fr" | "ar";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageContext();

  return (
    <div className="space-y-2">
      <Label htmlFor="language-select">Language</Label>

      <Select
        value={language}
        onValueChange={(value: Language) => setLanguage(value)}
      >
        <SelectTrigger id="language-select" className="w-[200px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
