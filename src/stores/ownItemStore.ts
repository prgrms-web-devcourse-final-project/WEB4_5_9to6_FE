import { fetchOwnItems } from "@/api/item";
import { create } from "zustand";

interface OwnItemStore {
    ownItems: OwnItems[];
    fetchItemsOwn: () => Promise<void>;
    groupedOwnItems: Record<string, OwnItems[]>;
    ownId: number;
    ownName: string;
    changeOwnId: (id: number) => void;
    changeOwnName: (name: string) => void;
}

export const useOwnItemStore = create<OwnItemStore>((set) => ({
    ownItems: [],
    groupedOwnItems: {},
    ownId: 0,
    ownName: "아이템",
    fetchItemsOwn: async () => {
        try {
            const data = await fetchOwnItems();
            const sorted = data.sort(
                (a: OwnItems, b: OwnItems) => a.itemId - b.itemId,
            );

            const grouped: Record<string, OwnItems[]> = {};
            for (const item of sorted) {
                const type = item.type;
                if (!grouped[type]) grouped[type] = [];
                grouped[type].push(item);
            }

            set({
                ownItems: sorted,
                groupedOwnItems: grouped,
            });
        } catch (err) {
            console.error("소유 아이템 로딩 실패:", err);
        }
    },
    changeOwnId: (id: number) => set({ ownId: id }),
    changeOwnName: (name: string) => set({ ownName: name }),
}));
