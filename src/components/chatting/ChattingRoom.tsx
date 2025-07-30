"use client";

import { fetchChatHistory } from "@/api/chat";
import { useAuthStore } from "@/stores/authStore";
import { useChatStore, useParticipantStore } from "@/stores/chatStore";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Image from "next/image";

export default function ChattingRoom({ studyId }: { studyId: number }) {
    const myId = useAuthStore((state) => state.myInfo?.id);
    const myEmail = useAuthStore((state) => state.myInfo?.email);
    const messages = useChatStore((state) => state.messages);
    const hasNext = useChatStore((state) => state.hasNext);
    const members = useParticipantStore((state) => state.participants);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const topObserverRef = useRef<HTMLDivElement | null>(null);

    // 오전, 오후
    dayjs.locale("ko");

    let lastDate = "";

    setTimeout(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "auto",
        });
    }, 0);

    useEffect(() => {
        if (!isInitialLoad && scrollRef.current && messages.length > 0) {
            setTimeout(() => {
                scrollRef.current!.scrollTo({
                    top: scrollRef.current!.scrollHeight,
                });
                setIsInitialLoad(true);
            }, 0);
        }
    }, [messages, isInitialLoad]);

    // 최초 히스토리 30개
    const initialLoadMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const { messages: newMsgs, hasNext } = await fetchChatHistory(
                studyId,
                null,
                null,
                30,
            );
            const chatStore = useChatStore.getState();
            chatStore.setMessages(newMsgs);
            chatStore.setHasNext(hasNext);
            setIsInitialLoad(true);
        } catch (error) {
            console.error("최초 메세지 불러오기 실패", error);
        } finally {
            setIsLoading(false);
        }
    }, [studyId]);

    // 추가 히스토리 패치
    const loadMessages = useCallback(async () => {
        const chatStore = useChatStore.getState();
        const currentMessages = chatStore.messages;
        const oldest = currentMessages[0];
        const cursorCreatedAt = oldest?.createdAt ?? null;
        const lastChatId = oldest?.chatId ?? null;

        const scrollEl = scrollRef.current;
        const prevScrollHeight = scrollEl?.scrollHeight ?? 0;
        const prevScrollTop = scrollEl?.scrollTop ?? 0;
        try {
            const { messages: newMsgs, hasNext } = await fetchChatHistory(
                studyId,
                cursorCreatedAt,
                lastChatId,
            );
            chatStore.appendMessages(newMsgs);
            chatStore.setHasNext(hasNext);

            setTimeout(() => {
                if (scrollEl) {
                    const newScrollHeight = scrollEl.scrollHeight;
                    const heightDiff = newScrollHeight - prevScrollHeight;
                    scrollEl.scrollTop = prevScrollTop + heightDiff;
                }
            }, 0);
        } catch (error) {
            console.error("이전 메세지 불러오기 실패", error);
        }
    }, [studyId]);

    // 페이지네이션
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNext) {
                loadMessages();
            }
        });

        const topRef = topObserverRef.current;
        if (topRef) observer.observe(topRef);

        return () => {
            if (topRef) observer.unobserve(topRef);
        };
    }, [hasNext, loadMessages]);

    useEffect(() => {
        useChatStore.getState().clearMessages();
        initialLoadMessages();
    }, [studyId, initialLoadMessages]);
    console.log("myId:", myId);

    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full animate-pulse px-5 py-20">
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <div className="mb-6 flex items-start gap-3">
                                <div className="bg-gray400 h-10 w-30 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl" />
                            </div>
                            <div className="mb-6 flex w-full items-start justify-end gap-3">
                                <div className="bg-gray400 h-10 w-30 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    ref={scrollRef}
                    className="h-screen w-full overflow-y-scroll px-5 pt-10 pb-20"
                >
                    <div ref={topObserverRef}></div>
                    {messages
                        .filter((msg) => {
                            if (msg.receiverId === null) return true;
                            return (
                                msg.receiverId === myEmail ||
                                (myId !== undefined && msg.senderId === myId)
                            );
                        })
                        .map((msg, idx) => {
                            const isMine = msg.senderId === myId;
                            const isWhisper = msg.receiverId !== null;
                            const prevMsg = messages[idx - 1];
                            const isSameSender =
                                prevMsg?.senderId === msg.senderId;
                            const isSameReceiver =
                                prevMsg?.receiverId === msg.receiverId;

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
                                        <div className="flex-grow border-t border-gray-300 dark:border-[var(--color-gray800)]" />
                                        <span className="px-4 text-sm whitespace-nowrap text-gray-500 dark:text-[var(--color-gray600)]">
                                            {dayjs(msg?.createdAt).format(
                                                "MM월 DD일",
                                            )}
                                        </span>
                                        <div className="flex-grow border-t border-gray-300 dark:border-[var(--color-gray800)]" />
                                    </div>
                                </div>
                            ) : null;

                            if (dateDivider) lastDate = msgDate;
                            const matchedMember = members.find(
                                (m) => m.memberId === msg.senderId,
                            );
                            console.log("✅ 매칭된 멤버:", matchedMember);
                            return (
                                <div key={idx}>
                                    {dividerElement}
                                    <div
                                        className={`flex ${
                                            isMine
                                                ? "justify-end"
                                                : "justify-start"
                                        } ${isSameSender ? "pt-1" : "pt-3"}`}
                                    >
                                        {!isSameSender &&
                                        !isSameReceiver &&
                                        !isMine ? (
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
                                                    width={45}
                                                    height={45}
                                                />
                                            </div>
                                        ) : (
                                            <div className="mt-3 mr-2 w-11.5"></div>
                                        )}
                                        <div className="flex flex-col">
                                            {isWhisper && (
                                                <p
                                                    className={`c2 flex ${
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
                                            {!isWhisper &&
                                                !isSameSender &&
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
                                                    {dayjs(
                                                        msg.createdAt,
                                                    ).format("A hh:mm")}
                                                </p>

                                                <div
                                                    className={`c1 max-w-[85%] rounded-b-2xl px-4 py-2 break-words ${
                                                        isWhisper
                                                            ? `${isMine ? "rounded-tl-2xl" : "rounded-tr-2xl"} bg-[var(--color-gray1000)] text-white`
                                                            : isMine
                                                              ? "rounded-tl-2xl bg-[var(--color-main600)] text-white"
                                                              : "rounded-tr-2xl bg-white text-[var(--color-gray1000)] dark:bg-[var(--color-gray1000)] dark:text-white"
                                                    } ${isSameSender ? "rounded-2xl" : ""}`}
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
            )}
        </>
    );
}
