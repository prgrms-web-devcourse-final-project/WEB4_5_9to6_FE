"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { useState } from "react";
import { Check } from "lucide-react";
import { useQuizResult } from "@/stores/quizStore";

interface QuizType {
    quiz_id: number;
    quiz_set_id: number;
    question: string;
    answer: number;
    activated: boolean;
}

interface ChoiceType {
    choice_id: number;
    quiz_id: number;
    choice_1: string;
    choice_2: string;
    choice_3: string;
    choice_4: string;
    activated: boolean;
}

export default function Quiz({ id }: { id: number }) {
    // quiz dummy data
    const quizList: QuizType[] = [
        {
            quiz_id: 1,
            quiz_set_id: 1,
            question: "CPU의 역할로 옳지 않은 것은?",
            answer: 3,
            activated: true,
        },
        {
            quiz_id: 2,
            quiz_set_id: 1,
            question: "TCP와 UDP의 차이에 대한 설명으로 옳은 것은?",
            answer: 2,
            activated: true,
        },
        {
            quiz_id: 3,
            quiz_set_id: 1,
            question: "JavaScript의 '===' 연산자는 무엇을 의미하는가?",
            answer: 1,
            activated: true,
        },
        {
            quiz_id: 4,
            quiz_set_id: 1,
            question: "OSI 7계층 중 데이터 링크 계층에서 수행하는 기능은?",
            answer: 4,
            activated: true,
        },
        {
            quiz_id: 5,
            quiz_set_id: 1,
            question: "데이터베이스 정규화의 목적은?",
            answer: 1,
            activated: true,
        },
    ];

    const choiceList: ChoiceType[] = [
        {
            choice_id: 1,
            quiz_id: 1,
            choice_1: "명령어를 해석하고 실행한다",
            choice_2: "산술 및 논리 연산을 처리한다",
            choice_3: "영구 저장 장치로 데이터를 저장한다",
            choice_4: "프로세스 제어 및 분기 처리를 담당한다",
            activated: true,
        },
        {
            choice_id: 2,
            quiz_id: 2,
            choice_1: "TCP는 연결을 생성하지 않고 데이터를 전송한다",
            choice_2: "UDP는 비연결형이고 속도가 빠르다",
            choice_3: "UDP는 데이터 전달 보장 기능을 제공한다",
            choice_4: "TCP는 실시간 스트리밍에 적합하다",
            activated: true,
        },
        {
            choice_id: 3,
            quiz_id: 3,
            choice_1: "값과 타입이 모두 같은지를 비교한다",
            choice_2: "값만 비교한다",
            choice_3: "두 변수가 같은 메모리를 참조하는지 비교한다",
            choice_4: "비교 연산을 하지 않는다",
            activated: true,
        },
        {
            choice_id: 4,
            quiz_id: 4,
            choice_1: "라우팅과 패킷 전달",
            choice_2: "세션 관리 및 동기화",
            choice_3: "사용자 인터페이스 제공",
            choice_4: "MAC 주소 기반 통신과 오류 감지",
            activated: true,
        },
        {
            choice_id: 5,
            quiz_id: 5,
            choice_1: "데이터 중복을 제거하고 무결성을 확보하기 위함",
            choice_2: "데이터의 양을 늘리기 위함",
            choice_3: "SQL 문법을 단순화하기 위함",
            choice_4: "서버의 응답 속도를 느리게 하기 위함",
            activated: true,
        },
    ];

    const [selected, setSelected] = useState<number | null>(null);
    const router = useRouter();
    const lastQuiz = 5;
    const { setScore, score } = useQuizResult();
    const [isSubmit, setIsSubmit] = useState(false);

    const currentQuiz = quizList.find((q) => q.quiz_id === id);
    const currentChoice = choiceList.find((c) => c.quiz_id === id);

    const choiceArr = [
        currentChoice?.choice_1,
        currentChoice?.choice_2,
        currentChoice?.choice_3,
        currentChoice?.choice_4,
    ];

    // 퀴즈 제출하기 버튼 클릭
    const QuizSubmitHandler = () => {
        if (selected === null || !currentQuiz) return;

        // 정답이면 +1
        if (selected === currentQuiz.answer) {
            setScore(score + 1);

            console.log("정답입니다.");
        } else {
            console.log("오답입니다.");
        }
    };
    const goNextHandler = () => {
        if (id < lastQuiz) {
            router.push(`/survival-study/quiz/${id + 1}`);
        } else {
            router.push("/survival-study/quiz/result");
        }
    };

    if (!currentQuiz || !currentChoice)
        return <div>문제를 불러올 수 없습니다.</div>;

    return (
        <>
            <div className="mt-6 flex flex-col items-center justify-center">
                <h4 className="h4">
                    [{id}번 문제] 빈 칸에 들어갈 단어를 고르시오.
                </h4>
                <div className="b2 mt-4">{currentQuiz.question}</div>
                <div className="mt-6 h-px w-full bg-[var(--color-gray200)]"></div>
                <div className="mt-6 flex w-full flex-col gap-3">
                    {choiceArr.map((text, index) => (
                        <div
                            key={index}
                            onClick={() => setSelected(index + 1)}
                            className={`flex h-16 cursor-pointer items-center justify-between rounded-2xl bg-[var(--color-gray100)] pl-5 ${
                                selected === index + 1
                                    ? "bg-[var(--color-gray300)]"
                                    : "hover:bg-[var(--color-gray200)]"
                            }`}
                        >
                            <p className="text-lg">
                                {`${String.fromCharCode(97 + index)}. ${text}`}
                            </p>
                            {selected === index + 1 && (
                                <Check className="mr-7 text-[var(--color-main500)]" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    {!isSubmit ? (
                        <Button
                            disabled={!selected}
                            onClick={QuizSubmitHandler}
                            className={`mx-5 my-5 ${
                                selected
                                    ? "bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
                                    : "cursor-not-allowed bg-[var(--color-gray200)]"
                            }`}
                        >
                            제출하기
                        </Button>
                    ) : (
                        <Button
                            disabled={!selected}
                            onClick={goNextHandler}
                            className="mx-5 my-5 bg-[var(--color-main500)] text-white transition duration-200 hover:bg-[var(--color-main600)]"
                        >
                            다음
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
