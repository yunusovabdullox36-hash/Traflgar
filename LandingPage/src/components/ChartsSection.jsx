import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, Filler);

export default function ChartsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
  const data2024 = [320, 450, 380, 520, 490, 610, 580, 630, 720, 680, 750, 820];
  const data2025 = [480, 550, 620, 700, 680, 780];

  const lineData = {
    labels: months,
    datasets: [
      {
        label: '2024',
        data: data2024,
        borderColor: '#00B4D8',
        backgroundColor: 'rgba(0, 180, 216, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#00B4D8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
      {
        label: '2025',
        data: [...data2025, ...Array(6).fill(null)],
        borderColor: '#0B4F6C',
        backgroundColor: 'rgba(11, 79, 108, 0.1)',
        fill: true,
        tension: 0.4,
        borderDash: [5, 5],
        pointBackgroundColor: '#0B4F6C',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true, padding: 20, font: { family: 'Inter' } },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Inter' } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { family: 'Inter' }, callback: (val) => val.toLocaleString() },
      },
    },
  };

  const doughnutData = {
    labels: ['Kardiologiya', 'Nevrologiya', 'Terapiya', 'Pediatriya', 'Jarrohlik'],
    datasets: [
      {
        data: [35, 20, 25, 12, 8],
        backgroundColor: ['#00B4D8', '#48CAE4', '#0B4F6C', '#0077B6', '#90E0EF'],
        borderColor: '#fff',
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true, font: { family: 'Inter', size: 12 } },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleFont: { family: 'Inter' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <section id="charts" className="charts-section" ref={ref}>
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge">{t('charts.title')}</span>
          <h2 className="section-title">{t('charts.subtitle')}</h2>
        </motion.div>

        <div className="charts-grid">
          <motion.div
            className="chart-card chart-card-wide"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="chart-title">{t('charts.patientsTreated')}</h3>
            <div className="chart-wrapper">
              <Line data={lineData} options={lineOptions} />
            </div>
          </motion.div>

          <motion.div
            className="chart-card"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="chart-title">{t('charts.bySpecialty')}</h3>
            <div className="chart-wrapper chart-doughnut">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
