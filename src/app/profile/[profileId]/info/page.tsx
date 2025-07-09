import MyInfoCard from "@/components/profile/info/MyInfoCard";
import MyInfoList from "@/components/profile/info/MyInfoList";

export default function page() {
    return (
        <>
            <div className="flex justify-center">
                <div className="border-gray200 min-h-screen w-90 border bg-white pb-4">
                    <MyInfoCard />
                    <MyInfoList />
                </div>
            </div>
        </>
    );
}
