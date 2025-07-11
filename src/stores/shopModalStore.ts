import { create } from "zustand";

interface ShopModalStoreState {
    isOpen: boolean;
    goodsName: string;
    goodsPrice: number;
    goodsType: string;
    content: React.ReactNode;

    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
    nameChange: (name: string) => void;
    priceChange: (price: number) => void;
    typeChange: (type: string) => void;
}

export const useShopModalStore = create<ShopModalStoreState>((set) => ({
    isOpen: false,
    goodsName: "항목 없음",
    goodsPrice: 0,
    goodsType: "app",
    content: null,
    openModal: (content: React.ReactNode) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
    nameChange: (name: string) => set({ goodsName: name }),
    priceChange: (price: number) => set({ goodsPrice: price }),
    typeChange: (type: string) => set({ goodsType: type }),
}));
