import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmailCode } from "@/api/auth";

export default function Step1({
    continueStep,
    requestEmail,
}: {
    continueStep: () => void;
    requestEmail: (email: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isSend, setIsSend] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [emailError, setEmailError] = useState(false);

    const { mutate: sendEmail } = useMutation({
        mutationFn: sendEmailCode,
        onSuccess: (response) => {
            console.log(response.data);
            setIsSend(1);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    // test Code
    const correctCode = "123456";

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSend) {
            if (!email || emailError || code !== correctCode) return;
            requestEmail(email);
            continueStep();
        } else {
            if (!email || emailError) return;
            // sendEmail(email); Todo: 백엔드 로직 완성시 수정
            setIsSend(1);
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    이메일 인증이 필요해요
                </h1>
                <p
                    className={`h6 mb-5 cursor-default text-[var(--color-gray600)] delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    이메일을 입력하면 메일이 발송돼요.
                </p>
                <div className="flex flex-col gap-1">
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="이메일 입력"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                            errorMsg={"이메일 형식이 올바르지 않습니다."}
                        />
                    </div>
                    <div
                        className={`duration-1000 ease-out ${!isSend && "pointer-events-none translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="인증번호 입력"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button
                        className={`mx-auto mt-3 w-20 cursor-pointer text-[var(--color-gray700)] underline underline-offset-4 delay-1000 duration-1000 ease-out hover:text-[var(--color-gray1000)] ${!isSend && "opacity-0"}`}
                        type="button"
                        onClick={() => sendEmail(email)}
                    >
                        재발송 하기
                    </button>
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
                            {email && !emailError ? (
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
