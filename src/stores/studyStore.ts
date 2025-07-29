import { create } from "zustand";
import { categoryMap, regionMap } from "@/utils/studyDataMap";

interface StudyStore {
    studyData: StudyInfos;
    isFetched: boolean;
    reset: () => void;
    fetchStudy: (studyData: StudyInfos) => void;
    setData: (
        column: string,
        data: string | string[] | number | Goal[],
    ) => void;
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
        goals: [{ goalId: 1, content: "", type: "WEEKLY" }],
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
                goals: [{ goalId: 1, content: "", type: "WEEKLY" }],
                notice: "",
                currentMemberCount: 0,
                online: true,
            },
            isFetched: false,
        });
    },
    fetchStudy: (studyData) => {
        set({
            studyData: {
                name: studyData.name,
                category: categoryMap[studyData.category],
                maxMembers: studyData.maxMembers,
                region: regionMap[studyData.region],
                place: studyData.place,
                schedules: studyData.schedules,
                startTime: studyData.startTime,
                endTime: studyData.endTime,
                startDate: studyData.startDate,
                endDate: studyData.endDate,
                createdAt: studyData.createdAt,
                status: studyData.status,
                description: studyData.description,
                externalLink: studyData.externalLink,
                studyType: studyData.studyType,
                goals: studyData.goals,
                notice: studyData.notice,
                currentMemberCount: studyData.currentMemberCount,
                online: studyData.online,
            },
            isFetched: true,
        });
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
