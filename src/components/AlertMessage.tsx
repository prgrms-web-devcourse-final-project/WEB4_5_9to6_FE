import { getValidAvatar } from "@/utils/studyDataMap";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function AlertMessage({ alarm }: { alarm: Alarm }) {
    dayjs.locale("ko");
    return (
        <>
            <div className="mx-5 flex w-[90%] py-3">
                <Link
                    href={`/profile/${alarm.senderId}`}
                    className="relative mt-1.5 mr-3.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gray100)]"
                >
                    <Image
                        src={getValidAvatar(alarm.senderAvatarImage)}
                        alt="avatar"
                        className="h-8 w-8 object-fill p-1"
                        fill
                    />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                    <p className="c1 text-[var(--color-gray500)]">
                        {dayjs(alarm.sentAt).format("A hh:mm")}
                    </p>
                    <div className="b2 cursor-pointer leading-tight break-words">
                        {alarm.type === "APPLY" && (
                            <>
                                <Link
                                    href={`/profile/${alarm.senderId}`}
                                    className="font-semibold"
                                >
                                    {alarm.senderNickname}
                                </Link>
                                님이{" "}
                            </>
                        )}
                        {alarm.resultStatus === null ? (
                            <Link href={`/study/${alarm.studyId}/manage`}>
                                {"'"}
                                {alarm.message.slice(
                                    alarm.senderNickname.length + 3,
                                    -15,
                                )}
                                {"'"}에 가입요청을 보냈습니다.
                            </Link>
                        ) : alarm.resultStatus === "ACCEPT" ? (
                            <Link href={`/study/${alarm.studyId}`}>
                                {alarm.message.slice(4).replace(/\[|\]/g, "'")}
                            </Link>
                        ) : (
                            <p>
                                {alarm.message.slice(4).replace(/\[|\]/g, "'")}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
