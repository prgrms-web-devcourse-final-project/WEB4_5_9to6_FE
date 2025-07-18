"use client";

import { changeNickName } from "@/api/member";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuthStore } from "@/stores/authStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangeNickname() {
    const [nickname, setNickname] = useState("");
    const { myInfo, refetch } = useAuthStore();
    const rotuer = useRouter();

    const clickHandler = async () => {
        try {
            await changeNickName(myInfo?.id || 0, nickname);
            refetch();
            customAlert({
                message: "닉네임이 변경되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
            rotuer.back();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="flex h-full flex-col justify-between bg-white p-5">
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2">닉네임</p>
                    <Input
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        type="text"
                        placeholder="닉네임을 입력하세요"
                    />
                </div>

                <Button onClick={clickHandler} color="black">
                    변경하기
                </Button>
            </div>
        </>
    );
}
