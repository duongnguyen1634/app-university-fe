"use client";

import { Setting } from "@/components/data/device";

interface ModeProps {
  settings: Setting[];
  selectedSetting: Setting | null;
  onSelect: (setting: Setting) => void;
}

const Mode = ({ settings, selectedSetting, onSelect }: ModeProps) => {
  return (
    <div className="gap-2 flex flex-col">
      <div>
        <h2 className="font-josefin font-bold text-xl">Danh sách cài đặt:</h2>
      </div>

      <div className="my-2 space-y-2">
        <select
          value={selectedSetting?.id || ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selected = settings.find((setting) => setting.id === selectedId);
            if (selected) {
              onSelect(selected);
            }
          }}
          className="px-4 py-2 border-2 border-mau1 rounded-lg bg-white text-black font-josefin"
        >
          <option value="" disabled>
            Chọn cài đặt
          </option>
          {settings.map((setting, index) => (
            <option key={setting.id} value={setting.id}>
              Cài đặt {index + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Mode;
