import { useState } from "react"
import { Link } from "react-router"

const Login = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()

    alert('Login successful')
    const data = {
      email,
      password
    }
  }

  return (
    <section className=" h-screen flex items-center justify-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2 className="mb-2 text-2xl font-semibold pt-5">Login</h2>
        <form onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3"/>
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
          >Login</button>
        </form>
        <p className="my-5 italic text-sm text-center">Não tenho uma conta?
          <Link to="/register" className="text-red-500 hover-lr-name"> Cadastrar </Link>aqui.</p>

      </div>
    </section>
  )
}

export default Login