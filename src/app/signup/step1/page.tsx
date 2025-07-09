"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import ProgressBar from "@/components/signup/ProgressBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Step1() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isSend, setIsSend] = useState(0);
    const [EmailError, setEmailError] = useState(false);
    const router = useRouter();

    // test Code
    const correctCode = "000000";

    const sendEmail = () => {
        setIsSend(1);
    };
    const continueStep = () => {
        router.push("/signup/step2");
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSend) {
            continueStep();
        } else {
            sendEmail();
        }
    };

    useEffect(() => {
        if (
            email &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
        ) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }, [email]);

    return (
        <>
            <ProgressBar step={1} />
            <form
                className="relative h-[calc(100%-65px)] w-full p-5 pt-10"
                onSubmit={(e) => submitHandler(e)}
            >
                <h1 className="mb-2 text-[24px] font-semibold">
                    이메일 인증이 필요해요
                </h1>
                <p className="h6 mb-5 text-[var(--color-gray600)]">
                    이메일을 입력하면 메일이 발송돼요.
                </p>
                <div className="flex flex-col gap-2.5">
                    <Input
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={EmailError}
                        errorMsg={"이메일 형식이 올바르지 않습니다."}
                    />
                    {!!isSend && (
                        <>
                            <Input
                                placeholder="인증번호 입력"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button
                                className="inline cursor-pointer text-[var(--color-gray700)] underline underline-offset-4"
                                type="button"
                            >
                                재발송 하기
                            </button>
                        </>
                    )}
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {isSend ? (
                        <>
                            {code === correctCode ? (
                                <Button type="submit">계속하기</Button>
                            ) : (
                                <Button disabled>계속하기</Button>
                            )}
                        </>
                    ) : (
                        <>
                            {email && !EmailError ? (
                                <Button type="submit">인증메일 발송</Button>
                            ) : (
                                <Button disabled>인증메일 발송</Button>
                            )}
                        </>
                    )}
                </div>
            </form>
        </>
    );
}
