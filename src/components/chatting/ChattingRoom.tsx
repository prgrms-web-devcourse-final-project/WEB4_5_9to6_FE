"use client";

import { fetchChatHistory } from "@/api/chat";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore, useParticipantStore } from "@/stores/chatStore";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function ChattingRoom({ studyId }: { studyId: number }) {
    const myId = useAuthStore((state) => state.myInfo?.id);
    const setMessages = useChatStore((state) => state.setMessages);
    const messages = useChatStore((state) => state.messages);
    const members = useParticipantStore().participants;

    useEffect(() => {
        const loadMessageHandler = async () => {
            const messageData = await fetchChatHistory(studyId);
            setMessages(messageData);
        };
        loadMessageHandler();
    }, [studyId, setMessages]);

    const getNickname = (id: number) =>
        members.find((m) => m.memberId === id)?.nickName ?? "알 수 없음";
    let lastDate = "";
    return (
        <>
            <div className="h-fit w-full pt-20">
                {messages
                    .filter((msg) => {
                        if (msg.receiverId === null) return true;
                        return msg.receiverId === myId || msg.senderId === myId;
                    })
                    .map((msg, idx) => {
                        const isMine = msg.senderId === myId;
                        const isWhisper = msg.receiverId !== null;

                        const msgDate = dayjs(msg.createdAt).format(
                            "YYYY-MM-DD",
                        );
                        const dateDivider = msgDate !== lastDate;
                        if (dateDivider) lastDate = msgDate;
                        return (
                            <div
                                key={idx}
                                className={`flex pt-3 ${isMine ? "justify-end" : "justify-start"}`}
                            >
                                {dateDivider && (
                                    <div className="my-6 flex items-center justify-center text-sm text-gray-400">
                                        ----------{" "}
                                        {dayjs(msg?.createdAt).format(
                                            "MM월 DD일",
                                        )}{" "}
                                        ----------
                                    </div>
                                )}
                                {!isMine && (
                                    <div className="mt-3 mr-2 h-11.5 w-11.5 rounded-full bg-[var(--color-gray300)]">
                                        {/* 아바타영역 */}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    {isWhisper && (
                                        <p
                                            className={`c1 mb-0.5 flex ${
                                                isMine
                                                    ? "justify-end text-[var(--color-main500)]"
                                                    : "text-[var(--color-main600)]"
                                            }`}
                                        >
                                            {isMine
                                                ? `${getNickname(msg?.receiverId)}님에게 귓속말`
                                                : `${getNickname(msg.senderId)}님의 귓속말`}
                                        </p>
                                    )}
                                    {!isWhisper && !isMine && (
                                        <p className="c2 text-[var(--color-gray600)]">
                                            {getNickname(msg.senderId)}
                                        </p>
                                    )}
                                    <div
                                        className={`flex gap-1 ${isMine ? "justify-start" : "flex-row-reverse justify-end"}`}
                                    >
                                        <p className="c2 flex items-end text-[var(--color-gray600)]">
                                            {msg.createdAt}
                                        </p>

                                        <div
                                            className={`c1 rounded-xl px-4 py-2 ${
                                                isWhisper
                                                    ? "bg-[var(--color-gray1000)] text-white"
                                                    : isMine
                                                      ? "bg-[var(--color-main600)] text-white"
                                                      : "bg-white text-[var(--color-gray1000)]"
                                            }`}
                                        >
                                            <p>{msg.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
