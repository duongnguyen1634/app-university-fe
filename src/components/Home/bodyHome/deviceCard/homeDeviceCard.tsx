import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { device } from "@/components/data/device";

    function DisplayCard({device}: { device: { id: number, name: string,mode :string,status:boolean,value:number,measurement:string,action:string,startvalue:number,endvalue:number,starttime:string,endtime:string } }) {
        const [tile,changetile] = useState(device.name);
        const [number,changenumber] = useState(device.value);
        const [measurement,changemeasurement] = useState(device.measurement);
        const [id,changeid] = useState(device.id);
        const [mode,changemode] = useState(device.mode);
        const [doing,changedoing] = useState(device.action);
        const [startparameter,changestartparameter] = useState(device.startvalue);
        const [endparameter,changeendparameter] = useState(device.endvalue);
        const [starttime,changestarttime] = useState(device.starttime);
        const [endtime,changeendtime] = useState(device.endtime);
        return (
            <div className="my-3 mx-2 h-[210px] justify-evenly flex gap-3 p-3 bg-mau1 border-mau2 rounded-3xl border-4">
                <div className="flex flex-col gap-2 justify-evenly text-center w-fit px-1 py-5">
                    <h2 className="font-josefin font-bold text-xl text-mau3">{tile}</h2>
                    <div className="font-josefin font-bold text-7xl text-mau3">{number}</div>
                    <p className="font-josefin font-bold text-sm text-mau3">{measurement}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 justify-evenly px-3 text-center">
                        <h2 className="font-josefin font-bold text-xl text-mau3">{mode}</h2>
                        {device.mode === "Tự động" && (
                            <>
                                <p className="font-dosis font-light text-xl text-mau3">{doing} <br/> trong khoảng giá trị </p>
                                <p className="font-dosis font-light text-xl text-mau3">
                                    {startparameter} - {endparameter} {measurement}
                                </p>
                            </>
                        )}
                        {device.mode === "Lên lịch" && (
                            <>
                                <p className="font-dosis font-light text-xl text-mau3">{doing} <br/> trong khoảng thời gian </p>
                                <p className="font-dosis font-light text-xl text-mau3">
                                    {starttime} - {endtime}
                                </p>
                            </>
                        )}
                        {device.mode === "Thủ công" && (
                            <>
                                <p className="font-dosis font-light text-xl text-mau3">{doing} <br/> theo người dùng điều chỉnh </p>
                            </>
                        )}
                    </div>
                        <Link href={`/deviceSetting/${id}`} className="flex m-auto w-fit py-3 gap-3 rounded-2xl px-5 bg-mau3">
                            <Image alt="Setting" src={'/icon/Setting.svg'} width={24} height={24} />
                            <p className="font-josefin font-bold text-xl text-mau1">Cài đặt</p>
                        </Link>
                    </div>
            </div>
        );
    }

function Card() {
        return (
            <div className="bg-mau3 w-full rounded-t-xl flex flex-col">
                <>
                    {device.map((device) => (
                        <DisplayCard key={device.id} device={device} />
                    ))}
                </>
            </div>
        );

    
}

export default Card;