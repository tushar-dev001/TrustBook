import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

    const handleSubmit =(event)=>{
        console.log(event);
        event.preventDefault()
        const form = event.target
        const name = form.fullName.value
        const email = form.email.value
        const password = form.password.value
        console.log(name, email, password);
    }

  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Please Login now!</h1>
      
    </div>
    <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name='email' placeholder="email" className="input input-bordered" required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" name='password' placeholder="password" className="input input-bordered" required/>
          <label className="label flex-col">
            <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
            <Link to="/" className="label-text-alt link link-hover">Don't have an account?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login