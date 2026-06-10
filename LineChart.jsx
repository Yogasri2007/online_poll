import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart({ labels, data }) {
  return (
    <Line
      data={{ labels, datasets: [{ label: 'Trend', data, fill: true, backgroundColor: 'rgba(124,58,237,0.18)', borderColor: '#7C3AED', pointBackgroundColor: '#EC4899' }] }}
      options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: true } } }}
    />
  );
}
