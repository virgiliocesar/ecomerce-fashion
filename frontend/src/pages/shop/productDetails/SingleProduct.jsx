import { Link, useParams } from "react-router"
import RatingStars from './../../../components/RatingStars';

const SingleProduct = () => {
    const { id } = useParams()

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
                        <img src="https://images.unsplash.com/photo-1631097969294-c38afba59496?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <h3 className="text-2xl font-semibold mb-4">{"Nome do produto"}</h3>
                        <p className="text-xl text-primary mb-4">R$100 <s>R$130</s></p>
                        <p className="text-gray-400 mb-4">Descrição do produto</p>

                        {/* aditional Product information */}
                        <div className="mb-4">
                            <p><strong>Category: </strong>acessories</p>
                            <p><strong>Color: </strong>bage</p>
                            <div className="flex gap-1 items-center">
                                <strong>Avaliação: </strong>
                                <RatingStars rating={"4"} />
                            </div>
                            
                        </div>
                        <button className="btn">Comprar</button>
                    </div>
                </div>
            </section>

            {/* display reviews */}
            {/* TODO: work wth reviews when weill have them */}
            <section className="section__container">
                Revisões aqui sp
            </section>
        </>

    )
}

export default SingleProduct