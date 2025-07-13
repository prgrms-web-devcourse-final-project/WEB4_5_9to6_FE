import SubHeader from "@/components/common/SubHeader";

export default function layout({
    children,
}: {
    children: Readonly<{
        children: React.ReactNode;
    }>;
}) {
    return (
        <>
            <SubHeader> 스터디 정보</SubHeader>
            {children}
        </>
    );
}
