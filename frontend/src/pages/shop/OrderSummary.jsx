import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { useNavigate } from 'react-router'; // Para redirecionar o usuário

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para redirecionamento

  // Seleciona os dados do carrinho do estado global
  const {
    selectedItems,
    totalPrice,
    tax,
    taxRate,
    grandTotalPrice
  } = useSelector((store) => store.cart);

  // Função para limpar o carrinho
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Função para ir para o checkout
  const handleCheckout = () => {
    if (selectedItems > 0) {
      navigate('/checkout'); // Redireciona para a página de checkout
    } else {
      alert("Seu carrinho está vazio!"); // Feedback para carrinho vazio
    }
  };

  return (
    <div className="bg-primary-light rounded text-base">
      <div className='px-6 py-4 space-y-5'>
        <h2 className='text-xl font-bold'>Order Summary</h2>
        <p className='mt-2'>Item selecionado: {selectedItems}</p>
        <p>Total: R${totalPrice.toFixed(2)}</p>
        <p>Tax ({taxRate * 100}%): R${tax.toFixed(2)}</p>
        <h3 className='font-bold'>Valor Final: R${grandTotalPrice.toFixed(2)}</h3>
        <div className='px-4 mb-6'>
          {/* Botão para limpar o carrinho */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita a propagação do evento
              handleClearCart();
            }}
            className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 cursor-pointer'
          >
            <span className='mr-2'>Limpar Carrinho</span>
            <i className='ri-delete-bin-7-line'></i>
          </button>

          {/* Botão para ir para o checkout */}
          <button
            onClick={handleCheckout}
            className='bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4 cursor-pointer'
          >
            <span className='mr-2'>Ir para Checkout</span>
            <i className='ri-bank-card-line'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;