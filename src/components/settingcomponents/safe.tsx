import Image from "next/image";
import { useEffect, useState } from "react";

function Safe({
  device,
  onValueChange,
}: {
  device: {
    valueStart: number;
    valueEnd: number;
  };
  onValueChange: (newValueStart: number, newValueEnd: number) => void;
}) {
  const [valueStart, setValueStart] = useState<number>(device.valueStart);
  const [valueEnd, setValueEnd] = useState<number>(device.valueEnd);

  // Đồng bộ props từ cha nếu có thay đổi
  useEffect(() => {
    setValueStart(device.valueStart);
    setValueEnd(device.valueEnd);
  }, [device.valueStart, device.valueEnd]);

  const handleValueStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);
    if (Number.isInteger(numericValue)) {
      if (numericValue < valueEnd) {
        setValueStart(numericValue);
        onValueChange(numericValue, valueEnd);
      } else {
        alert("Giá trị bắt đầu phải nhỏ hơn giá trị kết thúc!");
      }
    }
  };

  const handleValueEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);
    if (Number.isInteger(numericValue)) {
      if (valueStart < numericValue) {
        setValueEnd(numericValue);
        onValueChange(valueStart, numericValue);
      } else {
        alert("Giá trị kết thúc phải lớn hơn giá trị bắt đầu!");
      }
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-1 py-3">
      <h2 className="font-josefin font-bold text-xl">Cài đặt an toàn:</h2>

      {/* Cài đặt giá trị start */}
      <div className="flex justify-between px-4">
        <div className="flex items-center">
          <span className="text-lg font-dosis text-black">Giá trị bắt đầu</span>
        </div>
        <div className="flex gap-3">
          <div className="bg-mau1 p-1 rounded-xl">
            <input
              type="number"
              value={valueStart}
              onChange={handleValueStartChange}
              className="bg-mau1 font-dosis text-mau3 text-xl w-10 h-10 text-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Image
              alt="Up"
              src="/icon/Up.svg"
              width={24}
              height={24}
              onClick={() => {
                const newValue = valueStart + 1;
                if (newValue < valueEnd) {
                  setValueStart(newValue);
                  onValueChange(newValue, valueEnd);
                } else {
                  alert("Giá trị bắt đầu phải nhỏ hơn giá trị kết thúc!");
                }
              }}
              className="cursor-pointer"
            />
            <Image
              alt="Down"
              src="/icon/Down.svg"
              width={24}
              height={24}
              onClick={() => {
                const newValue = Math.max(0, valueStart - 1);
                setValueStart(newValue);
                onValueChange(newValue, valueEnd);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Cài đặt giá trị end */}
      <div className="flex justify-between px-4 mt-2">
        <div className="flex items-center">
          <span className="text-lg font-dosis text-black">Giá trị kết thúc</span>
        </div>
        <div className="flex gap-3">
          <div className="bg-mau1 p-1 rounded-xl">
            <input
              type="number"
              value={valueEnd}
              onChange={handleValueEndChange}
              className="bg-mau1 font-dosis text-mau3 text-xl w-10 h-10 text-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Image
              alt="Up"
              src="/icon/Up.svg"
              width={24}
              height={24}
              onClick={() => {
                const newValue = valueEnd + 1;
                if (valueStart < newValue) {
                  setValueEnd(newValue);
                  onValueChange(valueStart, newValue);
                } else {
                  alert("Giá trị kết thúc phải lớn hơn giá trị bắt đầu!");
                }
              }}
              className="cursor-pointer"
            />
            <Image
              alt="Down"
              src="/icon/Down.svg"
              width={24}
              height={24}
              onClick={() => {
                const newValue = Math.max(0, valueEnd - 1);
                if (valueStart < newValue) {
                  setValueEnd(newValue);
                  onValueChange(valueStart, newValue);
                } else {
                  alert("Giá trị kết thúc phải lớn hơn giá trị bắt đầu!");
                }
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Safe;
