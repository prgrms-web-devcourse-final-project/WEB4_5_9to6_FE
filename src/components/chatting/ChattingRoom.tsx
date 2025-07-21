interface Chat {
    chat_id: number;
    room_id: number;
    receiver_id: number | null;
    sender_id: number;
    content: string;
    sent_at: string;
    activated: boolean;
}

interface MemberType {
    id: number;
    name: string;
}

export default async function ChattingRoom() {
    const teamMembers: MemberType[] = [
        { id: 201, name: "오수보망" },
        { id: 202, name: "근의공식마스터밍디" },
        { id: 203, name: "자바몰이건재" },
        { id: 204, name: "토익100점달성하영" },
    ];
    const myId = 201;
    // chat 더미데이터
    const dummyMessage: Chat[] = [
        {
            chat_id: 1,
            room_id: 1,
            receiver_id: null,
            sender_id: 201,
            content: "안녕하세요, 오늘 스터디 다들 가능하신가요?",
            sent_at: "08:10",
            activated: true,
        },
        {
            chat_id: 2,
            room_id: 1,
            receiver_id: null,
            sender_id: 202,
            content: "저는 10시부터 참여 가능합니다!",
            sent_at: "08:11",
            activated: true,
        },
        {
            chat_id: 3,
            room_id: 1,
            receiver_id: null,
            sender_id: 203,
            content: "오늘 미션 공유해주실 수 있나요?",
            sent_at: "08:12",
            activated: true,
        },
        {
            chat_id: 4,
            room_id: 1,
            receiver_id: null,
            sender_id: 201,
            content: "오늘은 알고리즘 문제 2개 풀기입니다!",
            sent_at: "08:12",
            activated: true,
        },
        {
            chat_id: 5,
            room_id: 1,
            receiver_id: null,
            sender_id: 204,
            content: "확인했습니다~ 다들 화이팅!",
            sent_at: "08:13",
            activated: true,
        },
        {
            chat_id: 6,
            room_id: 1,
            receiver_id: 201,
            sender_id: 203,
            content: "질문이 있는데 DFS랑 BFS 언제 쓰는지 헷갈려요 😥",
            sent_at: "08:15",
            activated: true,
        },
        {
            chat_id: 7,
            room_id: 1,
            receiver_id: 203,
            sender_id: 201,
            content: "BFS는 최단거리, DFS는 깊이 우선 탐색할 때 주로 써요!",
            sent_at: "08:15",
            activated: true,
        },
        {
            chat_id: 8,
            room_id: 1,
            receiver_id: 201,
            sender_id: 203,
            content: "오~ 설명 감사합니다 👍",
            sent_at: "08:16",
            activated: true,
        },
        {
            chat_id: 10,
            room_id: 1,
            receiver_id: null,
            sender_id: 201,
            content: "유어웰컴",
            sent_at: "08:28",
            activated: true,
        },
        {
            chat_id: 11,
            room_id: 1,
            receiver_id: null,
            sender_id: 203,
            content: "아니오? 싫은데요",
            sent_at: "08:18",
            activated: true,
        },
        {
            chat_id: 12,
            room_id: 1,
            receiver_id: null,
            sender_id: 202,
            content: "저사람 뭐야 (수근수근)",
            sent_at: "08:18",
            activated: true,
        },
        {
            chat_id: 13,
            room_id: 1,
            receiver_id: null,
            sender_id: 204,
            content: "저사람 뭐야 (수근수근)",
            sent_at: "08:18",
            activated: true,
        },
    ];

    const getNicknameById = (id: number | null) => {
        const member = teamMembers.find((m) => m.id === id);
        return member ? member.name : "알 수 없음";
    };
    return (
        <>
            <div className="h-fit w-full pt-20">
                {dummyMessage
                    .filter((msg) => {
                        if (msg.receiver_id === null) return true;
                        return (
                            msg.receiver_id === myId || msg.sender_id === myId
                        );
                    })
                    .map((msg) => {
                        const isMine = msg.sender_id === myId;
                        const isWhisper = msg.receiver_id !== null;

                        return (
                            <div
                                key={msg.chat_id}
                                className={`flex pt-3 ${isMine ? "justify-end" : "justify-start"}`}
                            >
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
                                                ? `${getNicknameById(msg.receiver_id)}님에게 귓속말`
                                                : `${getNicknameById(msg.sender_id)}님의 귓속말`}
                                        </p>
                                    )}
                                    {!isWhisper && !isMine && (
                                        <p className="c2 text-[var(--color-gray600)]">
                                            {getNicknameById(msg.sender_id)}
                                        </p>
                                    )}
                                    <div
                                        className={`flex gap-1 ${isMine ? "justify-start" : "flex-row-reverse justify-end"}`}
                                    >
                                        <p className="c2 flex items-end text-[var(--color-gray600)]">
                                            {msg.sent_at}
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
