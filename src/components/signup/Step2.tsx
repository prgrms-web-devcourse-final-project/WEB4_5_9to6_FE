import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useEffect, useState } from "react";

export default function Step2({
    continueStep,
    requestPassword,
}: {
    continueStep: () => void;
    requestPassword: (password: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !password ||
            !confirmPassword ||
            passwordError ||
            confirmPasswordError
        )
            return;

        requestPassword(password);
        continueStep();
    };

    useEffect(() => {
        if (password) {
            if (password.length < 8 || password.length > 16) {
                setPasswordErrorMsg(
                    "비밀번호는 8자 이상, 16자 이하여야 합니다.",
                );
                setPasswordError(true);
            } else if (
                !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣])/.test(
                    password,
                )
            ) {
                setPasswordErrorMsg(
                    "특수문자, 영문, 숫자를 모두 포함해야 합니다.",
                );
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }
            setConfirmPassword("");
        } else {
            setPasswordError(false);
        }
    }, [password]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (confirmPassword && !(password === confirmPassword)) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
    }, [confirmPassword, password]);

    return (
        <>
            <form className="step-form" onSubmit={(e) => submitHandler(e)}>
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-700 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    비밀번호를 설정해주세요
                </h1>
                <p
                    className={`h6 mb-5 cursor-default text-[var(--color-gray600)] delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    특수문자, 영문, 숫자 포함 8자 이상 16자 이하
                </p>
                <div className="flex flex-col gap-1">
                    <div
                        className={`delay-1300 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="비밀번호 입력"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value.replace(/\s/g, ""))
                            }
                            error={passwordError}
                            errorMsg={passwordErrorMsg}
                        />
                    </div>
                    <div
                        className={`duration-1000 ease-out ${(!password || passwordError) && "pointer-events-none translate-y-[-4px] opacity-0"}`}
                    >
                        <Input
                            placeholder="비밀번호 확인"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value.replace(/\s/g, ""),
                                )
                            }
                            error={confirmPasswordError}
                            errorMsg="비밀번호가 일치하지 않습니다."
                        />
                    </div>
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {password &&
                    confirmPassword &&
                    !passwordError &&
                    !confirmPasswordError ? (
                        <Button type="submit">계속하기</Button>
                    ) : (
                        <Button disabled>계속하기</Button>
                    )}
                </div>
            </form>
        </>
    );
}
