import MyInfoCard from "@/components/profile/info/MyInfoCard";
import MyInfoList from "@/components/profile/info/MyInfoList";

export default function page() {
    return (
        <>
            <div className="flex justify-center pt-15.5">
                <div className="border-gray200 h-full w-90 overflow-hidden border bg-white pb-4">
                    <MyInfoCard />
                    <MyInfoList />
                </div>
            </div>
        </>
    );
}
