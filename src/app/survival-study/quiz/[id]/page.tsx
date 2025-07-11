import BackButton from "@/components/common/BackButton";
import Quiz from "@/components/survival/Quiz";

export default async function QuizPage({ params }: { params: { id: number } }) {
    const quizId = params.id;
    return (
        <>
            <div className="mx-5 flex flex-col">
                <header className="flex h-15.5 w-full items-center">
                    <BackButton className="h-6 w-6" />
                </header>
                <div className="text-center">
                    <h5 className="h5 mb-3 text-[var(--color-main400)]">
                        서바이벌 Quiz
                    </h5>
                    <h1 className="h1 mb-9.5">1주차</h1>
                    <hr className="text-[var(--color-gray200)]" />
                </div>
                <Quiz id={quizId} />
            </div>
        </>
    );
}
