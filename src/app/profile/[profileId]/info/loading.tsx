import SubHeader from "@/components/common/SubHeader";
import MyInfoLoading from "@/components/profile/info/MyInfoLoading";

export default function loading() {
    return (
        <>
            <SubHeader>내 정보 수정</SubHeader>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-62px)] w-screen overflow-hidden bg-white pb-4 dark:bg-[#222222]">
                    <MyInfoLoading />
                </div>
            </div>
        </>
    );
}
