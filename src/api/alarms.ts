import { axiosInstance } from "./index";

/* 알림 조회 */
export const fetchAlarm = async () => {
    const response = await axiosInstance.get("alarms");
    return response.data;
};

/* 알림 읽음 처리 */
export const readAlarm = async (alarmRecipientId: number) => {
    const response = await axiosInstance.patch(
        `alarms/${alarmRecipientId}/read`,
    );
    return response.data;
};

/* 알림 모두 읽음 처리 */
export const readAllAlarm = async () => {
    const response = await axiosInstance.patch("alarms/read-all");
    return response.data;
};
