"use client";

import SubHeader from "@/components/common/SubHeader";
import ProgressBar from "@/components/common/ProgressBar";
import Step1 from "@/components/signup/Step1";
import Step3 from "@/components/signup/Step3";
import Step2 from "@/components/signup/Step2";
import Step4 from "@/components/signup/Step4";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { useRouter } from "next/navigation";

const client = new QueryClient();

export default function SignUp() {
    return (
        <QueryClientProvider client={client}>
            <SignUpContent />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

function SignUpContent() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();

    const submitSignUp = () => {
        setTimeout(() => {
            router.push("/signup/success");
        }, 1500);
    };

    // const { mutate: submitSignUp } = useMutation({
    //     mutationFn: () => signUp(email, password, nickname, birthday, gender),
    //     onSuccess: () => {
    //         setTimeout(() => {
    //             router.push("/signup/success");
    //         }, 1000);
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //     },
    // });

    return (
        <>
            <SubHeader>회원가입</SubHeader>
            <ProgressBar step={step} />
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
        </>
    );
}
