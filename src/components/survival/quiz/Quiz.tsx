"use client";
import { useRouter } from "next/navigation";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useQuizResult } from "@/stores/quizStore";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizData } from "@/api/quiz";
import { useSurvivalStore } from "@/stores/survivalStore";
import { axiosInstance } from "@/api";
import { fetchStudyMember } from "@/api/studyList";
import { useAuthStore } from "@/stores/authStore";

export default function Quiz({
    quizId,
    studyId,
}: {
    quizId: number;
    studyId: number;
}) {
    const [selected, setSelected] = useState<number | null>(null);
    const router = useRouter();
    const lastQuiz = 5;
    const { setScore, score } = useQuizResult();
    const { study } = useSurvivalStore();
    const { myInfo } = useAuthStore();
    const [isSubmit, setIsSubmit] = useState(false);
    const isSurvived = score >= 3;
    const is_passed = score >= 3;

    const { data: quizData } = useQuery<WeekQuiz[]>({
        queryKey: ["quiz"],
        queryFn: () => fetchQuizData(studyId),

        enabled: !!studyId && !!quizId,
    });

    const { data: studyMembeData } = useQuery<StudyMember[]>({
        queryKey: ["studyMemberId", studyId],
        queryFn: () => fetchStudyMember(studyId),

        enabled: !!studyId,
    });

    useEffect(() => {
        if (quizId === 1) {
            setScore(0);
        }
    }, [quizId, setScore]);
    if (!study) {
        return null;
    }

    // 이번주가 몇주차인지 계산
    const getCurrentWeekNum = (startDate: string): number => {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7) + 1;
    };

    const currentWeek = study?.startDate
        ? getCurrentWeekNum(study.startDate)
        : null;

    const currentWeekData = quizData?.find((w) => w.week === currentWeek);
    console.log("현재 몇주차? =", currentWeek);

    const currentQuiz = currentWeekData?.quizzes.find(
        (q) => q.quizId === quizId,
    );
    const correctAnswer = currentQuiz?.answer;

    // 퀴즈 제출하기 버튼 클릭
    const QuizSubmitHandler = () => {
        if (selected === null || !currentQuiz) return;
        // 정답이면 +1
        if (selected === correctAnswer) {
            setScore(score + 1);
            console.log("정답입니다.");
        } else {
            console.log("오답입니다.");
        }
        setIsSubmit(true);
    };

    console.log("studyId:", studyId);
    console.log("currentWeek:", currentWeek);
    console.log("score:", score);

    // 다음 문제로 이동
    const goNextHandler = async () => {
        if (quizId < lastQuiz) {
            router.push(`/survival-study/${studyId}/quiz/${quizId + 1}`);
        } else {
            if (!studyMembeData || !myInfo?.id) {
                return;
            }
            const myStudyMemberId = studyMembeData.find(
                (member) => member.memberId === myInfo?.id,
            );
            if (!myStudyMemberId) {
                console.error("내 스멤아이디를 찾을 수 없음");
                return;
            }
            try {
                const payload = {
                    studyMemberId: myStudyMemberId.studyMemberId,
                    isSurvived,
                    is_passed,
                };
                console.log("보내는 데이터", JSON.stringify(payload));

                await axiosInstance.post(
                    `quiz/${studyId}/weeks/${currentWeek}/results`,
                    payload,
                );
            } catch (err) {
                console.error("score 저장 중 에러", err);
            }
            router.push(`/survival-study/${studyId}/quiz/result`);
        }
    };

    if (!study || !currentQuiz) {
        return <div>로딩중..</div>;
    }
    return (
        <div className="mt-6 flex flex-col items-center justify-center">
            <h4 className="h4">
                [{quizId}번 문제] 빈 칸에 들어갈 단어를 고르시오.
            </h4>
            <div className="b2 mt-4">{currentQuiz?.question}</div>
            <div className="mt-6 h-px w-full bg-[var(--color-gray200)]"></div>

            {/* 선택지 렌더링 */}
            <div className="mt-6 flex w-full flex-col gap-3">
                {currentQuiz?.choices.map((text, index) => {
                    const isSelected = selected === index + 1;
                    const isAnswer = correctAnswer === index + 1;

                    const bgColor = !isSubmit
                        ? isSelected
                            ? "bg-[var(--color-gray300)]"
                            : "hover:bg-[var(--color-gray200)] bg-[var(--color-gray100)]"
                        : isAnswer
                          ? "bg-green-200"
                          : isSelected
                            ? "bg-[var(--color-main600)]/30"
                            : "bg-[var(--color-gray100)]";

                    return (
                        <div
                            key={index}
                            onClick={() => !isSubmit && setSelected(index + 1)}
                            className={`flex h-16 cursor-pointer items-center justify-between rounded-2xl pl-5 ${bgColor}`}
                        >
                            <p className="h5 break-words text-[var(--color-gray1000)]">
                                {`${String.fromCharCode(97 + index)}. ${text}`}
                            </p>
                            {isSubmit && isAnswer ? (
                                <p className="mr-6 font-medium whitespace-nowrap text-[#20A567]">
                                    정답
                                </p>
                            ) : (
                                isSelected && (
                                    <Check className="mr-6 text-[var(--color-main500)]" />
                                )
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 버튼 */}
            <div className="absolute bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                {!isSubmit ? (
                    <Button
                        disabled={!selected}
                        onClick={QuizSubmitHandler}
                        className={`mx-5 my-5 ${
                            selected
                                ? "bg-[var(--color-main500)] hover:bg-[var(--color-main600)]"
                                : "cursor-not-allowed bg-[var(--color-gray200)]"
                        }`}
                    >
                        제출하기
                    </Button>
                ) : (
                    <Button
                        onClick={goNextHandler}
                        className="mx-5 my-5 bg-[var(--color-main500)] text-white hover:bg-[var(--color-main600)]"
                    >
                        다음
                    </Button>
                )}
            </div>
        </div>
    );
}
