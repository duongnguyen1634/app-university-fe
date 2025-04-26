import Image from "next/image";
import { useEffect, useState } from "react";

function Time({
  device,
  onTimeChange,
}: {
  device: { startTime: Date | null; endTime: Date | null };
  onTimeChange: (start: Date, end: Date) => void;
}) {
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newStart = new Date(device.startTime || new Date());
    newStart.setFullYear(year, month - 1, day);
    onTimeChange(newStart, device.endTime!);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newEnd = new Date(device.endTime || new Date());
    newEnd.setFullYear(year, month - 1, day);
    onTimeChange(device.startTime!, newEnd);
  };

  return (
    <div className="w-full h-fit flex flex-col gap-3 py-3">
      <h2 className="font-josefin font-bold text-xl">Cài đặt lên lịch:</h2>
      <div className="flex justify-center gap-3 px-3">
        <div className="bg-mau1 py-3 px-5 rounded-lg w-full">
          <input
            type="date"
            value={formatDate(device.startTime)}
            onChange={handleStartTimeChange}
            className="text-mau3 bg-mau1 font-dosis text-base"
          />
        </div>
        <Image alt="To" src={"/icon/To.svg"} width={24} height={24} />
        <div className="bg-mau1 py-3 px-5 rounded-lg w-full">
          <input
            type="date"
            value={formatDate(device.endTime)}
            onChange={handleEndTimeChange}
            className="text-mau3 bg-mau1 font-dosis text-base"
          />
        </div>
      </div>
    </div>
  );
}

export default Time;
