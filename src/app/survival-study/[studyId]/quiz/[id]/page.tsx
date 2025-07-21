"use client";

import BackButton from "@/components/common/BackButton";
import ExitModal from "@/components/survival/quiz/ExitModal";
import Quiz from "@/components/survival/quiz/Quiz";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
    const params = useParams();
    const quizId = Number(params.id);
    const studyId = Number(params.studyId);
    console.log("params", params);
    const [showExitModal, setShowExitModal] = useState(false);
    const browserPreventEvent = (event: () => void) => {
        history.pushState(null, "", location.href);
        event();
    };

    useEffect(() => {
        history.pushState(null, "", location.href);
        const handler = () => browserPreventEvent(() => setShowExitModal(true));
        window.addEventListener("popstate", handler);
        return () => window.removeEventListener("popstate", handler);
    }, []);
    return (
        <>
            <ExitModal
                isOpen={showExitModal}
                onClose={() => setShowExitModal(false)}
            />
            <div className="mx-5 flex flex-col">
                <header className="flex h-15.5 w-full items-center">
                    <BackButton
                        onExitClick={() => setShowExitModal(true)}
                        className="h-6 w-6"
                    />
                </header>
                <div className="text-center">
                    <h5 className="h5 mb-3 text-[var(--color-main400)]">
                        서바이벌 Quiz
                    </h5>
                    <h1 className="h1 mb-9.5">1주차</h1>
                    <hr className="text-[var(--color-gray200)]" />
                </div>
                <Quiz quizId={quizId} studyId={studyId} />
            </div>
        </>
    );
}
