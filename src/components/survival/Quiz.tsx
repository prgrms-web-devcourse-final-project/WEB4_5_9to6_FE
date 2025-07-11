"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";

export default function Quiz({ id }: { id: number }) {
    const router = useRouter();
    const lastQuiz = 5;

    const QuizSubmitHandler = () => {
        if (id <= lastQuiz) {
            router.push(`/survival-study/quiz/${id + 1}`);
        } else {
            router.push("/survival-study/quiz/result");
        }
    };
    return (
        <>
            <div className="mt-6 flex flex-col items-center justify-center">
                <h4 className="h4">
                    [문제1번] 빈 칸에 들어갈 단어를 고르시오.
                </h4>
                <div className="b2 mt-4">
                    A government official ________ requested a report on the
                    manufacturing plant’s impact on the fucking environment.
                </div>
                <div className="mt-6 h-px w-full bg-[var(--color-gray200)]"></div>
                <div className="mt-6 flex w-full flex-col gap-3">
                    <div className="flex h-16 cursor-pointer items-center rounded-2xl bg-[var(--color-gray200)] pl-5 hover:bg-[var(--color-gray300)]">
                        <p className="text-lg">a. formal</p>
                    </div>
                    <div className="flex h-16 cursor-pointer items-center rounded-2xl bg-[var(--color-gray200)] pl-5 hover:bg-[var(--color-gray300)]">
                        <p className="text-lg">b. farmer</p>
                    </div>
                    <div className="flex h-16 cursor-pointer items-center rounded-2xl bg-[var(--color-gray200)] pl-5 hover:bg-[var(--color-gray300)]">
                        <p className="text-lg">c. freedom</p>
                    </div>
                    <div className="flex h-16 cursor-pointer items-center rounded-2xl bg-[var(--color-gray200)] pl-5 hover:bg-[var(--color-gray300)]">
                        <p className="text-lg">d. formality</p>
                    </div>
                </div>
                <div className="absolute bottom-0 flex h-22.5 w-full items-center justify-center border-t-1 border-t-[var(--color-gray200)]">
                    <Button
                        onClick={QuizSubmitHandler}
                        className="mx-5 my-5 bg-[var(--color-main500)] transition duration-200 hover:bg-[var(--color-main600)]"
                    >
                        제출하기
                    </Button>
                </div>
            </div>
        </>
    );
}
