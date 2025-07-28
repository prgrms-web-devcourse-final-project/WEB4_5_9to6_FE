import { fetchAlarm } from "@/api/alarms";
import { create } from "zustand";

interface Alarm {
    alarmId: number;
    alarmRecipientId: number;
    type: "APPLY" | "RESULT";
    resultStatus: "ACCEPT" | "REJECT" | null;
    message: string;
    isRead: boolean;
    sentAt: string;
    senderId: number;
    senderNickname: string;
    senderAvatarImage: string;
    studyId: number;
}

interface AlarmStore {
    alarmList: Alarm[];
    fetchAlarms: () => Promise<void>;
    addAlarm: (alarm: Alarm) => void;
    clear: () => void;
}

export const useAlarmStore = create<AlarmStore>((set) => ({
    alarmList: [],
    fetchAlarms: async () => {
        try {
            const response = await fetchAlarm();
            console.log(response);
            if (response.code === "0000") {
                set({
                    alarmList: response.data,
                });
                console.log(response.data, "a");
            }
        } catch (error) {
            console.error(error);
        }
    },
    addAlarm: (alarm) =>
        set((state) => ({
            alarmList: [alarm, ...state.alarmList],
        })),
    clear: () => set({ alarmList: [] }),
}));
