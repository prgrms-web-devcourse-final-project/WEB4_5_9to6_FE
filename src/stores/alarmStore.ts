import { fetchAlarm } from "@/api/alarms";
import { create } from "zustand";

interface AlarmStore {
    alarmList: Alarm[];
    isLoading: boolean;
    fetchAlarms: () => Promise<void>;
    addAlarm: (alarm: Alarm) => void;
    deleteAlarm: (alarmId: number) => void;
    clear: () => void;
}

export const useAlarmStore = create<AlarmStore>((set, get) => ({
    alarmList: [],
    isLoading: false,
    fetchAlarms: async () => {
        set({ isLoading: true });
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
        } finally {
            set({ isLoading: false });
        }
    },
    addAlarm: (alarm) => {
        set({
            alarmList: [alarm, ...get().alarmList],
        });
    },
    deleteAlarm: (alarmId) => {
        set({
            alarmList: get().alarmList.filter(
                (alarm) => alarm.alarmId !== alarmId,
            ),
        });
    },
    clear: () => set({ alarmList: [] }),
}));
