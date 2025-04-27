import Image from "next/image";

interface NofiCardProps {
    device: {
        action: string;
        timenofication: string;
        read: boolean;
    };
    onDetailClick?: () => void; // Thêm prop onDetailClick
}

export default function NofiCard({ device, onDetailClick }: NofiCardProps) {
    const imgsize = 30;
    return (
        <div className="flex bg-mau1 rounded-lg p-3 justify-between items-center gap-2">
            <div className="flex items-center gap-2">
                {device.read === true ? (
                    <Image alt="Warning" src="/icon/Warning.svg" width={imgsize} height={imgsize} />
                ) : device.read === false ? (
                    <Image alt="Finger" src={"/icon/Finger.svg"} width={imgsize} height={imgsize} />
                ) : (
                    <Image alt="Clock" src={"/icon/Clock.svg"} width={imgsize} height={imgsize} />
                )}

                <div className="flex flex-col ml-2 font-dosis text-mau3">
                    <h4 className="text-lg">{device.action}</h4>
                    <p className="text-sm">{device.timenofication}</p>
                </div>
            </div>

            {/* Nút Chi tiết
            {onDetailClick && (
                <button
                    onClick={onDetailClick}
                    className="px-4 py-2 bg-[#FBFFE4] text-[#3D8D7A] rounded-lg transition duration-300"
                >
                    Chi tiết
                </button>
            )} */}
        </div>
    );
}
