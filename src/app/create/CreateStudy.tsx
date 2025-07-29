"use client";

import { createStudy } from "@/api/studies";
import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/create/Step1";
import Step2 from "@/components/create/Step2";
import Step3 from "@/components/create/Step3";
import Step4 from "@/components/create/Step4";
import Step5 from "@/components/create/Step5";
import { useStudyStore } from "@/stores/studyStore";
import { customAlert } from "@/utils/customAlert";
import { translateCategoryToEnum } from "@/utils/translateCategoryToEnum";
import { translateRegionToEnum } from "@/utils/translateRegionToEnum";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateStudy() {
    const [step, setStep] = useState(1);
    const studyData = useStudyStore((state) => state.studyData);
    const router = useRouter();

    const { mutate: submitCreate } = useMutation({
        mutationFn: () =>
            createStudy({
                name: studyData.name,
                category: translateCategoryToEnum(studyData.category),
                maxMembers: studyData.maxMembers,
                region: translateRegionToEnum(studyData.region),
                place: studyData.place ?? "",
                schedules: studyData.schedules,
                startTime: studyData.startTime,
                endTime: studyData.endTime,
                startDate: studyData.startDate,
                endDate: studyData.endDate,
                description: studyData.description,
                externalLink: studyData.externalLink,
                studyType: "DEFAULT",
                goals: studyData.goals
                    .filter((goal) => goal.content !== "")
                    .map((goal, i) => ({ goalId: i, content: goal.content })),
                online: studyData.region === "온라인",
            }),
        onMutate: () => {
            console.log(useStudyStore.getState().studyData);
        },
        onSuccess: (response) => {
            console.log(response);
            setTimeout(() => {
                router.push("/studylist");
                customAlert({
                    message: `스터디 생성이 완료되었어요!\n스터디룸을 확인해보세요.`,
                    linkLabel: "이동하기",
                    onClick: () =>
                        router.push(`/study/${response.data.studyId}`),
                });
            }, 1000);
            useStudyStore.getState().reset();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    useEffect(() => {
        useStudyStore.getState().reset();
    }, []);

    return (
        <>
            <div className="h-full w-full pt-[65px]">
                <ProgressBar totalStep={6} step={step} />
                {step === 1 ? (
                    <Step1 continueStep={() => setStep(2)} />
                ) : step === 2 ? (
                    <Step2 continueStep={() => setStep(3)} />
                ) : step === 3 ? (
                    <Step3 continueStep={() => setStep(4)} />
                ) : step === 4 ? (
                    <Step4 continueStep={() => setStep(5)} />
                ) : (
                    <Step5
                        continueStep={() => setStep(6)}
                        submitCreate={submitCreate}
                    />
                )}
            </div>
        </>
    );
}
