import { create } from "zustand";

interface StudyStore {
    studyData: StudyInfos;
    isFetched: boolean;
    reset: () => void;
    fetchStudy: (studyData: StudyInfos) => void;
    setData: (column: string, data: string | string[] | number) => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
    studyData: {
        name: "",
        category: "",
        maxMembers: 0,
        region: "",
        place: null,
        schedules: [],
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
        createdAt: "",
        status: "ACTIVE",
        description: "",
        externalLink: "",
        studyType: "DEFAULT",
        goals: [],
        notice: "",
        currentMemberCount: 0,
        online: true,
    },
    isFetched: false,
    reset: () => {
        set({
            studyData: {
                name: "",
                category: "",
                maxMembers: 0,
                region: "",
                place: null,
                schedules: [],
                startTime: "",
                endTime: "",
                startDate: "",
                endDate: "",
                createdAt: "",
                status: "ACTIVE",
                description: "",
                externalLink: "",
                studyType: "DEFAULT",
                goals: [],
                notice: "",
                currentMemberCount: 0,
                online: true,
            },
            isFetched: true,
        });
    },
    fetchStudy: (studyData) => {
        set({ studyData: studyData, isFetched: true });
    },
    setData: (column, data) => {
        set((state) => {
            if (!state.studyData) return {};

            return {
                studyData: {
                    ...state.studyData,
                    [column]: data,
                },
            };
        });
    },
}));
