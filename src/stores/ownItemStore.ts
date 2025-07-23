import { fetchOwnItems } from "@/api/item";
import { create } from "zustand";

interface OwnItemStore {
    ownItems: OwnItems[];
    fetchItemsOwn: () => Promise<void>;
    groupedOwnItems: Record<string, OwnItems[]>;
}

export const useOwnItemStore = create<OwnItemStore>((set) => ({
    ownItems: [],
    groupedOwnItems: {},
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
}));
