"use client"

import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');

    const data = {
      labels: ['Entertainment', 'Food', 'Remaining Budget', 'others'],
      datasets: [{
        label: 'My Dataset',
        data: [10, 20, 30, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#808080'],
      }],
    };

    const config = {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
      },
    };

    const myChart = new Chart(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-8">User Dashboard</h2>
      <canvas ref={chartRef} className="w-full h-full max-w-[500px] max-h-[250px]"></canvas>
    </div>
  );
};

export default Dashboard;
