// components/GaugeChart.tsx
"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type Props = {
  score: number; // nilai dari 0–100
  hight: number;
};

const GaugeChart: React.FC<Props> = ({ score, hight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  console.log("nilai hight -> ", hight);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const normalizedScore = Math.min(Math.max(score, 0), 100) / 100;

    const option: echarts.EChartsOption = {
      animationDuration: 2000,
      animationEasing: "cubicOut",
      series: [
        {
          type: "gauge",
          startAngle: 180,
          endAngle: 0,
          center: ["50%", "75%"],
          radius: "90%",
          min: 0,
          max: 1,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 6,
              color: [
                [0.59, "#FF6E76"],
                [0.79, "#FDDD60"],
                [1, "#7CFFB2"],
              ],
            },
          },
          pointer: {
            icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
            length: "12%",
            width: 20,
            offsetCenter: [0, "-60%"],
            itemStyle: { color: "auto" },
          },
          axisTick: {
            length: 12,
            lineStyle: { color: "auto", width: 2 },
          },
          splitLine: {
            length: 20,
            lineStyle: { color: "auto", width: 5 },
          },
          axisLabel: {
            color: "#464646",
            fontSize: 20,
            distance: -60,
            rotate: "tangential",
            formatter: function (value: number) {
              if (value === 90) return "Diterima";
              if (value === 70) return "Dipertimbangkan";
              if (value === 30) return "Ditolak";
              return "";
            },
          },
          title: {
            offsetCenter: [0, "-10%"],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, "-35%"],
            valueAnimation: true,
            formatter: function (value: number) {
              return Math.round(value * 100) + "";
            },
            color: "inherit",
          },
          data: [{ value: normalizedScore, name: "Overal Score" }],
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [score]);

  return (
    <div ref={chartRef} style={{ height: `${hight}px` }} className={`w-full`} />
  );
};

export default GaugeChart;
