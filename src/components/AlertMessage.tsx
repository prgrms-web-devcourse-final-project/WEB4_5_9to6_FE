import Image from "next/image";
import avatar from "../assets/avatar.svg";

export default function AlertMessage() {
    return (
        <>
            <div className="mx-5 flex w-full cursor-pointer py-3">
                <div className="mr-3.5 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-gray100)]">
                    <Image
                        src={avatar}
                        alt="avatar"
                        className="h-8 w-8 object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="c1 text-[var(--color-gray500)]">방금전</p>
                    <p className="b2">
                        도라지매니아 님이 `모각코 스터디`에 가입요청을
                        보냈습니다
                    </p>
                </div>
            </div>
        </>
    );
}
