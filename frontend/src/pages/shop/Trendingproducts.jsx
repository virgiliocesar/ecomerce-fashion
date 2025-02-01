import { useState } from "react";
import ProductCards from "./ProductCards";

const Trendingproducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(8)
    const loadMoreProducts = () => {
        setVisibleProducts(preveCount => preveCount + 4)
    }

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Tendência de produtos</h2>
      <p className="section__subheader mb-12">
        Descubra as escolhas mais quentes: Eleve seu estilo com a nossa coleção
        com curadoria de produtos de moda feminina de tendência
      </p>

      {/* <!-- Product cards --> */}
      <ProductCards/>
    </section>
  );
};

export default Trendingproducts;
