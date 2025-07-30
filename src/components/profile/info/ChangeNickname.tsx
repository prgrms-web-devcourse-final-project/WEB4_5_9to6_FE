"use client";

import { changeNickName } from "@/api/members";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/memberStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangeNickname({ id }: { id: string }) {
    const [nickname, setNickname] = useState("");
    const [nicknameError, setNicknameError] = useState(false);
    const [nicknameErrorMsg, setNicknameErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { myInfo, refetch } = useAuthStore();
    const { fetch } = useProfileStore();
    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nickname || nicknameError) return;

        setIsLoading(true);
        try {
            await changeNickName(nickname);
            refetch();
            fetch(myInfo?.id || 0);
            customAlert({
                message: "닉네임이 변경되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
            router.back();
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

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
            {isLoading && <LoadingSpinner />}
            <form
                onSubmit={(e) => submitHandler(e)}
                className="flex h-full flex-col justify-between bg-white p-5 dark:bg-[#222222]"
            >
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2 dark:text-white">
                        닉네임
                    </p>
                    <Input
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        error={nicknameError}
                        errorMsg={nicknameErrorMsg}
                    />
                </div>

                <Button
                    type="submit"
                    color="black"
                    disabled={!nickname || nicknameError}
                >
                    변경하기
                </Button>
            </form>
        </>
    );
}
