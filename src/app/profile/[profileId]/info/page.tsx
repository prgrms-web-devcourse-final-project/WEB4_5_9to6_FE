import MyInfoCard from "@/components/profile/info/MyInfoCard";
import MyInfoList from "@/components/profile/info/MyInfoList";

export default function page() {
    return (
        <>
            <div className="flex justify-center pt-15.5">
                <div className="h-[calc(100vh-134px)] w-screen overflow-hidden bg-white pb-4">
                    <MyInfoCard />
                    <MyInfoList />
                </div>
            </div>
        </>
    );
}
