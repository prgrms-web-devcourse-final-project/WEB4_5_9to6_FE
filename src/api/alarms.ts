import { axiosInstance } from "./index";

/* 알림 조회 */
export const fetchAlarm = async () => {
    const response = await axiosInstance.get("alarms");
    return response.data;
};
