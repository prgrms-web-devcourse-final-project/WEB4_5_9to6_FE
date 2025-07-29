import Header from "@/components/common/Header";
import Gnb from "@/components/common/Gnb";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function page() {
    return (
        <>
            <Header notLogin={true}>마이 페이지</Header>
            <div className="flex justify-center">
                <div className="bg-gray100 flex min-h-screen w-screen flex-col items-center justify-center p-10">
                    <h5 className="text-gray1000">계정 로그인 후,</h5>
                    <h5 className="text-gray1000 mb-6">
                        나의 스터디 정보를 확인해보세요
                    </h5>
                    <Link href="/login">
                        <Button color="primary" className="w-30">
                            로그인
                        </Button>
                    </Link>
                </div>
            </div>
            <Gnb />
        </>
    );
}
