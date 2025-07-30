"use client";

import { SendHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatMemberList from "./ChatMemberList";
import { useChatMemberList } from "@/stores/chatModalStore";
import { IMessage, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useChatStore, useParticipantStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";
import { fetchStudyMember } from "@/api/studyList";

export default function MessageInput({ studyId }: { studyId: string }) {
    const { whisperTarget, closeModal, openModal, isOpen } =
        useChatMemberList();
    const [message, setMessage] = useState("");
    const clientRef = useRef<Client | null>(null);
    const members = useParticipantStore((state) => state.participants);
    const myInfo = useAuthStore.getState().myInfo;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const onMessageReceived = useCallback((message: IMessage) => {
        const body = JSON.parse(message.body);
        useChatStore.getState().addMessage(body.data);
    }, []);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const client = clientRef.current;
        if (!client || !client.connected) {
            console.warn("전송 실패함");
            return;
        }

        let msgPayload;

        if (whisperTarget !== null) {
            const studyMembers = await fetchStudyMember(Number(studyId));
            const targetMember = studyMembers.find(
                (m: StudyMember) => m.memberId === whisperTarget,
            );

            if (!targetMember) {
                console.warn("귓속말 대상 없음");
                return;
            }

            msgPayload = {
                receiverEmail: targetMember.email,
                receiverNickname: targetMember.nickname,
                content: message,
            };
            console.log("targetMember:", targetMember);
        } else {
            msgPayload = {
                senderId: myInfo?.id,
                senderEmail: myInfo?.email,
                senderNickname: myInfo?.nickname,
                receiverId: null,
                receiverNickName: null,
                content: message,
            };
        }

        client.publish({
            destination: `/publish/chat.send/${studyId}`,
            body: JSON.stringify(msgPayload),
        });

        setMessage("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };
    useEffect(() => {
        // 웹소켓 연결
        const client = new Client({
            connectHeaders: {
                studyId: `${studyId}`,
            },
            webSocketFactory: () =>
                new SockJS("https://studium.cedartodo.uk/ws-connect"),
            onConnect: () => {
                console.log("client 연결 상태:", client.connected);

                client.subscribe(`/subscribe/${studyId}`, onMessageReceived);
                client.subscribe(`/user/queue/messages`, onMessageReceived);
                client.subscribe(
                    `/subscribe/${studyId}/participants`,
                    (message) => {
                        const { data } = JSON.parse(message.body);
                        useParticipantStore.getState().setParticipants(data);
                    },
                );
                // 먼저 있던 참여자 불러오기
                client.publish({
                    destination: `/publish/participants/${studyId}`,
                    body: "",
                });
            },
            onStompError: (error) => {
                console.error("웹소켓 연결 실패:", error);
            },
            debug: function (str) {
                console.log(str);
            },
        });
        clientRef.current = client;
        client.activate();

        return () => {
            client.deactivate();
        };
    }, [onMessageReceived, studyId]);

    return (
        <div className="fixed bottom-0 w-full bg-white px-4 pt-[11px] pb-5 dark:border-t-1 dark:border-t-[var(--color-gray1000)] dark:bg-[#222]">
            <div className="relative flex items-end justify-between gap-3">
                {/* 귓속말 유저 선택 */}
                <div className="relative">
                    <button
                        onClick={openModal}
                        className={`flex h-9 w-14 cursor-pointer items-center justify-center rounded-2xl px-2 dark:bg-[var(--color-gray1000)] ${whisperTarget ? "bg-[var(--color-main600)]" : "bg-[var(--color-gray900)]"} `}
                    >
                        <p className="c1 text-white">
                            {whisperTarget ? "귓속말" : "전체"}
                        </p>
                    </button>

                    {isOpen && (
                        <div
                            onClick={closeModal}
                            className="fixed inset-0 z-60 flex h-full w-full items-end bg-black/30"
                        >
                            <div
                                className="mx-3 mb-20 flex w-full items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ChatMemberList studyId={studyId} />
                            </div>
                        </div>
                    )}
                </div>

                {/* 입력창 */}
                <textarea
                    ref={textareaRef}
                    placeholder={
                        whisperTarget
                            ? ` ${members.find((member) => member?.memberId === whisperTarget)?.nickname}님께 귓속말`
                            : "메세지 입력"
                    }
                    className={`max-h-20 w-[85%] resize-none overflow-y-scroll rounded-2xl px-3.5 py-1.5 text-[var(--color-gray1000)] focus:outline-none dark:text-white ${whisperTarget ? "bg-[var(--color-main100)] placeholder:text-[#EAB3C1] dark:bg-black dark:placeholder:text-[var(--color-main400)]" : "bg-[var(--color-gray200)] placeholder:text-[var(--color-gray500)] dark:bg-[var(--color-gray1000)] dark:placeholder:text-[var(--color-gray700)]"}`}
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                    }}
                    onKeyDown={(e) => {
                        if (e.nativeEvent.isComposing) {
                            return;
                        }
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />

                {/* 전송 */}
                <button
                    type="button"
                    className="mb-2 w-8 cursor-pointer pl-2 text-center"
                    onClick={sendMessage}
                >
                    <SendHorizontal className="text-[var(--color-gray500)] transition duration-200 ease-in-out hover:text-[var(--color-gray1000)] dark:text-white dark:hover:text-[var(--color-gray400)]" />
                </button>
            </div>
        </div>
    );
}
