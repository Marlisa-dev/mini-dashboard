import { useEffect, useState, useRef } from 'react';
import { getRealGDP } from '../../api/stocksApi';
import { Chart as ChartJs, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJs.register(...registerables);

const RealGDPChartTab = () => {

  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--grid-color').trim();
  const [gdpData, setGdpData] = useState({ labels: [], values: [] });
  const chartRef = useRef(null); // ✅ Ref to access the canvas for gradient

  useEffect(() => {
    const fetchGDP = async () => {
      try {
        const result = await getRealGDP();
        console.log('GDP Data:', result);

        if (result && result.data) {
          const labels = result.data.map(entry => entry.date).reverse();
          const values = result.data.map(entry => parseFloat(entry.value)).reverse();
          setGdpData({ labels, values });
        }
      } catch (error) {
        console.error('❌ Error fetching GDP data:', error.message);
      }
    };
    fetchGDP();
  }, []);

  const chartData = {
    labels: gdpData.labels,
    datasets: [
      {
        label: 'Real GDP - Annual - Units: Billions of Dollars',
        data: gdpData.values,
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
      <p style={{paddingBottom: '14px', margin: 'auto', fontSize: '18px', width: '75vw'}}>Real gross domestic product is an inflation-adjusted measure that reflects the value of all goods and services produced by an economy in a given year. Real GDP makes comparing GDP more meaningful because it shows comparisons for both the quantity and value of goods and services. <strong>- Investopedia</strong></p>
      {gdpData.labels.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
        <p>Loading GDP chart...</p>
      )}
    </div>
  );
};

export default RealGDPChartTab;