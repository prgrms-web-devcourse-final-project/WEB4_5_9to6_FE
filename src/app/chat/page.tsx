import ChattingRoom from "@/components/chatting/ChattingRoom";
import MessageInput from "@/components/chatting/MessageInput";
import NoticeBox from "@/components/common/NoticeBox";
import SubHeader from "@/components/common/SubHeader";

export default async function chatPage() {
    return (
        <>
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="relative h-screen overflow-y-auto bg-[var(--color-gray200)] px-4 pt-22.5 pb-22">
                <div className="absolute top-16 left-0">
                    <NoticeBox />
                </div>
                <ChattingRoom />
            </div>
            <div className="absolute">
                <MessageInput />
            </div>
        </>
    );
}
