import ChangeNickname from "@/components/profile/info/ChangeNickname";

export default function page() {
    return (
        <>
            <div className="flex justify-center pt-15.5">
                <div className="border-gray200 h-[calc(100vh-134px)] w-90 overflow-hidden border bg-white pb-4">
                    <ChangeNickname />
                </div>
            </div>
        </>
    );
}
