import ShopPurchaseModal from "@/components/rewardshop/ShopPurchaseModal";
import ShopCard from "@/components/rewardshop/ShopCard";
import ShopTabs from "@/components/rewardshop/ShopTabs";

export default async function page({
    params,
}: {
    params: Promise<{ rewardId: string }>;
}) {
    const { rewardId } = await params;

    return (
        <>
            <div className="flex h-screen items-center justify-center pt-15.5">
                <div className="bg-gray100 h-full w-screen overflow-hidden pb-4">
                    <ShopCard id={rewardId} />
                    <ShopTabs />
                    <ShopPurchaseModal id={rewardId} />
                </div>
            </div>
        </>
    );
}
