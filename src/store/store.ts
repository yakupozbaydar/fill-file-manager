import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FilterButtonData = {
  key: string;
  title: string;
};

export const filterButtonData: FilterButtonData[] = [
  {
    key: "all",
    title: "All",
  },
  {
    key: "open",
    title: "Open",
  },
  {
    key: "closed",
    title: "Closed",
  },
];

export const useHomeState = create(
  persist(
    combine(
      {
        activeKey: "all",
        searchInput: "",
      },
      (set) => ({
        setActiveKey: (key: string) => {
          set(() => ({ activeKey: key }));
        },

        setSearchInput: (value: string) => {
          set(() => ({ searchInput: value }));
        },
      }),
    ),
    {
      name: "home-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
