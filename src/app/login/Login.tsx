"use client";

import Button from "@/components/common/Button";
import Input from "@/components/login/Input";
import Link from "next/link";
import { useState } from "react";
import { login } from "@/api/auth";
import {
    useMutation,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";

const queryClient = new QueryClient();

export default function Login() {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginContent />
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const { mutate: loginMutate } = useMutation({
        mutationFn: () => login(email, password),
        onSuccess: (response) => {
            const token = response?.data.accessToken;
            console.log(response);
            if (token) {
                localStorage.setItem("accessToken", token);
                router.push("/");
            }
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        loginMutate();
    };

    const kakaotalkHandler = () => {
        //
    };
    const googleHandler = () => {
        //
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="mx-5 flex flex-col items-center gap-4">
                <img
                    src="/images/logo.png"
                    alt="logo"
                    className="mb-10 w-1/2"
                />

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
