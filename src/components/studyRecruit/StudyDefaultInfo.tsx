import { dayMap } from "@/utils/studyDataMap";

interface DefaultInfoProps {
    maxMembers: number;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
}
export default function StudyDefaultInfo({
    maxMembers,
    schedules,
    startTime,
    endTime,
    startDate,
    endDate,
}: DefaultInfoProps) {
    const scheduleString = (sche: string[]) => {
        const order = Object.keys(dayMap);
        return sche
            .sort((a, b) => order.indexOf(a) - order.indexOf(b))
            .map((d) => dayMap[d])
            .join(", ");
    };
    const changeDate = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startYear = start.getFullYear();
        const startMonth = start.getMonth() + 1;

        const endYear = end.getFullYear();
        const endMonth = end.getMonth() + 1;

        const format = (month: number) => (month < 10 ? `0${month}` : month);

        const monthDiff =
            (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

        return `${startYear}.${format(startMonth)}~${endYear}.${format(endMonth)} (${monthDiff}개월)`;
    };
    return (
        <>
            <div className="mt-6 w-full">
                <div className="flex justify-between text-[var(--color-gray1000)]">
                    <h6>팀원</h6>
                    <h6>최대 {maxMembers}명</h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>스터디 요일</h6>
                    <h6>매주 {scheduleString(schedules)}</h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>스터디 시간</h6>
                    <h6>
                        {startTime}~{endTime}
                    </h6>
                </div>

                <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                    <h6>기간</h6>
                    <h6>{changeDate(startDate, endDate)}</h6>
                </div>
            </div>
        </>
    );
}
