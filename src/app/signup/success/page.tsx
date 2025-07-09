import Button from "@/components/common/Button";
import Link from "next/link";

export default function Success() {
    return (
        <>
            <div className="flex h-[calc(100%-130px)] w-full flex-col items-center justify-center">
                <img src="/images/signup.png" className="w-[40%]" />
                <h1 className="mt-[-10px] mb-4 cursor-default text-[24px] font-semibold">
                    회원가입이 완료되었어요
                </h1>
                <p className="h6 cursor-default text-center leading-[1.5] text-[var(--color-gray600)]">
                    로그인 후 스타디움과 함께
                    <br />
                    열심히 공부해요!
                </p>
            </div>
            <div className="mb-5 flex h-[130px] flex-col gap-2.5 px-5">
                <Link href="/login">
                    <Button>로그인</Button>
                </Link>
                <Link href="/">
                    <Button color="gray">홈으로</Button>
                </Link>
            </div>
        </>
    );
}
