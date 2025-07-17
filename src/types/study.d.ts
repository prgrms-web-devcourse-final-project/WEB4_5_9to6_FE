export declare global {
    interface CreateStudy {
        name: string;
        category: string;
        maxMembers: number;
        region: string;
        place: string;
        schedules: string[];
        startTime: string;
        endTime: string;
        startDate: string;
        endDate: string;
        description: string;
        externalLink: string;
        studyType: string;
        goals: { goalId: number; content: string }[];
        online: boolean;
    }
}
