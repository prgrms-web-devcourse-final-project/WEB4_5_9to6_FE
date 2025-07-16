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
