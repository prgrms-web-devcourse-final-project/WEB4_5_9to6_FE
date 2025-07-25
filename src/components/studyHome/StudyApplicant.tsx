import Image from "next/image";
import avatar from "@/assets/avatar.svg";
import Button from "../common/Button";

export default function StudyApplicant({
    applicant,
}: {
    applicant: {
        name: string;
        message: string;
    }[];
}) {
    return (
        <>
            <div className="relative min-h-[377px] w-full px-5">
                {applicant.length === 0 ? (
                    <h5 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gray500)]">
                        아직 신청자가 없습니다.
                    </h5>
                ) : (
                    applicant.map((a) => (
                        <div
                            className="min-h-[128px] w-full border-b border-b-[var(--color-gray200)] py-5"
                            key={a.name}
                        >
                            <div className="flex h-auto w-full items-start gap-3">
                                {/* 아바타 */}

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-gray100)]">
                                    <Image
                                        src={avatar}
                                        alt="아바타"
                                        className="h-8 w-8"
                                    />
                                </div>
                                {/* 이름,하고싶은말 */}
                                <div className="w-full">
                                    <h6 className="text-[var(--color-gray1000)]">
                                        {a.name}
                                    </h6>
                                    <p className="c1 mt-1 text-[var(--color-gray700)]">
                                        {a.message}
                                    </p>
                                </div>
                            </div>
                            {/* 버튼 */}
                            <div className="mt-[10px] flex h-8 w-full items-center justify-end gap-[6px]">
                                <Button
                                    color="gray"
                                    className="b2 h-8 w-[57px]"
                                >
                                    거절
                                </Button>
                                <Button
                                    color="primary"
                                    className="b2 h-8 w-[57px]"
                                >
                                    수락
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
