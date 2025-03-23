import React, { useEffect, useState } from 'react'
import { getBaseUrl } from '../utils/baseUrl';
import TimelineStep from './TimelineStep';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    if (sessionId) {
      fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error("Error confirming payment", err))
    }
  }, [])

  if (!order) { return <div>Loading...</div> }

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status)
  }

  const isCurrent = (status) => order.status === status;
  const steps = [
    {
      status: 'pending',
      label: 'Pendente',
      description: 'Seu pedido foi criado, aguarde  até que seja processado.',
      icon: { iconName: 'time-line', bgColor: 'red-500', textColor: 'gray-800' },
    },
    {
      status: 'processing',
      label: 'Processando',
      description: 'Seu pedido está sendo processado no momento.',
      icon: { iconName: 'loader-line', bgColor: 'yellow-800', textColor: 'yellow-800' },
    },
    {
      status: 'shipped',
      label: 'enviado',
      description: 'Seu pedido saiu para entrega.',
      icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-800' },
    },
    {
      status: 'completed',
      label: 'Completo',
      description: 'Seu pedido foi entregue com sucesso.',
      icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'green-900' },
    },
  ];

  return (
    <section className='section__container rounded p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Pagamento {order?.status}</h2>
      <p className='mb-4'>ID do pedido: {order?.orderId}</p>
      <p className='mb-8'>Status: {order?.status}</p>

      <ol className='sm:flex items-center relative'>
        {
          steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              order={order}
              isCompleted={isCompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === steps.length - 1}
              icon={step.icon}
              description={step.description}
            />
          ))
        }
      </ol>

    </section>
  )
}

export default PaymentSuccess