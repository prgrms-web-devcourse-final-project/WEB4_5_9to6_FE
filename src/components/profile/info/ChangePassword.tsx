"use client";

import { changePassWord, verfiyPassWord } from "@/api/member";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useAuthStore } from "@/stores/authStore";
import { customAlert } from "@/utils/customAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePassword({ id }: { id: string }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordCheck, setNewPasswordCheck] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordCheckError, setNewPasswordCheckError] = useState(false);
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");

    const { myInfo, refetch } = useAuthStore();
    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            !newPassword ||
            !newPasswordCheck ||
            newPasswordError ||
            newPasswordCheckError
        )
            return;

        setCurrentPasswordError(false);
        try {
            const res = await verfiyPassWord(currentPassword);
            if (!res) {
                setCurrentPasswordError(true);
                return;
            }
            await changePassWord(currentPassword, newPassword);
            refetch();
            customAlert({
                message: "비밀번호가 변경되었습니다!",
                linkLabel: "닫기",
                onClick: () => {},
            });
            router.back();
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (myInfo && myInfo.id !== Number(id)) {
            customAlert({ message: "❗ 잘못된 경로의 접근입니다!" });
            router.replace("/");
        }
    }, [myInfo, id, router]);

    useEffect(() => {
        if (newPassword) {
            if (newPassword.length < 8 || newPassword.length > 16) {
                setNewPasswordErrorMsg(
                    "비밀번호는 8자 이상, 16자 이하여야 합니다.",
                );
                setNewPasswordError(true);
            } else if (
                !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9가-힣])/.test(
                    newPassword,
                )
            ) {
                setNewPasswordErrorMsg(
                    "특수문자, 영문, 숫자를 모두 포함해야 합니다.",
                );
                setNewPasswordError(true);
            } else {
                setNewPasswordError(false);
            }

            if (currentPassword === newPassword) {
                setNewPasswordErrorMsg(
                    "새로운 비밀번호가 아닙니다. 다시 입력해주세요.",
                );
                setNewPasswordError(true);
            } else {
                setNewPasswordError(false);
            }
            setNewPasswordCheck("");
        } else {
            setNewPasswordError(false);
        }
    }, [currentPassword, newPassword]);

    useEffect(() => {
        if (newPasswordCheck && !(newPassword === newPasswordCheck)) {
            setNewPasswordCheckError(true);
        } else {
            setNewPasswordCheckError(false);
        }
    }, [newPasswordCheck, newPassword]);

    useEffect(() => {
        setCurrentPasswordError(false);
    }, [currentPassword]);

    return (
        <>
            <form
                onSubmit={(e) => submitHandler(e)}
                className="flex h-full flex-col justify-between bg-white p-5"
            >
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2">기존 비밀번호</p>
                    <Input
                        type="password"
                        placeholder="기존 비밀번호를 입력해 주세요"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(
                                e.target.value.replace(/\s/g, ""),
                            )
                        }
                        error={currentPasswordError}
                        errorMsg="기존 비밀번호가 일치하지 않습니다!"
                    />
                    <p className="b2 text-gray1000 mt-4 mb-2">새 비밀번호</p>
                    <Input
                        type="password"
                        placeholder="변경할 비밀번호를 입력해 주세요"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value.replace(/\s/g, ""))
                        }
                        error={newPasswordError}
                        errorMsg={newPasswordErrorMsg}
                    />

                    <p className="b2 text-gray1000 mt-4 mb-2">비밀번호 확인</p>
                    <Input
                        type="password"
                        placeholder="비밀번호를 한번 더 입력해 주세요"
                        value={newPasswordCheck}
                        onChange={(e) =>
                            setNewPasswordCheck(
                                e.target.value.replace(/\s/g, ""),
                            )
                        }
                        error={newPasswordCheckError}
                        errorMsg="비밀번호가 일치하지 않습니다."
                    />
                </div>
                <Button
                    type="submit"
                    color="black"
                    disabled={
                        !currentPassword ||
                        !newPassword ||
                        !newPasswordCheck ||
                        currentPasswordError ||
                        newPasswordError ||
                        newPasswordCheckError
                    }
                >
                    비밀번호 변경
                </Button>
            </form>
        </>
    );
}
