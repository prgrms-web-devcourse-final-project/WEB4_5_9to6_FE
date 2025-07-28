import Image from "next/image";
import defaultImg from "../../../public/images/rewardItems/61.png";
import Button from "../common/Button";
import { getApplicants, respondToApplication } from "@/api/studies";
import { useParams } from "next/navigation";
import { customAlert } from "@/utils/customAlert";
import { useQuery } from "@tanstack/react-query";

export default function StudyApplicant({
    // applicants,
    maxMembers,
}: {
    // applicants: studyApplicant[];
    maxMembers: number;
}) {
    const params = useParams();
    const id = params?.studyId;
    const studyId = typeof id === "string" ? parseInt(id) : undefined;

    const { data: userDatas, refetch } = useQuery<studyApplicant[]>({
        queryKey: ["applicantsModal", studyId],
        queryFn: async () => {
            if (!studyId) throw new Error("스터디 아이디가 없습니다");
            return await getApplicants(studyId);
        },
        enabled: !!studyId,
    });
    const applicants = userDatas ?? [];
    const totalMembers = () => {
        return applicants.filter((a) => a.state === "ACCEPT").length + 1;
    };
    const noApplicants = () => {
        return applicants.every((a) => a.state !== "WAIT");
    };

    const allowHandler = async (memberId: number) => {
        if (!studyId) throw new Error("스터디 아이디가 없습니다.");
        try {
            if (totalMembers() >= maxMembers) {
                customAlert({
                    message: "스터디 최대 인원을 초과했습니다.",
                    linkLabel: "닫기",
                    onClick: () => {},
                });
                return;
            }
            await respondToApplication(studyId, memberId, "ACCEPT");
            await refetch();
            customAlert({
                message: "신청 승인했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } catch (error) {
            console.error("신청 승인 실패", error);
            customAlert({
                message: "에러가 발생했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };
    const rejectHandler = async (memberId: number) => {
        if (!studyId) throw new Error("스터디 아이디가 없습니다.");

        try {
            await respondToApplication(studyId, memberId, "REJECT");
            await refetch();

            customAlert({
                message: "신청 거절했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        } catch (error) {
            console.error("신청 승인 실패", error);
            customAlert({
                message: "에러가 발생했습니다.",
                linkLabel: "닫기",
                onClick: () => {},
            });
        }
    };
    return (
        <>
            <div className="relative min-h-[377px] w-full px-5">
                {applicants.length === 0 || noApplicants() ? (
                    <h5 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--color-gray500)]">
                        신청자가 없습니다.
                    </h5>
                ) : (
                    applicants.map(
                        (a) =>
                            a.state === "WAIT" && (
                                <div
                                    className="min-h-[128px] w-full border-b border-b-[var(--color-gray200)] py-5"
                                    key={a.name}
                                >
                                    <div className="flex h-auto w-full items-start gap-3">
                                        {/* 아바타 */}

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-[var(--color-gray100)]">
                                            <Image
                                                src={
                                                    a.avatarImage || defaultImg
                                                }
                                                alt="아바타"
                                                width={32}
                                                height={32}
                                            />
                                        </div>
                                        {/* 이름,하고싶은말 */}
                                        <div className="w-full">
                                            <h6 className="text-[var(--color-gray1000)]">
                                                {a.name}
                                            </h6>
                                            <p className="c1 mt-1 text-[var(--color-gray700)]">
                                                {a.introduction}
                                            </p>
                                        </div>
                                    </div>
                                    {/* 버튼 */}
                                    <div className="mt-[10px] flex h-8 w-full items-center justify-end gap-[6px]">
                                        <Button
                                            color="gray"
                                            className="b2 h-8 w-[57px]"
                                            onClick={() =>
                                                rejectHandler(a.memberId)
                                            }
                                        >
                                            거절
                                        </Button>
                                        <Button
                                            color="primary"
                                            className="b2 h-8 w-[57px]"
                                            onClick={() =>
                                                allowHandler(a.memberId)
                                            }
                                        >
                                            수락
                                        </Button>
                                    </div>
                                </div>
                            ),
                    )
                )}
            </div>
        </>
    );
}
