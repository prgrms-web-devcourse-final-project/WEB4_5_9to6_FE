import { fetchOwnItems } from "@/api/item";
import { create } from "zustand";

interface OwnItemStore {
    ownItems: OwnItems[];
    groupedOwnItems: Record<string, OwnItems[]>;

    fetchItemsOwn: () => Promise<void>;
}

export const useOwnItemStore = create<OwnItemStore>((set) => ({
    ownItems: [],
    groupedOwnItems: {},
    fetchItemsOwn: async () => {
        try {
            const data = await fetchOwnItems();

            const grouped: Record<string, OwnItems[]> = {};
            for (const item of data) {
                const type = item.type;
                if (!grouped[type]) grouped[type] = [];
                grouped[type].push(item);
            }

            Object.keys(grouped).forEach((type) => {
                grouped[type].sort((a, b) => a.item_id - b.item_id);
            });

            set({
                ownItems: data,
                groupedOwnItems: grouped,
            });
        } catch (err) {
            console.error("소유 아이템 로딩 실패:", err);
        }
    },
}));
