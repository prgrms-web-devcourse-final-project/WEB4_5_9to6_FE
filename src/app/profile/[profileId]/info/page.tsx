import SubHeader from "@/components/common/SubHeader";
import MyInfo from "@/components/profile/info/MyInfo";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    return (
        <>
            <SubHeader>내 정보 수정</SubHeader>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-134px)] w-screen overflow-hidden bg-white pb-4">
                    <MyInfo id={profileId} />
                </div>
            </div>
        </>
    );
}
