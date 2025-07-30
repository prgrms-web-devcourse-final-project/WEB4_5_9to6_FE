"use client";

import { useChatMemberList } from "@/stores/chatModalStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAnimationStore } from "@/stores/modalAnimationStore";
import { useParticipantStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";

export default function ChatMemberList({ studyId }: { studyId: string }) {
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();
    const { isOpen, closeModal, setWhisperTarget } = useChatMemberList();
    const members = useParticipantStore((state) => state.participants);
    const myId = useAuthStore((state) => state.myInfo?.id);
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            changeClass("animate-modalFadeIn");
        } else {
            changeClass("animate-modalFadeOut");
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [changeClass, isOpen, studyId]);

    const closeHandler = () => {
        changeClass("animate-modalFadeOut");
        setTimeout(() => {
            closeModal();
        }, 200);
    };
    if (!isVisible) return null;

    return (
        <>
            <div
                className={`${animationClass} text-gray1000 flex w-full flex-col rounded-3xl bg-white pb-7 dark:bg-[#222]`}
            >
                <div className="mx-5 flex h-16 items-center justify-between">
                    <h3 className="dark:text-white">귓속말할 대상 선택</h3>
                    <X
                        size={20}
                        onClick={closeHandler}
                        className="cursor-pointer dark:text-white"
                    />
                </div>
                <ul className="flex flex-col gap-3">
                    <li
                        onClick={() => {
                            setWhisperTarget(null);
                            closeHandler();
                        }}
                        className="flex h-11 cursor-pointer items-center gap-3 px-5 transition duration-100 hover:text-[var(--color-main500)] dark:text-white"
                    >
                        전체 채팅
                    </li>
                    {members
                        .filter((member) => member.memberId !== myId)
                        .map((member) => (
                            <li
                                key={member.memberId}
                                onClick={() => {
                                    console.log("귓속말 대상 선택됨:", member);
                                    setWhisperTarget(member.memberId);
                                    closeHandler();
                                    console.log(member.image);
                                }}
                                className="flex h-11 cursor-pointer items-center gap-3 px-5"
                            >
                                <div className="h-12 w-12 rounded-2xl bg-[var(--color-gray200)] dark:bg-[var(--color-gray900)]">
                                    <Image
                                        src={member?.image}
                                        alt="user avatar"
                                        width={46}
                                        height={46}
                                    />
                                </div>
                                <p className="h6 transition-all duration-100 ease-in-out hover:text-[var(--color-main500)] dark:text-white dark:hover:text-[var(--color-main400)]">
                                    {member?.nickname}
                                </p>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
}
