"use client";

import Button from "@/components/common/Button";

export default function ChangePassword() {
    return (
        <>
            <div className="flex min-h-screen flex-col justify-between bg-white p-5">
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2">기존 비밀번호</p>
                    <input
                        type="text"
                        className="border-gray300 b1 mb-6 rounded-xl border p-4"
                        placeholder="기존 비밀번호를 입력해 주세요"
                    />
                    <p className="b2 text-gray1000 mb-2">새 비밀번호</p>
                    <input
                        type="text"
                        className="border-gray300 b1 mb-6 rounded-xl border p-4"
                        placeholder="변경할 비밀번호를 입력해 주세요"
                    />
                    <p className="b2 text-gray1000 mb-2">비밀번호 확인</p>
                    <input
                        type="text"
                        className="border-gray300 b1 rounded-xl border p-4"
                        placeholder="비밀번호를 한번 더 입력해 주세요"
                    />
                </div>
                <Button color="black">비밀번호 변경</Button>
            </div>
        </>
    );
}
