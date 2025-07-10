import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useEffect, useState } from "react";

export default function Step3({
    continueStep,
    requestNickname,
}: {
    continueStep: () => void;
    requestNickname: (nickname: string) => void;
}) {
    const [isMounted, setIsMounted] = useState(false);
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState(false);
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nickname || nicknameError) return;

        requestNickname(nickname);
        continueStep();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (nickname) {
            if (nickname.length < 2 || nickname.length > 10) {
                setNicknameErrorMsg("닉네임은 2자 이상, 10자 이하여야 합니다.");
                setNicknameError(true);
            } else if (!/^[a-zA-Z가-힣0-9]+$/.test(nickname)) {
                setNicknameErrorMsg("영문, 한글, 숫자만 사용할 수 있습니다.");
                setNicknameError(true);
            } else {
                setNicknameError(false);
            }
        } else {
            setNicknameError(false);
        }
    }, [nickname]);

    return (
        <>
            <form
                className="relative h-[calc(100%-65px)] w-full p-5 pt-10"
                onSubmit={(e) => submitHandler(e)}
            >
                <h1
                    className={`mb-2 cursor-default text-[24px] font-semibold delay-900 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    닉네임을 설정해주세요
                </h1>
                <p
                    className={`h6 mb-5 cursor-default text-[var(--color-gray600)] delay-1100 duration-1000 ease-out ${!isMounted && "translate-y-[-8px] opacity-0"}`}
                >
                    특수문자 제외 2자 이상 10자 이하
                </p>
                <div
                    className={`delay-1500 duration-1000 ease-out ${!isMounted && "translate-y-[-4px] opacity-0"}`}
                >
                    <Input
                        placeholder="닉네임 입력"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        error={nicknameError}
                        errorMsg={nicknameErrorMsg}
                    />
                </div>
                <div className="absolute bottom-5 w-[calc(100%-40px)]">
                    {nickname && !nicknameError ? (
                        <Button type="submit">계속하기</Button>
                    ) : (
                        <Button disabled>계속하기</Button>
                    )}
                </div>
            </form>
        </>
    );
}
