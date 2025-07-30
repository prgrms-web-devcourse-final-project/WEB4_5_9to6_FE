import Gnb from "@/components/common/Gnb";
import Header from "@/components/common/Header";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header className="bg-[var(--color-gray100)] backdrop-blur-none">
                스터디 목록
            </Header>
            {children}
            <Gnb />
        </>
    );
}
