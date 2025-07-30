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
import LoadingSpinner from "@/components/common/LoadingSpinner";

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
    const { setScore, score, answerSheet, addAnswer, setAnswerSheet } =
        useQuizResult();
    const { study } = useSurvivalStore();
    const { myInfo } = useAuthStore();
    const [isSubmit, setIsSubmit] = useState(false);
    const isSurvived = score >= 3;

    const { data: quizData } = useQuery<WeekQuiz[]>({
        queryKey: ["quiz", studyId, quizId],
        queryFn: () => fetchQuizData(studyId),

        enabled: !!studyId && !!quizId,
    });

    const { data: studyMemberData } = useQuery<StudyMember[]>({
        queryKey: ["studyMemberId", studyId],
        queryFn: () => fetchStudyMember(studyId),

        enabled: !!studyId,
    });
    console.log("스멤데이터", studyMemberData);
    useEffect(() => {
        if (quizId === 1) {
            setScore(0);
            setAnswerSheet([]);
        }
    }, [quizId, setScore, setAnswerSheet]);
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

    const currentWeek = getCurrentWeekNum(study.startDate);

    const currentWeekData = quizData?.find((w) => w.week === currentWeek);
    console.log("현재 몇주차? =", currentWeek);

    // 퀴즈 번호 인덱스로 계산
    const currentQuiz = currentWeekData?.quizzes[quizId - 1];
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

        // 선택한 답안 저장
        addAnswer(selected);
        setIsSubmit(true);
    };

    // 다음 문제로 이동
    const goNextHandler = async () => {
        if (quizId < lastQuiz) {
            router.push(`/survival-study/${studyId}/quiz/${quizId + 1}`);
        } else {
            if (!studyMemberData || !myInfo?.id) {
                return;
            }
            const myStudyMemberId = studyMemberData.find(
                (member) => member.memberId === myInfo?.id,
            );
            if (!myStudyMemberId) {
                console.error("내 스멤아이디를 찾을 수 없음");
                return;
            }

            const gradingPost = {
                myStudyMemberId,
                studyId,
                week: currentWeek,
                answerSheet,
            };
            try {
                const payload = {
                    studyMemberId: myStudyMemberId.studyMemberId,
                    isSurvived,
                };
                console.log("보내는 데이터", JSON.stringify(payload));
                await axiosInstance.post("quiz/grading", gradingPost);

                // 생존여부 전달
                await axiosInstance.post(
                    `quiz/${studyId}/weeks/${currentWeek}/results`,
                    payload,
                );

                console.log("grading 전달완료", gradingPost);
                console.log("score 전달완료", payload);
            } catch (err) {
                console.error("score 저장 중 에러", err);
            }
            router.push(`/survival-study/${studyId}/quiz/result`);
        }
    };

    if (!study || !currentQuiz) {
        return <LoadingSpinner />;
    }
    return (
        <div className="mt-6 flex flex-col items-center justify-center">
            <div className="text-center">
                <h5 className="h5 mb-3 text-[var(--color-main400)] dark:text-white">
                    서바이벌 Quiz
                </h5>
                <h1 className="h1 mb-9.5 dark:text-white">{currentWeek}주차</h1>
            </div>
            <div className="dark:bg-gray800 mt-6 mb-6 h-px w-full bg-[var(--color-gray200)]"></div>
            <h4 className="h4 dark:text-white">
                [{quizId}번 문제] 빈 칸에 들어갈 단어를 고르시오.
            </h4>
            <div className="b2 mt-4 dark:text-white">
                {currentQuiz?.question}
            </div>
            <div className="dark:bg-gray800 mt-6 h-px w-full bg-[var(--color-gray200)]"></div>

            {/* 선택지 렌더링 */}
            <div className="mt-6 flex w-full flex-col gap-3">
                {currentQuiz?.choices.map((text, index) => {
                    const isSelected = selected === index + 1;
                    const isAnswer = correctAnswer === index + 1;

                    const bgColor = !isSubmit
                        ? isSelected
                            ? "bg-[var(--color-gray300)] dark:bg-[var(--color-gray800)] "
                            : "hover:bg-[var(--color-gray200)] bg-[var(--color-gray100)] dark:bg-[var(--color-gray1000)] hover:dark:bg-[var(--color-gray900)] "
                        : isAnswer
                          ? "bg-green-200 dark:bg-green-600/60 hover:dark:bg-green-600/60"
                          : isSelected
                            ? "bg-[var(--color-main600)]/30 dark:bg-[var(--color-main500)]/60 hover:dark:bg-[var(--color-main500)]/60"
                            : "bg-[var(--color-gray100)]";

                    return (
                        <div
                            key={index}
                            onClick={() => !isSubmit && setSelected(index + 1)}
                            className={`flex h-16 cursor-pointer items-center justify-between rounded-2xl pl-5 ${bgColor} dark:bg-[var(--color-gray1000)] hover:dark:bg-[var(--color-gray900)]`}
                        >
                            <p className="h5 break-words text-[var(--color-gray1000)] dark:text-white">
                                {`${String.fromCharCode(97 + index)}. ${text}`}
                            </p>
                            {isSubmit && isAnswer ? (
                                <p className="mr-6 font-medium whitespace-nowrap text-[#20A567] dark:text-green-300">
                                    정답
                                </p>
                            ) : (
                                isSelected && (
                                    <Check className="mr-6 text-[var(--color-main500)] dark:text-[var(--color-main300)]" />
                                )
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 버튼 */}
            <div className="absolute bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)] dark:border-t-[var(--color-gray1000)]">
                {!isSubmit ? (
                    <Button
                        disabled={!selected}
                        onClick={QuizSubmitHandler}
                        className={`mx-5 my-5 ${
                            selected
                                ? "green:bg-[#00E69A] green:hover:bg-[#00BD7E] bg-[var(--color-main500)] hover:bg-[var(--color-main600)]"
                                : "cursor-not-allowed bg-[var(--color-gray200)]"
                        }`}
                    >
                        제출하기
                    </Button>
                ) : (
                    <Button
                        onClick={goNextHandler}
                        className="green:bg-[#00E69A] green:hover:bg-[#00BD7E] mx-5 my-5 bg-[var(--color-main500)] text-white hover:bg-[var(--color-main600)]"
                    >
                        다음
                    </Button>
                )}
            </div>
        </div>
    );
}
