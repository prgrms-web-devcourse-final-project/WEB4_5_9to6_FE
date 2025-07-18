interface GoalType {
    goalId: number;
    content: string;
    type: string;
}
interface StudyInfo {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place?: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    status?: string;
    description?: string;
    externalLink: string;
    studyType: "DEFAULT" | "SURVIVAL";
    goals?: Goal[];
    online: boolean;
    notice?: string;
    currentMemberCount?: number;
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
