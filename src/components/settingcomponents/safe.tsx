import Image from "next/image";
import { useState } from "react";

// Chỉnh sửa props để bao gồm cả onValueChange
function Safe({
  device,
  onValueChange, // Hàm để cập nhật giá trị từ component cha
}: {
  device: {
    valueStart: number;
    valueEnd: number;
  };
  onValueChange: (newValueStart: number, newValueEnd: number) => void; // Thêm kiểu cho onValueChange
}) {
  const [valueStart, setValueStart] = useState<number>(device.valueStart);
  const [valueEnd, setValueEnd] = useState<number>(device.valueEnd);

  // Hàm xử lý thay đổi giá trị start
  const handleValueStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);
    if (Number.isInteger(numericValue)) {
      setValueStart(numericValue);
      onValueChange(numericValue, valueEnd); // Gọi hàm onValueChange để thông báo thay đổi
    }
  };

  // Hàm xử lý thay đổi giá trị end
  const handleValueEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);
    if (Number.isInteger(numericValue)) {
      setValueEnd(numericValue);
      onValueChange(valueStart, numericValue); // Gọi hàm onValueChange để thông báo thay đổi
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
                setValueStart(newValue);
                onValueChange(newValue, valueEnd); // Cập nhật giá trị khi click
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
                onValueChange(newValue, valueEnd); // Cập nhật giá trị khi click
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Cài đặt giá trị end */}
      <div className="flex justify-between px-4">
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
                setValueEnd(newValue);
                onValueChange(valueStart, newValue); // Cập nhật giá trị khi click
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
                setValueEnd(newValue);
                onValueChange(valueStart, newValue); // Cập nhật giá trị khi click
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
