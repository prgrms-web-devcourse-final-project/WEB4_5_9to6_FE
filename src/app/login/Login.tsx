"use client";

import Button from "@/components/common/Button";
import Input from "@/components/login/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { customAlert } from "@/utils/customAlert";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import { useThemeStore } from "@/stores/themeStore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams().get("error");
    const theme = useThemeStore((state) => state.theme);

    const { mutate: loginMutate } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: () => {
            useAuthStore.getState().login();
            router.push("/");
            customAlert({
                message: "로그인 되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
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

    useEffect(() => {
        console.log(searchParams);
        if (searchParams) {
            setLoginErrorMsg("이미 같은 이메일로 가입된 계정이 있습니다.");
            setLoginError(true);
        }
    }, [searchParams]);

    return (
        <div className="dark:bg-dark-bg flex h-full w-full flex-col items-center justify-center duration-200 ease-in">
            <div className="flex w-full max-w-screen flex-col items-center gap-4 px-5">
                <div
                    onClick={() => router.push("/")}
                    className="mb-10 w-1/2 cursor-pointer"
                >
                    {theme === "light" ? (
                        <Image
                            src="/images/logo.png"
                            width={372}
                            height={72}
                            className="h-auto w-full"
                            alt="logo"
                        />
                    ) : (
                        <Image
                            src="/images/logo-dark.png"
                            width={372}
                            height={72}
                            className="h-auto w-full"
                            alt="logo"
                        />
                    )}
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
                            className={`h6 mt-[-5px] pl-2 text-[#FF394A] transition-all duration-200 ease-in-out ${
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

                <div className="text-gray1000 dark:text-gray500 flex w-full justify-end duration-200 ease-in">
                    {/* <button className="cursor-pointer">비밀번호 찾기</button> */}
                    <Link href="/signup" className="cursor-pointer">
                        회원가입
                    </Link>
                </div>

                <div className="mt-5 mb-3 flex w-full flex-row">
                    <hr className="text-gray300 dark:text-gray800 w-[calc(50%-50px)] duration-200 ease-in" />
                    <span className="text-gray500 mt-[-10px] w-25 cursor-default text-center">
                        간편 로그인
                    </span>
                    <hr className="text-gray300 dark:text-gray800 w-[calc(50%-50px)] duration-200 ease-in" />
                </div>

                <div className="flex w-full flex-col gap-2.5">
                    <Button
                        onClick={kakaotalkHandler}
                        color="yellow"
                        icon="/images/kakaotalk.png"
                    >
                        카카오톡으로 시작
                    </Button>
                    <Button
                        onClick={googleHandler}
                        color="white"
                        icon="/images/google.png"
                    >
                        구글로 시작
                    </Button>
                </div>
            </div>
        </div>
    );
}
