"use client";

import { useChatMemberList } from "@/stores/chatModalStore";
import { X } from "lucide-react";
import avatar from "../../assets/avatar.svg";
import Image from "next/image";

interface MemberType {
    id: number;
    name: string;
}
export default function ChatMemberList() {
    const { isOpen, closeModal, setWhisperTarget } = useChatMemberList();
    if (!isOpen) return null;
    const teamMembers: MemberType[] = [
        { id: 201, name: "오수보망" },
        { id: 202, name: "근의공식마스터밍디" },
        { id: 203, name: "자바몰이건재" },
        { id: 204, name: "토익100점달성하영" },
    ];

    return (
        <>
            <div className="text-gray1000 flex w-full flex-col overflow-scroll rounded-3xl bg-white pb-5">
                <div className="mx-5 flex h-16 items-center justify-between">
                    <h3>귓속말할 대상 선택</h3>
                    <X
                        size={20}
                        onClick={closeModal}
                        className="cursor-pointer"
                    />
                </div>
                <ul className="flex flex-col gap-3">
                    <li
                        onClick={() => {
                            setWhisperTarget(null);
                            closeModal();
                        }}
                        className="flex h-11 cursor-pointer items-center gap-3 px-5"
                    >
                        전체 채팅
                    </li>
                    {teamMembers.map((user) => (
                        <li
                            key={user.id}
                            onClick={() => {
                                setWhisperTarget(user.id);
                                closeModal();
                            }}
                            className="flex h-11 cursor-pointer items-center gap-3 px-5"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-[var(--color-gray200)]">
                                <Image src={avatar} alt="user avatar" />
                            </div>
                            <p className="h6 transition-all duration-200 ease-in-out hover:text-[var(--color-main500)]">
                                {user.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
