import Button from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";

export default function notFound() {
    return (
        <>
            <div className="relative flex h-screen flex-col items-center justify-center">
                <div className="relative mb-[54px] aspect-[194/144] px-[83px]">
                    <Image
                        alt="404"
                        src="/images/not-found2.png"
                        sizes="144px"
                        fill
                        priority
                    />
                </div>

                <Link href="/">
                    <Button color="primary" className="mx-32.5 h-10 w-25">
                        go home
                    </Button>
                </Link>
            </div>
        </>
    );
}
