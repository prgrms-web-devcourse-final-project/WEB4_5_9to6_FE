"use client";

import { changePassWord, verfiyPassWord } from "@/api/members";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuthStore } from "@/stores/authStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");

    const { refetch } = useAuthStore();
    const rotuer = useRouter();

    const clickHandler = async () => {
        try {
            const res = await verfiyPassWord(currentPassword);
            if (!res) {
                customAlert({
                    message:
                        "기존 비밀번호가 일치하지 않습니다\n입력 값을 확인하세요!",
                    linkLabel: "닫기",
                    onClick: () => {},
                });
            }
            await changePassWord(currentPassword, newPassword);
            refetch();
            customAlert({
                message: "비밀번호가 변경되었습니다!",
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
                    <p className="b2 text-gray1000 mb-2">기존 비밀번호</p>
                    <Input
                        type="text"
                        className="mb-4"
                        placeholder="기존 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <p className="b2 text-gray1000 mb-2">새 비밀번호</p>
                    <Input
                        type="text"
                        className="mb-4"
                        placeholder="변경할 비밀번호를 입력해 주세요"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <p className="b2 text-gray1000 mb-2">비밀번호 확인</p>
                    <Input
                        type="text"
                        className="mb-4"
                        placeholder="비밀번호를 한번 더 입력해 주세요"
                        value={newPasswordCheck}
                        onChange={(e) => setNewPasswordCheck(e.target.value)}
                    />
                </div>
                <Button color="black" onClick={clickHandler}>
                    비밀번호 변경
                </Button>
            </div>
        </>
    );
}
