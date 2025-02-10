import { useState, useEffect } from "react"

import productsData from '../../data/products'
import ProductCards from "./ProductCards"
import ShopFiltering from "./ShopFiltering"

const filters = {
    categories: ['ver tudo', 'acessórios', 'vestidos', 'jóias', 'cosméticos'],
    colors: ['ver tudo', 'preto', 'vermelho', 'dourado', 'azul', 'prata', 'bege', 'verde'],
    priceRanges: [
        { label: 'até R$50', min: 0, max: 50 },
        { label: 'R$50 - R$100', min: 50, max: 100 },
        { label: 'R$100 - R$200', min: 100, max: 200 },
        { label: 'acima de R$200', min: 200, max: Infinity },
    ]
}

const ShopPage = () => {
    const [products, setProducts] = useState(productsData)
    const [filtersState, setFiltersState] = useState({
        category: 'ver tudo',
        color: 'ver tudo',
        priceRange: ''
    })

    //filtering functions
    const applyFilter = () => {
        let filteredProducts = productsData
        //filter by category
        if (filtersState.category && filtersState.category !== 'ver tudo') {
            filteredProducts = filteredProducts.filter((product) => product.category === filtersState.category)

        }

        //filter by color
        if (filtersState.color && filtersState.color !== 'ver tudo') {
            filteredProducts = filteredProducts.filter((product) => product.color === filtersState.color)
        }

        //filter by price range
        if (filtersState.priceRange) {
            const [minPrice, maxPrice] = filtersState.priceRange.split('-').map(Number)
            filteredProducts = filteredProducts.filter((product) => product.price >= minPrice && product.price <= maxPrice)
        }

        setProducts(filteredProducts)

    }
    useEffect(() => {
        applyFilter()
    }, [filtersState])
    
    //clear the filters
   const clearFilters = () => {
        setFiltersState({
            category: 'ver tudo',
            color: 'ver tudo',
            priceRange: ''
        })
    }

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">página da loja</h2>
                <p className="section__subheader">Descubra as escolhas mais quentes: eleve seu estilo com a nossa coleção com curadoria de produtos de moda femininos de tendência.</p>
            </section>

            <section className="section__container">
                <div className="flex flex-col md:flex-row md:gap-12 gap-8">

                    {/* <!-- left side --> */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters} />
                    
                    {/* <!-- right side --> */}
                    <div>
                        <h3 className="text-1 font-medium mb-4">Produtos disponíveis:</h3>
                        <ProductCards products={products} />
                    </div>
                </div>
            </section>
        </>
    )

}

export default ShopPage