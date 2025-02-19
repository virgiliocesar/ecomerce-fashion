import { Link, useParams } from "react-router"; // Corrigi o import para "react-router-dom"
import RatingStars from './../../../components/RatingStars';
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import products from '../../../data/products';

const SingleProduct = () => {
    const { id } = useParams(); // Obtém o ID do produto da URL
    const dispatch = useDispatch();

    const product = products.find((p) => p.id === parseInt(id));

    // Se o produto não for encontrado, exibe uma mensagem
    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">página de produto único</h2>

                <div className="section__subheader space-x-2">
                    <span className="hover-text-primary">
                        <Link to="/">Home</Link>
                        <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="hover-text-primary">
                        <Link to="/shop">Shop</Link>
                        <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <span className="hover-text-primary">
                        página do produto
                    </span>
                </div>
            </section>

            <section className="section__container">
                {/* single product */}
                <div className="flex flex-col items-center md:flex-row gap-8">
                    <div className="md:w-1/2 w-full">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                        <p className="text-xl text-primary mb-4">
                            R${product.price.toFixed(2)} {/* Formata o preço com 2 casas decimais */}
                            {product.oldPrice && ( // Exibe o preço antigo se existir
                                <s>R${product.oldPrice.toFixed(2)}</s>
                            )}
                        </p>
                        <p className="text-gray-400 mb-4">{product.description}</p>

                        {/* Informações adicionais do produto */}
                        <div className="mb-4">
                            <p><strong>Categoria: </strong>{product.category}</p>
                            <p><strong>Cor: </strong>{product.color}</p>
                            <div className="flex gap-1 items-center">
                                <strong>Avaliação: </strong>
                                <RatingStars rating={product.rating} />
                            </div>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="btn"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            </section>

            {/* Exibir avaliações */}
            <section className="section__container">
                <h3 className="text-2xl font-semibold mb-4">Avaliações</h3>
                {/* TODO: Adicionar funcionalidade de avaliações */}
                <p>Nenhuma avaliação disponível no momento.</p>
            </section>
        </>
    );
};

export default SingleProduct;