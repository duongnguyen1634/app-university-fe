import { useState } from "react";
import { Notify } from "../data/device";

function QuickNoti () {

        const [devicename,changename] = useState("Thiết bị 1");
        const [devicebehavior,changebehavior] = useState("thực hiện tưới tiêu");
        const [devicetime,changetime] = useState(new Date());
        const adjustTimeto = (hour: number, minute: number, second: number) => {
            const newTime = new Date();
            newTime.setHours(hour);
            newTime.setMinutes(minute);
            newTime.setSeconds(second);
            changetime(newTime);
          };

        class Cardinfo {
            devicename: string;
            devicebehavior: string;
            devicetime: Date;

            constructor(name: string, behavior: string, time: Date) {
                this.devicename = name;
                this.devicebehavior = behavior;
                this.devicetime = time;
            }
            getname() {
                return this.devicename;
            }
            getbehavior(){
                return this.devicebehavior;
            }
            gettime(){
                return this.devicetime;
            }
        }


        function DisplayCard(card: Cardinfo, index: number){
            return(
                <div key={index} className="bg-mau3 p-4 min-w-[15rem] h-25 flex flex-col rounded-3xl">
                    <h1 className=" font-josefin text-lg font-bold">
                        {card.devicename}
                    </h1>
    
                    <p className="font-dosis font-normal">
                        {card.devicebehavior} <br/> vào thời điểm  {card.devicetime.toLocaleTimeString()}
                    </p>
        
                </div>
            )
        }
    return(
        <div className="no-scrollbar flex flex-row gap-4 overflow-x-auto p-4 flex-nowrap overflow-x-scroll">
            {cardList.map((card, index) => DisplayCard(card, index))}
        </div>
    );
}

export default QuickNoti;