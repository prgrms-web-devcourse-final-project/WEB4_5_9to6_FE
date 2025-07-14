"use client";

import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/create/Step1";
import Step2 from "@/components/create/Step2";
import Step3 from "@/components/create/Step3";
import Step4 from "@/components/create/Step4";
import Step5 from "@/components/create/Step5";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditStudy() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState("");
    const [maxMember, setMaxMember] = useState("");
    const [name, setName] = useState("");
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [region, setRegion] = useState("");
    const [place, setPlace] = useState("");
    const [goals, setGoals] = useState([]);
    const [description, setDescription] = useState("");
    const [externalLink, setExternalLink] = useState("");
    const router = useRouter();

    const submitCreate = () => {
        setTimeout(() => {
            router.push("/studylist");
            // API 연결 후 라우터 다시 작성
            customAlert({
                message: `스터디 생성이 완료되었어요!\n스터디룸을 확인해보세요.`,
                linkLabel: "이동하기",
                onClick: () => router.push("/study/1"),
            });
        }, 1500);
    };

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
