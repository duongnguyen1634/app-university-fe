"use client";
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Graph({id, value, name}: {id: number; value: number; name: string}) {
    const [chartData, setChartData] = useState({
        labels: [new Date().toLocaleTimeString()], // Bắt đầu với thời gian hiện tại
        datasets: [
            {
                label: 'Random Dataset',
                data: [Math.floor(Math.random() * 101)], // Bắt đầu với 1 số ngẫu nhiên
                fill: false,
                borderColor: 'rgb(251, 255, 228)',
                tension: 0.4
            }
        ]
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const textColor = 'rgb(251, 255, 228)';
        const textColorSecondary = 'rgb(251, 255, 228)';
        const surfaceBorder = 'rgb(251, 255, 228)';

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                tooltip: {
                    enabled: true // Giữ tooltip nếu cần
                }
            },
            animation: false, // Tắt animation
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartOptions(options);

        // Cập nhật dữ liệu mỗi 5 giây
        const interval = setInterval(() => {
            setChartData((prevData) => {
                const newData = Math.floor(Math.random() * 101); // Tạo số ngẫu nhiên mới
                const newLabel = new Date().toLocaleTimeString(); // Lấy thời gian hiện tại làm nhãn

                // Cập nhật dữ liệu và nhãn mà không tạo lại toàn bộ đối tượng
                const updatedLabels = [...prevData.labels, newLabel];
                const updatedData = [...prevData.datasets[0].data, newData];

                // Giới hạn dữ liệu hiển thị tối đa 24 phần tử
                if (updatedLabels.length > 24) {
                    updatedLabels.shift(); // Xóa nhãn đầu tiên
                    updatedData.shift(); // Xóa dữ liệu đầu tiên
                }

                return {
                    ...prevData,
                    labels: updatedLabels,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: updatedData
                        }
                    ]
                };
            });
        }, 5000); // Cập nhật mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, []);

    return (
        <div className="bg-mau1 rounded-xl p-3">
            <div className='flex justify-between px-5'>
            <h2 className="font-josefin font-bold text-xl text-mau3">{name}</h2>
            <h2 className="font-josefin font-bold text-xl text-mau3">{value}</h2>
            </div>
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
}
