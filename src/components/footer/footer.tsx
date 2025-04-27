import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FBFFE4] dark:bg-[#9e9e9e] text-[#3D8D7A] dark:text-gray-200 py-6 px-4 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center text-sm md:text-base gap-4">
        <div className="text-center md:text-left">
          <p className="font-semibold mb-1">
            Thực tập Đồ án môn học Đa ngành - Hướng Công nghệ phần mềm
          </p>
          <p>Trường Đại học Bách khoa - Đại học Quốc gia TP.HCM</p>
        </div>
        <div className="text-center md:text-right">
          <p className="font-semibold mb-1">Thông tin liên hệ:</p>
          <p>SĐT: 0339509610</p>
          <p>Email: thinh.huynh@hcmut.edu.vn</p>
          <p>
            Facebook:{" "}
            <a
              href="https://www.facebook.com/hq.thinh.3"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#2c6d5e]"
            >
              hq.thinh.3
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
