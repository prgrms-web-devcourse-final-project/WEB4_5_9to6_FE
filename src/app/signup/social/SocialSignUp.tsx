"use client";

import ProgressBar from "@/components/common/ProgressBar";
import Step3 from "@/components/signup/Step3";
import Step4 from "@/components/signup/Step4";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMutation } from "@tanstack/react-query";
import { firstRegist } from "@/api/auth";
import { useRouter } from "next/navigation";

const client = new QueryClient();

export default function SocialSignUp() {
    return (
        <QueryClientProvider client={client}>
            <SignUpContent />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

function SignUpContent() {
    const [step, setStep] = useState(3);
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const router = useRouter();

    const { mutate: submitSignUp } = useMutation({
        mutationFn: () => firstRegist(nickname, birthday, gender),
        onSuccess: () => {
            console.log(nickname, birthday, gender);
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
            <div className="h-full w-full pt-[65px]">
                <ProgressBar totalStep={5} step={step} />
                {step === 3 ? (
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
