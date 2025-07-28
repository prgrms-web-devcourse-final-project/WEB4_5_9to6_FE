import Image from "next/image";
import avatar from "../assets/avatar.svg";
import Link from "next/link";

export default function AlertMessage() {
    const userId = null;
    return (
        <>
            <div className="mx-5 flex w-[90%] py-3">
                <Link
                    href={`/profile/${userId}`}
                    className="mt-2 mr-3.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gray100)]"
                >
                    <Image
                        src={avatar}
                        alt="avatar"
                        className="h-8 w-8 object-cover"
                    />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                    <p className="c1 text-[var(--color-gray500)]">방금전</p>
                    <p className="b2 cursor-pointer leading-tight break-words">
                        <span className="font-semibold">도라지매니아</span>님이
                        `모각코 스터디`에 가입요청을 보냈습니다
                    </p>
                </div>
            </div>
        </>
    );
}
