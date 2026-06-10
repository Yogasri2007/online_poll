import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ labels, data }) {
  return (
    <Pie
      data={{ labels, datasets: [{ data, backgroundColor: ['#7C3AED', '#2563EB', '#06B6D4', '#EC4899', '#F97316'] }] }}
      options={{ responsive: true, plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } } }}
    />
  );
}
