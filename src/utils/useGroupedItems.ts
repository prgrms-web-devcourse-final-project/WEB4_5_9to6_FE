import { fetchRewardItems } from "@/api/item";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGroupedItems = () => {
    const { data: rewardItems } = useQuery({
        queryKey: ["reward-items"],
        queryFn: fetchRewardItems,
        staleTime: 1000 * 60 * 3,
    });

    const groupedItems = useMemo(() => {
        if (!rewardItems) return {};

        const grouped: Record<string, typeof rewardItems.items> = {};

        for (const v of rewardItems.items) {
            const type = v.itemtype;
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(v);
        }

        Object.keys(grouped).forEach((v) => {
            grouped[v].sort(
                (a: rewardItems, b: rewardItems) => a.itemId - b.itemId,
            );
        });

        return grouped;
    }, [rewardItems]);

    return { groupedItems };
};
