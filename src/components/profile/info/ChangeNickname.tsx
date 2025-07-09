"use client";

import Button from "@/components/common/Button";

export default function ChangeNickname() {
    return (
        <>
            <div className="flex min-h-screen flex-col justify-between bg-white p-5">
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2">닉네임</p>
                    <input
                        type="text"
                        className="border-gray300 b1 rounded-xl border p-4"
                        placeholder="닉네임을 입력하세요"
                    />
                </div>
                <Button color="black">변경하기</Button>
            </div>
        </>
    );
}
