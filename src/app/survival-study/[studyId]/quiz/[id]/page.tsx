"use client";

import { fetchQuizData } from "@/api/quiz";
import { fetchStudyMember } from "@/api/studyList";
import BackButton from "@/components/common/BackButton";
import ExitModal from "@/components/survival/quiz/ExitModal";
import Quiz from "@/components/survival/quiz/Quiz";
import { useAuthStore } from "@/stores/authStore";
import { useSurvivalStore } from "@/stores/survivalStore";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizPage() {
    const params = useParams();
    const quizId = Number(params.id);
    const studyId = Number(params.studyId);
    const [showExitModal, setShowExitModal] = useState(false);
    const { study } = useSurvivalStore();
    const myInfo = useAuthStore.getState().myInfo;

    const getCurrentWeekNum = (startDate: string): number => {
        const start = new Date(startDate);
        const today = new Date();
        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7) + 1;
    };

    const currentWeek = getCurrentWeekNum(study?.startDate ?? "");
    console.log("currentWeek", currentWeek);
    const browserPreventEvent = (event: () => void) => {
        history.pushState(null, "", location.href);
        event();
    };

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
    console.log("quizData", quizData);
    console.log("studyMemberData", studyMemberData);
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
                studyId={studyId}
                currentWeek={currentWeek}
                myMember={studyMemberData?.find(
                    (m) => m.memberId === myInfo?.id,
                )}
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
