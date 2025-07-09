import { create } from "zustand";
interface FilterStore {
    filters: string[];
    setFilters: (filters: string[]) => void;
    resetFilters: () => void;
}
export const useFilterStore = create<FilterStore>((set) => ({
    filters: [],
    setFilters: (filters) => set({ filters }),
    resetFilters: () => set({ filters: [] }),
}));
