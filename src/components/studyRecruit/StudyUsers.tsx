import avatar from "@/assets/avatar.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StudyUsers() {
    const users = [
        "삼성동오징어(나)",
        "대장동꼴뚜기",
        "미금역비둘기",
        "상봉동 오리아나",
        "역병괴수",
        "우라늄아이스크림",
    ];
    const router = useRouter();
    return (
        <>
            <div className="mt-6 px-5">
                <p className="c1 text-[var(--color-gray1000)]">
                    총 {users.length}명
                </p>
                <div className="mt-4 flex flex-col gap-[12px]">
                    {users.map((user) => (
                        <div
                            key={user}
                            className="flex h-12 w-full items-center justify-between"
                        >
                            <div className="flex items-center">
                                <div
                                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[16px] bg-[var(--color-gray100)]"
                                    onClick={() => router.push("/profile/info")}
                                >
                                    <Image
                                        src={avatar}
                                        alt="아바타"
                                        className="h-8 w-8"
                                    />
                                </div>
                                <h6 className="ml-[12px] flex items-center text-[var(--color-gray1000)]">
                                    {user}
                                </h6>
                            </div>
                            <span className="c1 flex items-center text-[#FF395C]">
                                스터디중
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
