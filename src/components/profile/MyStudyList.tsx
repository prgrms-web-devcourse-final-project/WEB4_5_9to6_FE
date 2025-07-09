"use client";

export default function MyStudyList() {
    const myStudies = [
        "스터디내용1",
        "스터디내용2",
        "스터디내용3",
        "스터디내용4",
        "스터디내용5",
    ];
    // 아직 타입이 정해지지 않아 문자열 배열로 둚

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-4">
                {myStudies.length > 0 ? (
                    myStudies.map((v) => (
                        <div
                            key={v}
                            className="h-40 w-80 cursor-pointer rounded-2xl bg-white"
                        >
                            <p>{v}</p>
                        </div>
                    ))
                ) : (
                    <>
                        <p className="text-gray500 mt-10">
                            가입한 스터디가 없습니다
                        </p>
                    </>
                )}
            </div>
        </>
    );
}
