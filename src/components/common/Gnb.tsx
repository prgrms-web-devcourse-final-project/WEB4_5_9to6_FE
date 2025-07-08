import { House, Store, ClipboardList, UserRound } from "lucide-react";

export default function Gnb() {
    return (
        <>
            <div className="bottom-0 h-18 w-full bg-[var(--color-gray300)]">
                <div className="mx-10 flex justify-between pt-4">
                    <div className="flex cursor-pointer flex-col items-center">
                        <House className="mb-1 justify-center text-[var(--color-gray1000)]" />
                        <p className="c2 text-[var(--color-gray1000)]">홈</p>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                        <ClipboardList className="mb-1 justify-center text-[var(--color-gray1000)]" />
                        <p className="c2 text-[var(--color-gray1000)]">
                            스터디 목록
                        </p>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                        <Store className="mb-1 justify-center text-[var(--color-gray1000)]" />
                        <p className="c2 text-[var(--color-gray1000)]">
                            리워드 상점
                        </p>
                    </div>
                    <div className="flex cursor-pointer flex-col items-center">
                        <UserRound className="mb-1 justify-center text-[var(--color-gray1000)]" />
                        <p className="c2 text-[var(--color-gray1000)]">
                            마이페이지
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
