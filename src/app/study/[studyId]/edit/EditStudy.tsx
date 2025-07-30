"use client";

import SubHeader from "@/components/common/SubHeader";
import { editStudy, fetchStudyInfo } from "@/api/studies";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudy() {
    const studyId = parseInt(useParams<{ studyId: string }>().studyId);
    const studyData = useStudyStore((state) => state.studyData);
    const [step, setStep] = useState(1);
    const router = useRouter();
    const isFetched = useStudyStore((state) => state.isFetched);

    const { data: fetchStudyData } = useQuery({
        queryKey: ["fetch-study", studyId],
        enabled: !!studyId,
        queryFn: () => fetchStudyInfo(studyId),
    });

    const { mutate: submitEdit } = useMutation({
        mutationFn: () =>
            editStudy(studyId, {
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
                goals: studyData.goals.filter((goal) => goal.content !== ""),
                isOnline: studyData.online!,
            }),
        onMutate: () => {
            console.log(useStudyStore.getState().studyData);
        },
        onSuccess: (response) => {
            console.log(response);
            setTimeout(() => {
                router.push(`/study/${studyId}`);
                customAlert({
                    message: `스터디 수정이 완료되었어요.`,
                    linkLabel: "",
                    onClick: () => {},
                });
            }, 1000);
            useStudyStore.getState().reset();
        },
        onError: (error) => {
            console.error(error);
        },
    });

    useEffect(() => {
        if (fetchStudyData) {
            useStudyStore.getState().reset();
            useStudyStore.getState().fetchStudy(fetchStudyData);
        }
    }, [fetchStudyData]);

    if (!isFetched || !fetchStudyData) return null;

    return (
        <>
            <SubHeader className="max-w-sm">스터디 수정</SubHeader>
            <div className="dark:bg-dark-bg h-full w-full pt-[65px] duration-200 ease-in">
                <ProgressBar totalStep={6} step={step} />
                {step === 1 ? (
                    <Step1 continueStep={() => setStep(2)} />
                ) : step === 2 ? (
                    <Step2 continueStep={() => setStep(3)} isEdit />
                ) : step === 3 ? (
                    <Step3 continueStep={() => setStep(4)} />
                ) : step === 4 ? (
                    <Step4 continueStep={() => setStep(5)} />
                ) : (
                    <Step5
                        continueStep={() => setStep(6)}
                        submitCreate={submitEdit}
                        isEdit
                    />
                )}
            </div>
        </>
    );
}
