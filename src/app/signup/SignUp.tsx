"use client";

import SubHeader from "@/components/common/SubHeader";
import ProgressBar from "@/components/signup/ProgressBar";
import Step1 from "@/components/signup/Step1";
import Step3 from "@/components/signup/Step3";
import Step2 from "@/components/signup/Step2";
import Step4 from "@/components/signup/Step4";
import { useState } from "react";

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");

    return (
        <>
            <SubHeader>회원가입</SubHeader>
            <ProgressBar step={step} />
            <Step1 continueStep={() => setStep(2)} requestEmail={setEmail} />
            <Step2
                continueStep={() => setStep(3)}
                requestPassword={setPassword}
            />
            <Step3
                continueStep={() => setStep(4)}
                requestNickname={setNickname}
            />
            <Step4
                continueStep={() => setStep(5)}
                requestBirthday={setBirthday}
                requestGender={setGender}
            />
        </>
    );
}
