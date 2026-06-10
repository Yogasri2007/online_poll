import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart({ labels, data }) {
  return (
    <Bar
      data={{ labels, datasets: [{ label: 'Votes', data, backgroundColor: '#4F46E5' }] }}
      options={{ responsive: true, plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: true } } }}
    />
  );
}
