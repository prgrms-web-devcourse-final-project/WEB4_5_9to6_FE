import Gnb from "@/components/common/Gnb";
import Header from "@/components/common/Header";

export default function layout({
    children,
}: {
    children: Readonly<{
        children: React.ReactNode;
    }>;
}) {
    return (
        <>
            <Header>스터디 목록</Header>
            {children}
            <Gnb />
        </>
    );
}
