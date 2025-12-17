import { useNavigation } from "@template/hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { MenuItem } from "@template/interface/sideBar.interface";

export const useSideBar = () => {
  const { navigate, pathname } = useNavigation();
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isItemActive = (item: MenuItem): boolean => {
    return !!(mounted && item?.active?.includes(pathname));
  };

  return {
    navigate,
    t,
    pathname,
    mounted,
    isItemActive,
  };
};
