import { Pie, Line } from 'react-chartjs-2'
import 'chart.js/auto'

const AdminStatsChart = ({ stats }) => {
    const pieData = {
        labels: ["Pedidos", "Produtos", "Avaliações", "Usuários"],
        datasets: [
            {
                label: "Produtos",
                data: [
                    stats?.totalOrders,
                    stats?.totalProducts,
                    stats?.totalReviews,
                    stats?.totalUsers,
                ],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",

                    ],
                hoverBackgroundColor: [
                    [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",

                    ],
                ],
            },
        ],
    }
    const data = new Array(12).fill(0)
    //map correct months
    stats?.monthlyEarnings.forEach((entry) => {
        data[entry.month - 1] = entry.earnings;
    })
    const lineData = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ],
        datasets: [
            {
                label: "Ganhos mensais",
                data,
                fill: false,
                backgroundColor: "#36A2EB",
                borderColor: "#36A2EB",
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        
    }
  return (
      <div className='mt-12 space-y-'>
          <h2 className='text-2xl font-semibold mb-4'>AdminStatsChart</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* pie chart */}
              <div className='max-h-96 md:h w-full'>
                  <Pie data={pieData} options={options} />
              </div>
              {/* line chart */}
              <div className='max-h-96 md:h-96 w-full'>
                  <Line data={lineData} options={options} />
              </div>
          </div>
          <div>
              <p className='text-center mt-6'>Feito com ❤️ por Virgílio </p>
          </div>
      </div>
  )
}

export default AdminStatsChart