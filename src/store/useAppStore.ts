import { AppState } from "@template/interface/store.interface";
import { create } from "zustand";

export const useAppStore = create<AppState>((set) => ({
  appData: {
    sideBarOpen: true,
  },
  updation: (data) =>
    set((state) => ({
      appData: {
        ...state.appData,
        ...data,
      },
    })),
}));
