import { fetchOwnItems } from "@/api/item";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGroupedOwnItems = () => {
    const { data: ownItems } = useQuery({
        queryKey: ["ownItems"],
        queryFn: fetchOwnItems,
        staleTime: 1000 * 60 * 3,
    });

    const groupedOwnItems = useMemo(() => {
        if (!ownItems) return {};

        const grouped: Record<string, typeof ownItems> = {};

        for (const v of ownItems) {
            const type = v.type;
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(v);
        }

        Object.keys(grouped).forEach((v) => {
            grouped[v].sort(
                (a: ownItems, b: ownItems) => a.item_id - b.item_id,
            );
        });

        return grouped;
    }, [ownItems]);

    return { groupedOwnItems };
};
