import { fetchRewardItems } from "@/api/item";
import { create } from "zustand";

interface RewardItemStore {
    rewardItems: RewardItems[];
    fetchItems: () => Promise<void>;
    groupedItems: Record<string, RewardItems[]>;
}

export const useRewardItemStore = create<RewardItemStore>((set) => ({
    rewardItems: [],
    groupedItems: {},
    fetchItems: async () => {
        try {
            const data = await fetchRewardItems();
            const sorted = data.items.sort(
                (a: RewardItems, b: RewardItems) => a.itemId - b.itemId,
            );

            const grouped: Record<string, RewardItems[]> = {};
            for (const item of sorted) {
                const type = item.itemtype;
                if (!grouped[type]) grouped[type] = [];
                grouped[type].push(item);
            }

            set({
                rewardItems: sorted,
                groupedItems: grouped,
            });
        } catch (err) {
            console.error("아이템 불러오기 실패:", err);
        }
    },
}));
