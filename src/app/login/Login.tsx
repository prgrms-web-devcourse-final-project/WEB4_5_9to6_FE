"use client";

import Button from "@/components/common/Button";
import Input from "@/components/login/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { customAlert } from "@/utils/customAlert";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const router = useRouter();

    const { mutate: loginMutate } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (response) => {
            const token = response?.data.accessToken;
            console.log(response);
            if (token) {
                useAuthStore.getState().login(token);
                router.push("/");
                customAlert({
                    message: "로그인 되었습니다!",
                    linkLabel: "닫기",
                    onClick: () => {},
                });
            }
        },
        onError: (error: { status: number }) => {
            console.error(error);
            if (error.status === 401) {
                setLoginErrorMsg("아이디나 비밀번호가 틀렸습니다.");
                setLoginError(true);
            }
        },
    });

    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setLoginErrorMsg("이메일을 입력해 주세요.");
            setLoginError(true);
        } else if (!password) {
            setLoginErrorMsg("비밀번호를 입력해 주세요.");
            setLoginError(true);
        } else {
            loginMutate();
        }
    };

    const kakaotalkHandler = () => {
        window.location.href =
            "https://studium.cedartodo.uk/oauth2/authorization/kakao";
    };
    const googleHandler = () => {
        window.location.href =
            "https://studium.cedartodo.uk/oauth2/authorization/google";
    };

    useEffect(() => {
        setLoginError(false);
    }, [email, password]);

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex w-full max-w-screen flex-col items-center gap-4 px-5">
                <div
                    onClick={() => router.push("/")}
                    className="mb-10 w-1/2 cursor-pointer"
                >
                    <Image
                        src="/images/logo.png"
                        width={372}
                        height={72}
                        className="h-auto w-full"
                        alt="logo"
                    />
                </div>

                <form
                    className="flex w-full flex-col gap-4"
                    onSubmit={loginHandler}
                >
                    <div className="flex w-full flex-col gap-2.5">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                            이메일
                        </Input>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                            비밀번호
                        </Input>
                        <span
                            className={`h6 mt-[-10px] pl-2 text-[#FF394A] transition-all duration-200 ease-in-out ${
                                loginError
                                    ? "max-h-[40px] translate-y-0 opacity-100"
                                    : "max-h-0 -translate-y-2 opacity-0"
                            }`}
                        >
                            {loginErrorMsg}
                        </span>
                    </div>
                    <Button type="submit">로그인</Button>
                </form>

                <div className="flex w-full justify-between text-[var(--color-gray1000)]">
                    <button className="cursor-pointer">비밀번호 찾기</button>
                    <Link href="/signup" className="cursor-pointer">
                        회원가입
                    </Link>
                </div>

                <div className="my-3 w-full border-b border-[var(--color-gray300)] text-center leading-0">
                    <span className="cursor-default bg-white px-5 text-[var(--color-gray500)]">
                        간편 로그인
                    </span>
                </div>

                <div className="flex w-full flex-col gap-2.5">
                    <Button
                        onClick={kakaotalkHandler}
                        color="yellow"
                        icon="../images/kakaotalk.png"
                    >
                        카카오톡으로 시작
                    </Button>
                    <Button
                        onClick={googleHandler}
                        color="white"
                        icon="../images/google.png"
                    >
                        구글로 시작
                    </Button>
                </div>
            </div>
        </div>
    );
}
