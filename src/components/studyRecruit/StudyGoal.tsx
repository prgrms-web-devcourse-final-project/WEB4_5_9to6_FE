export default function StudyGoal() {
    const goals = [
        "히라가나 깜지 3만번 쓰기",
        "스터디 숙제 완수하기",
        "라틴어로 경비아저씨와 대화하기",
        "스타벅스 닉네임 라틴어로 바꾸기",
    ];
    return (
        <>
            <div className="w-full px-5">
                <h3 className="mt-6">스터디 주간 목표</h3>
                <div className="mt-[10px] flex flex-col gap-2">
                    {goals.map((goal, index) => (
                        <div
                            key={index}
                            className="flex h-[50px] w-full items-center justify-between rounded-[12px] bg-[var(--color-gray100)] px-4 py-4"
                        >
                            <p className="text-[var(--color-gray1000)]">
                                {goal}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
