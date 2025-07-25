"use client";

import { fetchChatHistory } from "@/api/chat";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore, useParticipantStore } from "@/stores/chatStore";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";
// import { useInfiniteQuery } from "@tanstack/react-query";

export default function ChattingRoom({ studyId }: { studyId: number }) {
    const myId = useAuthStore((state) => state.myInfo?.id);
    const messages = useChatStore((state) => state.messages);
    const members = useParticipantStore((state) => state.participants);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const topObserverRef = useRef<HTMLDivElement | null>(null);
    const prevScrollHeight = scrollRef.current?.scrollHeight || 0;
    // 오전, 오후
    dayjs.locale("ko");

    let lastDate = "";

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
            });
        }
    }, [messages]);

    // 맨 처음 히스토리 불러오기
    useEffect(() => {
        if (!studyId) return;
        const messageHistory = async () => {
            try {
                const { messages, hasNext } = await fetchChatHistory(
                    studyId,
                    null,
                    null,
                );
                useChatStore.getState().setMessages(messages);
                useChatStore.getState().setHasNext(hasNext);
                console.log("처음 불러온 히스토리", messages);
            } catch (err) {
                console.error("채팅 더 불러오기 실패", err);
            }
        };

        messageHistory();
    }, [studyId]);

    // 이전 채팅 페이지네이션
    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                if (
                    entries[0].isIntersecting &&
                    useChatStore.getState().hasNext
                ) {
                    const prevMessages = useChatStore.getState().messages;
                    const lastMessage = messages[messages.length - 1];
                    const cursorCreatedAt = lastMessage?.createdAt ?? null;
                    const lastChatId = lastMessage?.chatId ?? null;
                    console.log("이전 메시지 로딩 중...");
                    console.log(prevMessages);
                    try {
                        useChatStore.getState().setIsLoading(true);
                        const { messages, hasNext } = await fetchChatHistory(
                            studyId,
                            cursorCreatedAt,
                            lastChatId,
                        );

                        useChatStore.getState().appendMessages(messages);
                        useChatStore.getState().setHasNext(hasNext);
                        setTimeout(() => {
                            if (scrollRef.current) {
                                const newScrollHeight =
                                    scrollRef.current.scrollHeight || 0;
                                scrollRef.current.scrollTop =
                                    newScrollHeight - prevScrollHeight;
                            }
                        }, 0);
                    } catch (err) {
                        console.error("이전 메시지 불러오기 실패", err);
                    } finally {
                        useChatStore.getState().setIsLoading(false);
                    }
                }
            },
            {
                threshold: 0.1,
                rootMargin: "100px",
            },
        );

        if (topObserverRef.current) observer.observe(topObserverRef.current);

        return () => {
            if (topObserverRef.current)
                observer.unobserve(topObserverRef.current);
        };
    }, [studyId, prevScrollHeight, messages]);

    console.log("myId:", myId);

    return (
        <>
            <div
                ref={scrollRef}
                className="h-screen w-full overflow-y-scroll px-5 pb-20"
            >
                <div ref={topObserverRef}></div>
                {messages
                    .filter((msg) => {
                        if (msg.receiverId === null) return true;
                        return msg.receiverId === myId || msg.senderId === myId;
                    })
                    .map((msg, idx) => {
                        const isMine = msg.senderId === myId;
                        const isWhisper = msg.receiverId !== null;
                        const prevMsg = messages[idx - 1];
                        const isSameSender = prevMsg?.senderId === msg.senderId;

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
                                    {!isSameSender && !isMine ? (
                                        <div className="mt-3 mr-2 h-11.5 w-11.5 rounded-full bg-[var(--color-gray300)]">
                                            <Image
                                                key={msg.chatId}
                                                src={
                                                    members.find(
                                                        (m) =>
                                                            m.memberId ===
                                                            msg.senderId,
                                                    )?.image ||
                                                    "/images/rewardItems/61.png"
                                                }
                                                alt="profile avatar"
                                                width={46}
                                                height={46}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mt-3 mr-2 w-11.5"></div>
                                    )}
                                    <div className="flex flex-col">
                                        {isWhisper && (
                                            <p
                                                className={`c2 mb-0.5 flex ${
                                                    isMine
                                                        ? "justify-end text-[var(--color-main500)]"
                                                        : "text-[var(--color-main600)]"
                                                }`}
                                            >
                                                {isMine
                                                    ? `${msg.receiverNickname}님에게 귓속말`
                                                    : `${msg.senderNickname}님의 귓속말`}
                                            </p>
                                        )}
                                        {!isSameSender &&
                                            !isWhisper &&
                                            !isMine && (
                                                <p className="c2 text-[var(--color-gray600)]">
                                                    {msg.senderNickname}
                                                </p>
                                            )}
                                        <div
                                            className={`flex gap-1.5 ${
                                                isMine
                                                    ? "justify-end"
                                                    : "flex-row-reverse items-end justify-end"
                                            }`}
                                        >
                                            <p className="c2 flex items-end whitespace-nowrap text-[var(--color-gray600)]">
                                                {dayjs(msg.createdAt).format(
                                                    "A hh:mm",
                                                )}
                                            </p>

                                            <div
                                                className={`c1 max-w-[85%] rounded-xl px-4 py-2 break-words ${
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
