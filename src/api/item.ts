import { axiosInstance } from ".";

export const fetchRewardItems = async () => {
    const response = await axiosInstance.get("reward-items");
    return response.data.data;
}; // 리워드 아이템 전체 확인

export const purchaseRewardItems = async (itemId: number) => {
    const response = await axiosInstance.post(
        `reward-items/${itemId}/purchase`,
    );
    return response.data;
}; // 리워드 아이템 구매

export const changeOwnItems = async (ownItemId: number) => {
    const response = await axiosInstance.patch(
        `reward-items/own-items/${ownItemId}`,
    );
    return response.data;
}; // 소유 아이템 변경

export const fetchOwnItems = async () => {
    const response = await axiosInstance.get("reward-items/own-items");
    return response.data.data;
}; // 내가 소유한 아이템 확인
