export default function StudyInfo() {
    const goals = [
        "히라가나 깜지 3만번 쓰기",
        "스터디 숙제 완수하기",
        "라틴어로 경비아저씨와 대화하기",
        "스타벅스 닉네임 라틴어로 바꾸기",
    ];
    return (
        <>
            {/* 스터디 목표 */}
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 목표</h3>
                <div className="mt-[10px] flex flex-col gap-2">
                    {goals.map((goal, index) => (
                        <div
                            key={index}
                            className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                        >
                            <p className="text-[var(--color-gray1000)]">
                                {goal}
                            </p>
                            <p className="text-[var(--color-gray1000)]">
                                {index + 1}주차
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 h-4 w-full bg-[var(--color-gray100)]"></div>

            {/* 기본정보 */}
            <div className="w-full px-5">
                <h3 className="mt-6 text-[var(--color-gray1000)]">기본정보</h3>
                <div className="mt-6 w-full">
                    <div className="flex justify-between text-[var(--color-gray1000)]">
                        <h6>팀원</h6>
                        <h6>최대 6명</h6>
                    </div>

                    <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                        <h6>스터디 요일</h6>
                        <h6>매주 월, 수 ,금</h6>
                    </div>

                    <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                        <h6>스터디 시간</h6>
                        <h6>18:00~20:00</h6>
                    </div>

                    <div className="mt-4 flex justify-between text-[var(--color-gray1000)]">
                        <h6>기간</h6>
                        <h6>2025.03~2025.05 (3개월)</h6>
                    </div>
                </div>
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
