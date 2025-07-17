interface StudyInfo {
    studyId: number;
    title: string;
    currentMemberCount: number;
    maxMemberCount: number;
    category: string;
    region: string;
    place: string | null;
    start_date: string;
    end_date: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    studyType: "DEFAULT" | "SURVIVAL";
}
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
