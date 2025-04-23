import { useState } from "react";

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

        const cardList = [
            new Cardinfo("Thiết bị 1", "đang tưới cây", new Date()),
            new Cardinfo("Thiết bị 2", "đang bật đèn", new Date()),
            new Cardinfo("Thiết bị 3", "đang đo nhiệt độ", new Date()),
            new Cardinfo("Thiết bị 4", "đang sạc pin", new Date()),
            new Cardinfo("Thiết bị 5", "đang chạy quạt", new Date()),
            new Cardinfo("Thiết bị 6", "đang lọc nước", new Date())
        ];
        

    
    
    return(
        <div className="no-scrollbar flex flex-row gap-4 overflow-x-auto p-4 flex-nowrap overflow-x-scroll">
            {cardList.map((card, index) => DisplayCard(card, index))}
        </div>
    );
}

export default QuickNoti;