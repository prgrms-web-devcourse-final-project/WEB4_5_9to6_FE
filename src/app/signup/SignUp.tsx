"use client";

import SubHeader from "@/components/common/SubHeader";
import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/signup/Step1";
import Step3 from "@/components/signup/Step3";
import Step2 from "@/components/signup/Step2";
import Step4 from "@/components/signup/Step4";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();

    const { mutate: submitSignUp } = useMutation({
        mutationFn: () => signUp(email, password, nickname, birthday, gender),
        onSuccess: () => {
            setTimeout(() => {
                router.push("/signup/success");
            }, 1000);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    return (
        <>
            <SubHeader className="max-w-sm">회원가입</SubHeader>
            <div className="dark:bg-dark-bg h-full w-full pt-[65px] duration-200 ease-in">
                <ProgressBar totalStep={5} step={step} />
                {step === 1 ? (
                    <Step1
                        continueStep={() => setStep(2)}
                        requestEmail={setEmail}
                    />
                ) : step === 2 ? (
                    <Step2
                        continueStep={() => setStep(3)}
                        requestPassword={setPassword}
                    />
                ) : step === 3 ? (
                    <Step3
                        continueStep={() => setStep(4)}
                        requestNickname={setNickname}
                    />
                ) : (
                    <Step4
                        continueStep={() => setStep(5)}
                        requestBirthday={setBirthday}
                        requestGender={setGender}
                        submitSignUp={submitSignUp}
                    />
                )}
            </div>
        </>
    );
}
