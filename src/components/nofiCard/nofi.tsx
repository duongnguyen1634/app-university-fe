import Image from "next/image"

export default function NofiCard({ device }: { device: any }) {
    const imgsize = 30;
    return(
        <div className="flex bg-mau1 rounded-lg p-3 justify-start gap-2">
            {device.mode === "Tự động" ? (
                <Image alt="Warning" src="/icon/Warning.svg" width={imgsize} height={imgsize}/>
            ) : device.mode === "Thủ công" ? (
                <Image alt="Finger" src={"/icon/Finger.svg"} width={imgsize} height={imgsize} />
            ) : (
                <Image alt="Clock" src={"/icon/Clock.svg"} width={imgsize} height={imgsize} />
            )}
            
            <div className="flex flex-col ml-2 font-dosis text-mau3 ">
                <h4 className="text-lg"> Thiết bị {device.name} đã thực thi {device.action}</h4>
                <p className="text-sm"> {device.timenofication} </p>
            </div>
        </div>
    )
}
