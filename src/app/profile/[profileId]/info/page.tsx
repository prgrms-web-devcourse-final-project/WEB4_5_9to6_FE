import { fetchMemeberInfo } from "@/api/member";
import SubHeader from "@/components/common/SubHeader";
import MyInfoCard from "@/components/profile/info/MyInfoCard";
import MyInfoList from "@/components/profile/info/MyInfoList";

export default async function page({
    params,
}: {
    params: Promise<{ profileId: string }>;
}) {
    const { profileId } = await params;
    const { data } = await fetchMemeberInfo(Number(profileId));
    return (
        <>
            <SubHeader>내 정보 수정</SubHeader>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-134px)] w-screen overflow-hidden bg-white pb-4">
                    <MyInfoCard data={data} />
                    <MyInfoList data={data} />
                </div>
            </div>
        </>
    );
}
