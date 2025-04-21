"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import greenhouse1 from "../../../../public/image/greenhouse1.jpg";
import greenhouse2 from "../../../../public/image/greenhouse2.jpg";
import sensor from "../../../../public/image/sensor.png";
import logo from "../../../../public/image/4c629861-7991-447c-ba00-6aca97e09ebe-removebg-preview.png";
import { useTranslations } from "next-intl";
function MainHome() {
  const { data: session } = useSession();
  const { status } = useSession({
    required: false,
  });
  const t = useTranslations("HomePage");
  //@ts-ignore
  //sd ->session
    // <div
    //   className={`relative  mt-[80px]  font-poppins bg-cover  h-[calc(100vh-80px)] flex justify-start dark:pl-0 items-center bg-[url('https://www.sidechef.com/category/4c629861-7991-447c-ba00-6aca97e09ebe.jpg')] dark:bg-none  bg-[top_50%_right_0px]`}
    // >
    /*<div
        className={`relative mt-[80px] font-poppins bg-[#3D8D7A] h-[calc(100vh-80px)] flex justify-start dark:pl-0 items-center dark:bg-none bg-[top_50%_right_0px] bg-[#f0f0f0]`}
    >
      <h1 className="text-[#3D8D7A]-800  dark:text-gray-200 w-[650px] text-4xl font-bold mb-4 z-10 hidden xl:block xl:ml-[80px] 2xl:ml-[180px] ">
        { t("welcome_message")} }
        YoloFarm
      </h1>
      {/* <Image
        src={logo}
        className="absolute  hidden dark:block object-cover h-full w-full bg-[top_50%_right_0px]"
        alt=""
      /> }
      
    </div>*/
    return (
      <main className="mt-[80px] font-poppins bg-[#3D8D7A] text-[#FBFFE4] dark:text-gray-200">
        <section className="px-6 py-12 md:px-20 lg:px-32 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:flex-1">
            <h1 className="text-4xl font-bold mb-4">YoloFarm</h1>
            <p className="text-sm mb-6">Tất cả mọi thứ cho cây trồng của bạn</p>
            <p className="mb-6 text-sm">
              Cung cấp mọi thứ cho cây trồng một cách tự động bằng các thiết bị IOT. Nhờ sự chia sẻ dữ liệu mạnh mẽ trên nền tảng kết nối vạn vật, cộng với sự mềm dẻo của Trí tuệ nhân tạo, các ứng dụng hiện tại đang dần chuyển mình từ tự động (Automation) sang tự hành (Autonomous)
            </p>
            <button className="bg-[#FBFFE4] text-[#3D8D7A] font-semibold px-6 py-2 rounded-md hover:opacity-90 transition duration-200">
              BẮT ĐẦU
            </button>
          </div>
          <div className="md:flex-[2] rounded-xl overflow-hidden shadow-lg w-full">
            <Image
              src={greenhouse1}
              alt="greenhouse"
              width={800}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>
        </section>

  
        {/* Dự án */}
        <section className="px-6 py-12 md:px-20 lg:px-32">
          <h2 className="text-2xl font-bold mb-8">Về dự án</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 rounded-xl overflow-hidden shadow-lg w-full">
              <Image
                src={greenhouse2}
                alt="greenhouse"
                width={400}
                height={250}
                className="object-cover w-full h-auto"
              />
            </div>
            <div className="flex-1 space-y-6 w-full">
              {[1, 2, 3].map((_, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-lg">1. Lorem ipsum</h3>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Thiết bị */}
        <section className="px-6 py-12 md:px-20 lg:px-32">
          <h2 className="text-center text-2xl font-bold mb-8">Thông tin thiết bị</h2>
          <div className="flex gap-0 flex-nowrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-1 min-w-0">
                <Image
                  src={sensor}
                  alt={`sensor-${i}`}
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>

  
        {/* Về chúng tôi */}
        <section className="px-6 py-12 md:px-20 lg:px-32">
          <h2 className="text-2xl font-bold mb-8">Về chúng tôi</h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 space-y-6 text-sm">
              {[1, 2, 3].map((_, i) => (
                <div key={i}>
                  <h4 className="font-semibold">1. abc</h4>
                  <p>
                    text text text text text text text text text text text text text
                    text text text text text text text text text text text
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={greenhouse2}
                alt="greenhouse"
                width={400}
                height={250}
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
  );
}

export default MainHome;
