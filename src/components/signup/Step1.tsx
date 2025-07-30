import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendEmailCode, verifyEmailCode } from "@/api/auth";

export default function Step1({
    continueStep,
    requestEmail,
}: {
    continueStep: () => void;
    requestEmail: (email: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [isSend, setIsSend] = useState(0);
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const { mutate: sendEmail } = useMutation({
        mutationFn: () => sendEmailCode(email),
        onMutate: () => {
            setIsSending(true);
        },
        onSuccess: (response) => {
            setIsSend(1);
            setIsSending(false);
            console.log(response.data);
        },
        onError: (error: { status: number }) => {
            console.error(error);
            setIsSend(0);
            setIsSending(false);
            if (error.status === 409) {
                setEmailErrorMsg("이미 가입된 이메일입니다.");
                setEmailError(true);
            }
        },
    });

    const { mutate: verifyEmail } = useMutation({
        mutationFn: () => verifyEmailCode(email, code),
        onSuccess: (response) => {
            console.log(response.data);
            if (response.data.verified) {
                setIsVerified(true);
            } else {
                setIsVerified(false);
            }
        },
        onError: (error: { status: number }) => {
            console.error(error);
        },
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSend) {
            if (!email || emailError || !isVerified) return;
            requestEmail(email);
            continueStep();
        } else {
            if (!email || emailError) return;
            if (
                !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email)
            ) {
                setEmailErrorMsg("이메일 형식이 올바르지 않습니다.");
                setEmailError(true);
            } else {
                sendEmail();
            }
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setEmailError(false);
        setCode("");
    }, [email]);

    useEffect(() => {
        if (code.length === 6 && email) {
            verifyEmail();
        }
    }, [code, email, verifyEmail]);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out dark:text-white ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    이메일 인증이 필요해요
                </h1>
                <p
                    className={`h6 text-gray600 mb-5 cursor-default delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
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
                            errorMsg={emailErrorMsg}
                            readOnly={isVerified}
                            className={
                                isVerified ? "text-gray700 cursor-default" : ""
                            }
                        />
                    </div>
                    <div
                        className={`duration-1000 ease-out ${!isSend && "pointer-events-none translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="인증번호 입력"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            maxLength={6}
                            readOnly={isVerified}
                            className={
                                isVerified ? "text-gray700 cursor-default" : ""
                            }
                        />
                    </div>
                    <div
                        className={`mx-auto mt-3 w-20 delay-200 duration-1000 ${!isSend && "opacity-0"}`}
                    >
                        <button
                            className={`text-gray700 dark:text-gray500 cursor-pointer underline underline-offset-4 duration-200 ease-out ${isVerified ? "hover:text-gray700 dark:hover:text-gray500" : "hover:text-gray1000 dark:hover:text-gray600"}`}
                            type="button"
                            onClick={() => {
                                if (isVerified) return;
                                if (
                                    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(
                                        email,
                                    )
                                ) {
                                    setEmailErrorMsg(
                                        "이메일 형식이 올바르지 않습니다.",
                                    );
                                    setEmailError(true);
                                } else {
                                    sendEmail();
                                    setCode("");
                                }
                            }}
                        >
                            재발송 하기
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {isSend ? (
                        <>
                            {isVerified ? (
                                <Button type="submit">계속하기</Button>
                            ) : (
                                <Button disabled>계속하기</Button>
                            )}
                        </>
                    ) : (
                        <>
                            {email && !emailError && !isSending ? (
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
