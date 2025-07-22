import { create } from "zustand";

interface StudyStore {
    studyData: StudyInfos;
    isFetched: boolean;
    fetchStudy: (studyData: StudyInfos) => void;
    setData: (column: string, data: string | number) => void;
    submit: () => void;
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
    submit: () => {
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
            isFetched: false,
        });
    },
}));
