"use client";

import { useChatMemberList } from "@/stores/chatModalStore";
import { X } from "lucide-react";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { useAnimationStore } from "@/stores/modalAnimationStore";
// import { getValidAvatar } from "@/utils/studyDataMap";
import { useParticipantStore } from "@/stores/chatStore";

export default function ChatMemberList({ studyId }: { studyId: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const { animationClass, changeClass } = useAnimationStore();
    const { isOpen, closeModal, setWhisperTarget } = useChatMemberList();
    const members = useParticipantStore((state) => state.participants);
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
    console.log(members);
    if (!isVisible) return null;

    return (
        <>
            <div
                className={`${animationClass} text-gray1000 flex w-full flex-col rounded-3xl bg-white pb-7`}
            >
                <div className="mx-5 flex h-16 items-center justify-between">
                    <h3>귓속말할 대상 선택</h3>
                    <X
                        size={20}
                        onClick={closeHandler}
                        className="cursor-pointer"
                    />
                </div>
                <ul className="flex flex-col gap-3">
                    <li
                        onClick={() => {
                            setWhisperTarget(null);
                            closeHandler();
                        }}
                        className="flex h-11 cursor-pointer items-center gap-3 px-5"
                    >
                        전체 채팅
                    </li>
                    {members.map((member) => (
                        <li
                            key={member.memberId}
                            onClick={() => {
                                setWhisperTarget(member.memberId);
                                closeHandler();
                            }}
                            className="flex h-11 cursor-pointer items-center gap-3 px-5"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-[var(--color-gray200)]">
                                {/* <Image
                                    src={getValidAvatar(member?.profileImage)}
                                    alt="user avatar"
                                    width={46}
                                    height={46}
                                /> */}
                            </div>
                            <p className="h6 transition-all duration-200 ease-in-out hover:text-[var(--color-main500)]">
                                {member?.nickName}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
