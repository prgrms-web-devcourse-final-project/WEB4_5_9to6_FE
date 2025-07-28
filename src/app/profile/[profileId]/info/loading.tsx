import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function loading() {
    return (
        <>
            <div className="h-screen w-full">
                <LoadingSpinner />
            </div>
        </>
    );
}
