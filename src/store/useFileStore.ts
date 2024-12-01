import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type File = {
  id: string;
  date: string;
  fileName: string;
  description?: string;
  number?: string;
  fileType?: "X" | "Y";
  status?: "open" | "closed";
};

export const useFileStore = create(
  persist(
    combine(
      {
        files: [] as File[],
        fileInput: {
          fileName: "",
          description: "",
          number: "",
          fileType: "X",
          status: "open",
        } as Partial<File> | null,
      },
      (set) => ({
        addFile: (file: Omit<File, "id" | "date">) => {
          set((state) => ({
            files: [
              ...state.files,
              {
                ...file,
                id: `file${state.files.length + 1}-${Date.now()}`,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          }));
        },

        updateFile: (updatedFile: File) => {
          set((state) => ({
            files: state.files.find((file) => file.id === updatedFile.id)
              ? state.files.map((file) =>
                  file.id === updatedFile.id ? updatedFile : file,
                )
              : [...state.files, updatedFile],
          }));
        },

        // Modifying the fileInput object instead of state in order to avoid unnecessary re-renders
        setFileInputKey: (key: keyof File, value: string) => {
          set((state) => ({
            fileInput: { ...state.fileInput, [key]: value },
          }));
        },

        // Indicates the file that is being edited
        setFileInput: (file: File | null) => {
          set(() => ({ fileInput: file }));
        },

        resetInput: () => {
          set(() => ({
            fileInput: {
              fileName: "",
              description: "",
              number: "",
              fileType: "X",
              status: "open",
            },
          }));
        },
      }),
    ),
    {
      name: "file-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
