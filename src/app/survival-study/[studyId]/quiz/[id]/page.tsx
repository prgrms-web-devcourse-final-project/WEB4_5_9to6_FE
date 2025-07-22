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
    const [showExitModal, setShowExitModal] = useState(false);
    const browserPreventEvent = (event: () => void) => {
        history.pushState(null, "", location.href);
        event();
    };

    // 퀴즈 중간에 뒤로가기 방지
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

                <Quiz quizId={quizId} studyId={studyId} />
            </div>
        </>
    );
}
