"use client";

import { createStudy } from "@/api/studies";
import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/create/Step1";
import Step2 from "@/components/create/Step2";
import Step3 from "@/components/create/Step3";
import Step4 from "@/components/create/Step4";
import Step5 from "@/components/create/Step5";
import { customAlert } from "@/utils/customAlert";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStudy() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState("");
    const [maxMember, setMaxMember] = useState("");
    const [name, setName] = useState("");
    const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [region, setRegion] = useState("");
    const [place, setPlace] = useState("");
    const [goals, setGoals] = useState<{ goalId: number; content: string }[]>(
        [],
    );
    const [description, setDescription] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const router = useRouter();

    const { mutate: submitCreate } = useMutation({
        mutationFn: () =>
            createStudy({
                name,
                category,
                maxMembers: +maxMember,
                region,
                place,
                schedules: daysOfWeek,
                startTime,
                endTime,
                startDate,
                endDate,
                description,
                externalLink,
                studyType: "DEFAULT",
                goals,
                online: region === "온라인",
            }),
        onMutate: () => {
            console.log(
                name,
                category,
                +maxMember,
                region,
                place,
                daysOfWeek,
                startTime,
                endTime,
                startDate,
                endDate,
                description,
                externalLink,
                "DEFAULT",
                goals,
                region === "온라인",
            );
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
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return (
        <>
            <div className="h-full w-full pt-[65px]">
                <ProgressBar totalStep={6} step={step} />
                {step === 1 ? (
                    <Step1
                        continueStep={() => setStep(2)}
                        requestCategory={setCategory}
                        requestMaxMember={setMaxMember}
                        requestName={setName}
                    />
                ) : step === 2 ? (
                    <Step2
                        continueStep={() => setStep(3)}
                        requestDaysOfWeek={setDaysOfWeek}
                        requestStartTime={setStartTime}
                        requestEndTime={setEndTime}
                        requestStartDate={setStartDate}
                        requestEndDate={setEndDate}
                    />
                ) : step === 3 ? (
                    <Step3
                        continueStep={() => setStep(4)}
                        requestRegion={setRegion}
                        requestPlace={setPlace}
                    />
                ) : step === 4 ? (
                    <Step4
                        continueStep={() => setStep(5)}
                        requestGoals={setGoals}
                    />
                ) : (
                    <Step5
                        continueStep={() => setStep(6)}
                        requestDescription={setDescription}
                        requestExternalLink={setExternalLink}
                        submitCreate={submitCreate}
                    />
                )}
            </div>
        </>
    );
}
