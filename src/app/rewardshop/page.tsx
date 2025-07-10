import Button from "@/components/common/Button";

export default function page() {
    return (
        <>
            <div className="flex justify-center">
                <div className="bg-gray100 flex min-h-screen w-screen flex-col items-center justify-center p-10">
                    <h5 className="text-gray1000">계정 로그인 후,</h5>
                    <h5 className="text-gray1000 mb-6">
                        리워드 상점을 이용해보세요
                    </h5>
                    <Button color="primary" className="w-30">
                        로그인
                    </Button>
                </div>
            </div>
        </>
    );
}
