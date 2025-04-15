import { useSelector } from 'react-redux'
import { useState } from 'react'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import UploadImage from './UploadImage'
// import { useAddProductMutation } from '../../../../redux/features/products/productsApi'
import { useNavigate } from 'react-router'

const categories = [
    { label: "Selecione a Categoria", value: "" },
    { label: "Acessórios", value: "acessórios" },
    { label: "vestidos", value: "vestidos" },
    { label: "Jóias", value: "jóias" },
    { label: "Cosméticos", value: "cosméticos" },
    { label: "Cuidados com a pele", value: "cuidados com a pele" },
]

const colors = [
    { label: "Selecione a Cor", value: ""},
    { label: "preto", value: "preto"},
    { label: "branco", value: "branco"},
    { label: "vermelho", value: "vermelho"},
    { label: "dourado", value: "dourado"},
    { label: "azul", value: "azul"},
    { label: "prata", value: "prata"},
    { label: "bege", value: "bege"},
    { label: "verde",  value: "verde"},
]

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth)

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        color: "",
    })
    const [image, setImage] = useState('')
    // const [AddProduct, {isLoading, error}] = useAddProductMutation()
    const handleChange = (e) => {
        const { name, value } = e.target
        setProduct({
            ...product,
            [name]: value
        })
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.description || !product.color) {
            alert('Please fill all the required fields');
            return;
        }

        try {
            await AddProduct({ ...product, image, author: user?._id }).unwrap();
            alert('Product added successfully');
            setProduct({
                name: '',
                category: '',
                color: '',
                price: '',
                description: ''
            })
            setImage('');
            navigate("/shop")
        } catch (error) {
            console.log("Failed to submit product", error);
        }
    }

    return (
        <div className='container mx-auto mt-8'>
            <h2 className='text-2xl font-bold mb-6'>Adicionar Produto</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <TextInput
                    label="Nome do Produto"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nome do Produto"
                />

                <SelectInput
                    label="Categoria"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                <SelectInput
                    label="Color"
                    name="colors"
                    value={product.color}
                    onChange={handleChange}
                    options={colors}
                />
                <TextInput
                    label="Preço"
                    name="preço"
                    value={product.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="R$ 00,00"
                />
                <UploadImage
                    name="image"
                    id="image"
                    value={e => setImage(e.target.value)}
                    onChange={handleChange}
                    placeholder="Upload imagem"
                    setImage={setImage}
                />
            </form>
        </div>
    )
}
export default AddProduct