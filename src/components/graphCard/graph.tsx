"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'primereact/chart';
import { DeviceData } from "@/components/data/device";

interface GraphProps {
  id: string;
  name: string;
  data: DeviceData[];
}

export default function Graph({ id, name, data = [] }: GraphProps) {
  const maxDataPoints = 10;
  const chartRef = useRef<Chart>(null);
  const [currentValue, setCurrentValue] = useState<number>(0);
  
  // Lấy 10 dữ liệu mới nhất và cập nhật giá trị hiện tại
  const getLatestData = () => {
    if (data.length === 0) return [];
    
    // Sắp xếp theo thời gian mới nhất
    const sortedData = [...data].sort((a, b) => 
      new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    
    // Cập nhật giá trị hiện tại (mới nhất)
    setCurrentValue(sortedData[0]?.value || 0);
    
    // Trả về 10 dữ liệu mới nhất (đã đảo ngược thứ tự)
    return sortedData.slice(0, maxDataPoints).reverse();
  };

  const [chartData, setChartData] = useState(() => {
    const latestData = getLatestData();
    return {
      labels: latestData.map(d => new Date(d.time).toLocaleTimeString()),
      datasets: [
        {
          label: name,
          data: latestData.map(d => d.value),
          fill: false,
          borderColor: 'rgb(251, 255, 228)',
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: 'rgb(251, 255, 228)'
        }
      ]
    };
  });

  const [chartOptions] = useState({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${name}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgb(251, 255, 228)',
          maxRotation: 0,
          autoSkip: true
        },
        grid: {
          color: 'rgba(251, 255, 228, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgb(251, 255, 228)'
        },
        grid: {
          color: 'rgba(251, 255, 228, 0.1)'
        }
      }
    },
    animation: {
      duration: 0
    }
  });

  useEffect(() => {
    const latestData = getLatestData();
    setChartData({
      labels: latestData.map(d => new Date(d.time).toLocaleTimeString()),
      datasets: [
        {
          ...chartData.datasets[0],
          data: latestData.map(d => d.value),
          label: name
        }
      ]
    });

    if (chartRef.current?.getChart()) {
      chartRef.current.getChart().update();
    }
  }, [data, name]);

  return (
    <div className="bg-mau1 rounded-xl p-3">
      <div className='flex justify-between items-center px-5 mb-2'>
        <h2 className="font-josefin font-bold text-xl text-mau3">{name}</h2>
        <div className="flex items-center">
          <span className="font-josefin font-bold text-2xl text-mau3 mr-2">
            {currentValue}
          </span>
          {/* Có thể thêm đơn vị đo lường nếu cần */}
        </div>
      </div>
      <Chart 
        ref={chartRef}
        type="line" 
        data={chartData} 
        options={chartOptions} 
        style={{ height: '250px' }}
      />
    </div>
  );
}