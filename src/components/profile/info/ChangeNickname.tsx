"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function ChangeNickname() {
    return (
        <>
            <div className="flex h-full flex-col justify-between bg-white p-5">
                <div className="flex flex-col">
                    <p className="b2 text-gray1000 mb-2">닉네임</p>
                    <Input type="text" placeholder="닉네임을 입력하세요" />
                </div>

                <Button color="black">변경하기</Button>
            </div>
        </>
    );
}
