import { fetchOwnItems } from "@/api/item";
import { create } from "zustand";

interface AvatarId {
    FACE: number;
    HAT: number;
    HAIR: number;
    TOP: number;
}

interface AvatarName {
    FACE: string;
    HAT: string;
    HAIR: string;
    TOP: string;
}

interface OwnItemStore {
    ownItems: OwnItems[];
    fetchItemsOwn: () => Promise<void>;
    resetItemsOwn: () => void;
    groupedOwnItems: Record<string, OwnItems[]>;
    ownId: number;
    ownName: string;
    itemId: number;
    changeOwnId: (id: number) => void;
    changeOwnName: (name: string) => void;
    changeItemId: (id: number) => void;
    avatarState: boolean;
    avatarName: AvatarName;
    avatarItemId: AvatarId;
    avatarOwnId: AvatarId;
    changeAvatarState: (state: boolean) => void;
    changeAvatarName: (type: keyof AvatarName, name: string) => void;
    changeAvatarItemId: (type: keyof AvatarId, id: number) => void;
    changeAvatarOwnId: (type: keyof AvatarId, id: number) => void;
}

export const useOwnItemStore = create<OwnItemStore>((set) => ({
    ownItems: [],
    groupedOwnItems: {},
    ownId: 0,
    ownName: "아이템",
    itemId: 0,
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
            set({
                ownItems: [],
                groupedOwnItems: {},
            });
            console.log("소유 아이템 로딩 실패:", err);
        }
    },
    resetItemsOwn: () =>
        set({
            ownItems: [],
            groupedOwnItems: {},
            ownId: 0,
            ownName: "아이템",
            itemId: 0,
            avatarState: false,
            avatarName: {
                FACE: "없음",
                HAT: "없음",
                HAIR: "기본",
                TOP: "기본",
            },
            avatarItemId: {
                FACE: 21,
                HAT: 31,
                HAIR: 52,
                TOP: 61,
            },
            avatarOwnId: {
                FACE: 0,
                HAT: 0,
                HAIR: 0,
                TOP: 0,
            },
        }),
    changeOwnId: (id: number) => set({ ownId: id }),
    changeOwnName: (name: string) => set({ ownName: name }),
    changeItemId: (id: number) => set({ itemId: id }),

    avatarState: false,
    avatarName: {
        FACE: "없음",
        HAT: "없음",
        HAIR: "기본",
        TOP: "기본",
    },
    avatarItemId: {
        FACE: 21,
        HAT: 31,
        HAIR: 52,
        TOP: 61,
    },
    avatarOwnId: {
        FACE: 0,
        HAT: 0,
        HAIR: 0,
        TOP: 0,
    },
    changeAvatarState: (state: boolean) => set({ avatarState: state }),
    changeAvatarName: (type: keyof AvatarName, name: string) =>
        set((state) => ({
            avatarName: {
                ...state.avatarName,
                [type]: name,
            },
        })),
    changeAvatarItemId: (type: keyof AvatarId, id: number) =>
        set((state) => ({
            avatarItemId: {
                ...state.avatarItemId,
                [type]: id,
            },
        })),
    changeAvatarOwnId: (type: keyof AvatarId, id: number) =>
        set((state) => ({
            avatarOwnId: {
                ...state.avatarOwnId,
                [type]: id,
            },
        })),
}));
