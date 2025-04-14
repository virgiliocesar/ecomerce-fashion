import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi'
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import UserStats from './UserStats';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
    const { user } = useSelector((state) => state.auth)
    const {data: stats, error, isLoading} = useGetUserStatsQuery(user?.email)
     console.log(stats);
    if (isLoading) return <div className='text-center text-gray-500'>Loading...</div>
    if (!stats) {
        return <div className='text-center text-gray-500'>No stats avaliable.</div>
    }
    const data = {
        labels: ["Pagamento total", "Total de Avaliações", "Total de compras"],
        datasets: [
            {
                label: "Dados do Usuário",
                data: [
                    stats.totalPaymentsAmount.toFixed(2) ?? 0,
                    stats.totalReviews * 100 ?? 0,
                    stats.totalPurchasedProducts * 100 ?? 0
                ],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {

                        return `${tooltipItem.label}: ${tooltipItem.raw}`;

                    }
                },
            },

        }
    }

  return (
      <div className='p-6'>
          <div>
              <h1 className='text-2xl font-semibold mb-4'>Painel de Usuário</h1>
              <p className='text-gray-500'>
                  Olá, {user?.username}! Bem - vindo ao seu painel de usuário
              </p>
          </div>
          <div>Status do usuário</div>
          <UserStats stats={stats}/>
          <div className=''>
              <Bar data={data} options={options} />
          </div>
      </div>
  )
}

export default UserDMain