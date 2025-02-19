import { useState } from "react"
import { Link } from "react-router"

const Register = () => {
  const [message, setMessage] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()

    alert('Cadastro efetuado com sucesso')
    const data = {
      username,
      email,
      password
    }
  }

  return (
    <section className=" h-screen flex items-center justify-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="mb-2 text-2xl font-semibold pt-5">Cadastro</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">

          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="nome"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {
            message && <p className="text-red-500">{message}</p>
          }
          <button
            type='submit'
            className="w-full mt-5 bg-primary text-white login-btn font-medium
            py-3 rounded-md"
          >Cadastrar</button>
        </form>
        <p className="my-5 italic text-sm text-center">Já tenho uma conta?
          <Link to="/login" className="text-red-500 hover-lr-name"> Entrar</Link>.</p>

      </div>
    </section>
  )
}

export default Register