const UploadImage = ({ name, setImage }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const uploadImage = async ({name, setImage}) => {

    };

    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700 mb-2'>
                Upload da Imagem
            </label>

            <label
                htmlFor={name}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 cursor-pointer"
            >
                Selecionar Imagem
            </label>

            <input
                type="file"
                name={name}
                id={name}
                onChange={uploadImage}
                className="hidden"
            />

            {loading && (
                <div className='mt-2 text-sm text-blue-600'>Carregando Produto...</div>
            )}

            {url && (
                <div className='mt-4 text-sm text-green-600'>
                    <p>Imagem enviada com sucesso!</p>
                    <img src={url} alt="uploaded" className="mt-2 w-48 rounded-md shadow" />
                </div>
            )}
        </div>

    )
}

export default UploadImage