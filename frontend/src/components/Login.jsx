import { useState } from "react"

const Login = () => {
  return (
      <section className=" h-screen flex items-center justify-center">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Login</h2>
              <form className="space-y-5 max-w-sm mx-auto p-8">
                  <input type="email" name="email" id="email" placeholder="Email"/>
                  <input type="password" name="password" id="password" placeholder="password"/>
              </form>
          </div>
    </section>
  )
}

export default Login