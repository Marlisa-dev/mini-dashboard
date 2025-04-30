import { useEffect, useState, useRef } from 'react';
import { getInflationRates } from '../../api/stocksApi';
import { Chart as ChartJs, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJs.register(...registerables);

const InflationChartTab = () => {

  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();
  const [inflationData, setInflationData] = useState({ labels: [], values: [] });
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchInflationData = async () => {
      try {
        const result = await getInflationRates();
        console.log("GDP Data:", result);

        if (result && result.data) {
          const labels = result.data.map(entry => entry.date).reverse();
          const values = result.data.map(entry => parseFloat(entry.value)).reverse();
          setInflationData({ labels, values})
        }
      } catch (error) {
        console.error('❌ Error fetching Inflation data:', error.message);
      }
    }
    fetchInflationData();
  }, []);


  const chartData = {
    labels: inflationData.labels,
    datasets: [
      {
        label: 'Inflation - US Consumer Prices',
        data: inflationData.values,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
    
          if (!chartArea) {
            return null;
          }
    
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(38, 201, 142, 0.5)');
          gradient.addColorStop(1, 'rgba(38, 201, 142, 0)');
          return gradient;
        },
        borderColor: '#26c98e',
        tension: 0.3,
        responsive: true,
        maintainAspectRatio: false, // ✅ VERY IMPORTANT

        // ✅ Hover and point styling here:
        pointBackgroundColor: '#26c98e',  // Color of points
        pointBorderColor: '#ffffff',      // White border around point
        pointRadius: 3,                   // Default point size
        pointHoverRadius: 7,              // Size when hovering
        pointHoverBackgroundColor: '#ffffff', // Invert color on hover if you want
        pointHoverBorderColor: '#26c98e',      // Outline color when hovered
        pointHoverBorderWidth: 2,
      },
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      // title: { display: true, text: 'Real GDP Over Time' },
    },
    scales: {
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          callback: function (value) {
            return '$' + value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div style={{ padding: '1rem', height: '560px', marginBottom: '2.8rem' }}>
      <p style={{paddingBottom: '14px', margin: 'auto', fontSize: '18px', width: '75vw'}}>Inflation is the gradual loss of purchasing power, reflected in a broad rise in prices for goods and services. High rates of inflation reflected in your bills—from groceries to utilities to even higher mortgage payments.<strong>- McKinsey & Company</strong></p>
      {inflationData.labels.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <p>Loading Inflation Rates...</p>
      )}
    </div>
  )
}

export default InflationChartTab