"use client";

import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/create/Step1";
import Step2 from "@/components/create/Step2";
import Step3 from "@/components/create/Step3";
import Step4 from "@/components/create/Step4";
import Step5 from "@/components/create/Step5";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateStudy() {
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
