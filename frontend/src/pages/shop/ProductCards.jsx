import { Link } from "react-router";
import products from "../../data/products";

const ProductCards = () => {
  console.log(products);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="product__card">
          <div className="relative">
            <Link to={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h96 md:h-64 w-full objexct-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="hover:block absolute top-3 right-3">
                      <button><i className="ri-shopping-cart-line bg-primary p-1.5 text-white hover:bg-primary-dark"></i></button>
            </div>
          </div>
          <h4>{product.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
