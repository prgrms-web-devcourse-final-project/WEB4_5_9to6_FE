"use client";

import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatMemberList from "./ChatMemberList";
import { useChatMemberList } from "@/stores/chatModalStore";
import { IMessage, Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "next/navigation";
import { studyMembers } from "@/api/studies";

interface MemberType {
    id: number;
    name: string;
}

export default function MessageInput() {
    const { whisperTarget, closeModal } = useChatMemberList();
    const [message, setMessage] = useState("");
    const { openModal, isOpen } = useChatMemberList();
    const params = useParams();
    const studyId = Number(params.studyId);
    const token = localStorage.getItem("accessToken");
    const clientRef = useRef<Client | null>(null);
    const [members, setMembers] = useState<ChatMember[]>([]);

    useEffect(() => {
        studyMembers(studyId);
    }, [studyId]);
    useEffect(() => {
        if (!token) {
            console.warn("토큰 없음: 웹소켓 연결안됨");
            return;
        }

        const client = new Client({
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            webSocketFactory: () =>
                new SockJS("https://studium.cedartodo.uk/ws-connect"),
            onConnect: (frame) => {
                console.log("웹소켓 연결됨");
                client.subscribe(`/subscribe/${studyId}`, onMessageReceived);
                client.subscribe(`/user/queue/messages`, onMessageReceived);
                console.log("🟢 연결됨", frame);
                console.log("헤더 목록:", frame.headers);
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
    }, [studyId, token]);

    const onMessageReceived = (message: IMessage) => {
        const body = JSON.parse(message.body);
        console.log("받은 메시지:", body);
    };

    const teamMembers: MemberType[] = [
        { id: 201, name: "오수보망" },
        { id: 202, name: "근의공식마스터밍디" },
        { id: 203, name: "자바몰이건재" },
        { id: 204, name: "토익100점달성하영" },
    ];

    const sendMessage = () => {
        if (!message.trim()) return;

        const client = clientRef.current;
        if (client && client.connected) {
            const msgPayload = {
                content: message,
                studyId,
                receiverId: whisperTarget?.id ?? null,
            };

            (client as any).send(
                `/publish/chat.send/${studyId}`,
                {},
                JSON.stringify(msgPayload),
            );

            setMessage("");
        } else {
            console.warn("웹소켓 연결이 아직 안 됐습니다.");
        }
    };

    return (
        <div className="fixed bottom-0 w-full bg-white px-4 pt-[11px] pb-8">
            <div className="relative flex items-end justify-between gap-3">
                {/* 귓속말 유저 선택 */}
                <div className="relative">
                    <button
                        onClick={openModal}
                        className={`flex h-9 w-14 cursor-pointer items-center justify-center rounded-2xl px-2 ${whisperTarget ? "bg-[var(--color-main600)]" : "bg-[var(--color-gray900)]"} `}
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
                                <ChatMemberList />
                            </div>
                        </div>
                    )}
                </div>

                {/* 입력창 */}
                <textarea
                    placeholder={
                        whisperTarget
                            ? ` ${teamMembers.find((m) => m.id === whisperTarget)?.name}님께 귓속말`
                            : "메세지 입력"
                    }
                    className={`max-h-20 w-[85%] resize-none overflow-y-scroll rounded-2xl py-[7px] pl-3.5 text-[var(--color-gray1000)] focus:outline-none ${whisperTarget ? "bg-[var(--color-main100)] placeholder:text-[#EAB3C1]" : "bg-[var(--color-gray200)] placeholder:text-[var(--color-gray500)]"}`}
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
                    <SendHorizontal className="text-[var(--color-gray500)] transition duration-200 ease-in-out hover:text-[var(--color-gray1000)]" />
                </button>
            </div>
        </div>
    );
}
