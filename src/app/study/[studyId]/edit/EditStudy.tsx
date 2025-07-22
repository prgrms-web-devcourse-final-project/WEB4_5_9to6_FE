"use client";

import { studyInfo } from "@/api/studies";
import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/create/Step1";
import Step2 from "@/components/create/Step2";
import Step3 from "@/components/create/Step3";
import Step4 from "@/components/create/Step4";
import Step5 from "@/components/create/Step5";
import { useStudyStore } from "@/stores/studyStore";
// import { customAlert } from "@/utils/customAlert";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditStudy() {
    const studyId = parseInt(useParams<{ studyId: string }>().studyId);
    const [step, setStep] = useState(1);
    // const router = useRouter();
    const isFetched = useStudyStore((state) => state.isFetched);

    const { data: fetchStudyData } = useQuery({
        queryKey: ["fetch-study", studyId],
        enabled: !!studyId,
        queryFn: () => studyInfo(studyId),
    });

    // const { mutate: submitCreate } = useMutation({
    //     mutationFn: () =>
    //         createStudy({
    //             name,
    //             category,
    //             maxMembers: +maxMember,
    //             region,
    //             place,
    //             schedules: daysOfWeek,
    //             startTime,
    //             endTime,
    //             startDate,
    //             endDate,
    //             description,
    //             externalLink,
    //             studyType: "DEFAULT",
    //             goals,
    //             online: region === "온라인",
    //         }),
    //     onMutate: () => {
    //         console.log(
    //             name,
    //             category,
    //             +maxMember,
    //             region,
    //             place,
    //             daysOfWeek,
    //             startTime,
    //             endTime,
    //             startDate,
    //             endDate,
    //             description,
    //             externalLink,
    //             "DEFAULT",
    //             goals,
    //             region === "온라인",
    //         );
    //     },
    //     onSuccess: (response) => {
    //         console.log(response);
    //         setTimeout(() => {
    //             router.push("/study/[studyId]");
    //             customAlert({
    //                 message: `스터디 수정이 완료되었어요.`,
    //                 linkLabel: "",
    //                 onClick: () => {},
    //             });
    //         }, 1000);
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //     },
    // });

    useEffect(() => {
        if (!isFetched) {
            useStudyStore.getState().fetchStudy(fetchStudyData);
        }
    }, [isFetched]);

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
