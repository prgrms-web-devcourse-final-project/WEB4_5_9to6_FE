import ChattingRoom from "@/components/chatting/ChattingRoom";
import MessageInput from "@/components/chatting/MessageInput";
import SubHeader from "@/components/common/SubHeader";

export default async function chatPage() {
    return (
        <>
            <SubHeader className="bg-[var(--color-gray200)]/85">
                그룹채팅
            </SubHeader>
            <div className="relative h-screen w-full overflow-y-auto bg-[var(--color-gray200)] px-5 pt-4 pb-22">
                <ChattingRoom />
            </div>
            <div className="absolute">
                <MessageInput />
            </div>
        </>
    );
}
