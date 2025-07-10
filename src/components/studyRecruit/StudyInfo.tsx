import StudyDefaultInfo from "./StudyDefaultInfo";
import StudyGoal from "./StudyGoal";

export default function StudyInfo() {
    return (
        <>
            {/* 스터디 목표 */}
            <StudyGoal />

            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 기본정보 */}
            <div className="w-full px-5">
                <h3 className="mt-6 text-[var(--color-gray1000)]">기본정보</h3>
                <StudyDefaultInfo />
            </div>
            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 스터디 소개 */}
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 소개</h3>
                <p className="b2 mt-[10px] w-full text-[var(--color-gray700)]">
                    수코딩 강의를 듣고 함께 프로젝트 해보실 스터디원을
                    모집합니다. 왕초보여도 상관없습니다! 배워보실 의지만 있다면
                    환영합니다. 다만, 지각 잠수 욕설 등 분위기를 흐리거나 의지가
                    없다면 강퇴요인이 될 수 있는 점!
                </p>
            </div>

            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 학습 관련 링크 */}
            <div className="w-full px-5">
                <h6 className="mt-6 text-[var(--color-gray1000)]">
                    학습 관련 링크
                </h6>
                <p className="b2 mt-[10px] mb-4 text-[var(--color-gray700)]">
                    https://www.google.com
                </p>
            </div>
        </>
    );
}
