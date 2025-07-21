import StudyDefaultInfo from "./StudyDefaultInfo";
import StudyGoal from "./StudyGoal";
interface InfoProps {
    maxMembers: number;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    description: string;
    exLink: string;
}
export default function StudyInfo({
    maxMembers,
    schedules,
    startTime,
    endTime,
    startDate,
    endDate,
    description,
    exLink,
}: InfoProps) {
    return (
        <>
            {/* 스터디 목표 */}
            <StudyGoal />

            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 기본정보 */}
            <div className="w-full px-5">
                <h3 className="mt-6 text-[var(--color-gray1000)]">기본정보</h3>
                <StudyDefaultInfo
                    maxMembers={maxMembers}
                    schedules={schedules}
                    startTime={startTime}
                    endTime={endTime}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 스터디 소개 */}
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 소개</h3>
                <p className="b2 mt-[10px] w-full text-[var(--color-gray700)]">
                    {description}
                </p>
            </div>

            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 학습 관련 링크 */}
            <div className="w-full px-5">
                <h6 className="mt-6 text-[var(--color-gray1000)]">
                    학습 관련 링크
                </h6>
                <a
                    href={exLink}
                    target="blank"
                    className="b2 mt-[10px] mb-4 text-[var(--color-gray700)] transition-all duration-200 ease-in-out hover:text-[var(--color-gray-400)]"
                >
                    {exLink}
                </a>
            </div>
        </>
    );
}
