import { useState } from "react";

const modes = ["Tự động", "Thủ công"];

function Render({
  mode,
  setMode,
  setAuto,
}: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  setAuto: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="my-2">
      {modes.map((currentMode) => (
        <label key={currentMode} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value={currentMode}
            className="hidden peer"
            checked={mode === currentMode} // Chọn radio button khi mode trùng với giá trị hiện tại
            onChange={() => {
              setMode(currentMode); // Cập nhật mode khi người dùng chọn
              setAuto(currentMode === "Tự động"); // Cập nhật auto: true nếu chọn "Tự động", false nếu chọn "Thủ công"
            }}
          />
          <div className="w-5 h-5 border-2 border-mau1 rounded-full flex items-center justify-center peer-checked:bg-mau1">
            <div className="w-2.5 h-2.5 bg-mau3 rounded-full hidden peer-checked:block"></div>
          </div>
          <span className="text-black font-josefin text-base">{currentMode}</span>
        </label>
      ))}
    </div>
  );
}

function Mode({
  auto,
  setAuto,
}: {
  auto: boolean;
  setAuto: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [mode, setMode] = useState<string>(auto ? "Tự động" : "Thủ công"); // Thiết lập giá trị mode ban đầu

  return (
    <div className="gap-2 flex flex-col">
      <div>
        <h2 className="font-josefin font-bold text-xl">Chế độ:</h2>
      </div>
      {/* Truyền mode và setMode vào Render để render radio button */}
      <Render mode={mode} setMode={setMode} setAuto={setAuto} />
    </div>
  );
}

export default Mode;
