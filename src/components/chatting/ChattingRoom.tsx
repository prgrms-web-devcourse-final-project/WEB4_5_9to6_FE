"use client";

import { fetchChatHistory } from "@/api/chat";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore, useParticipantStore } from "@/stores/chatStore";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function ChattingRoom({ studyId }: { studyId: number }) {
    const myId = useAuthStore((state) => state.myInfo?.id);
    const setMessages = useChatStore((state) => state.setMessages);
    const messages = useChatStore((state) => state.messages);
    const members = useParticipantStore((state) => state.participants);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    // 오전, 오후
    dayjs.locale("ko");
    useEffect(() => {
        const loadMessageHandler = async () => {
            const messageData = await fetchChatHistory(studyId);
            setMessages(messageData);
            console.log("history", messageData);
        };
        console.log("✅ useEffect 실행됨");
        loadMessageHandler();
    }, [setMessages]);

    console.log("채팅메세지", messages);

    const getNickname = (id: number) =>
        members.find((m) => m.memberId === id)?.nickName ?? "알 수 없음";
    let lastDate = "";

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
            });
        }
    }, [messages]);
    return (
        <>
            <div
                ref={scrollRef}
                className="h-[calc(100vh-100px)] w-full overflow-y-scroll pt-20"
            >
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
                        const dividerElement = dateDivider ? (
                            <div
                                key={`divider-${idx}`}
                                className="my-6 flex w-full items-center justify-center"
                            >
                                <div className="flex w-full items-center px-4">
                                    <div className="flex-grow border-t border-gray-300" />
                                    <span className="px-4 text-sm whitespace-nowrap text-gray-500">
                                        {dayjs(msg?.createdAt).format(
                                            "MM월 DD일",
                                        )}
                                    </span>
                                    <div className="flex-grow border-t border-gray-300" />
                                </div>
                            </div>
                        ) : null;

                        if (dateDivider) lastDate = msgDate;

                        return (
                            <div key={idx}>
                                {dividerElement}
                                <div
                                    className={`flex pt-3 ${isMine ? "justify-end" : "justify-start"}`}
                                >
                                    {!isMine && (
                                        <div className="mt-3 mr-2 h-11.5 w-11.5 rounded-full bg-[var(--color-gray300)]" />
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
                                            className={`flex gap-1 ${
                                                isMine
                                                    ? "justify-start"
                                                    : "flex-row-reverse justify-end"
                                            }`}
                                        >
                                            <p className="c2 mr-2 flex items-end text-[var(--color-gray600)]">
                                                {dayjs(msg.createdAt).format(
                                                    "A hh:mm",
                                                )}
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
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
