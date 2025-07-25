import { create } from "zustand";

interface ShopModalStoreState {
    isOpen: boolean;
    goodsId: number;
    goodsName: string;
    goodsPrice: number;
    goodsType: string;
    content: React.ReactNode;

    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
    idChange: (id: number) => void;
    nameChange: (name: string) => void;
    priceChange: (price: number) => void;
    typeChange: (type: string) => void;
}

export const useShopModalStore = create<ShopModalStoreState>((set) => ({
    isOpen: false,
    goodsId: 0,
    goodsName: "항목 없음",
    goodsPrice: 0,
    goodsType: "앱 테마",
    content: null,
    openModal: (content: React.ReactNode) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
    idChange: (id: number) => set({ goodsId: id }),
    nameChange: (name: string) => set({ goodsName: name }),
    priceChange: (price: number) => set({ goodsPrice: price }),
    typeChange: (type: string) => set({ goodsType: type }),
}));
