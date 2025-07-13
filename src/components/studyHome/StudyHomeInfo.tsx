import StudyDefaultInfo from "../studyRecruit/StudyDefaultInfo";

export default function StudyHomeInfo() {
    return (
        <>
            <div className="flex h-[88px] justify-between border-b border-b-[var(--color-gray200)] px-5 py-6">
                <h6 className="text-[var(--color-gray1000)]">스터디 이름</h6>
                <h6 className="text-[var(--color-gray1000)]">
                    숲속에서 함께 라틴어 공부할 요정들의 <br /> 스터디
                </h6>
            </div>

            <div className="px-5">
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
        </>
    );
}
