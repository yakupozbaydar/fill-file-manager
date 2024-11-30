import { create } from "zustand";
import { combine } from "zustand/middleware";

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
  combine(
    {
      activeKey: "all",
    },
    (set) => ({
      setActiveKey: (key: string) => {
        set(() => ({ activeKey: key }));
      },
    }),
  ),
);

type File = {
  mendatoryInput: string;
  textInput: string;
  numericInput: number;
  dateInput: string;
  fileType: "X" | "Y";
  status: "open" | "closed";
};

export const useFileStore = create(
  combine(
    {
      files: [] as File[],
    },
    (set, get) => ({
      addFile: (file: File) => {
        set((state) => ({ files: [...state.files, file] }));
      },

      getFileData: (key: string) => {
        return get().files.filter((file) => file.status === key);
      },
    }),
  ),
);
