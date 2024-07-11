import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');

  async function registerUser(ev) {
    ev.preventDefault();
    setError('');
    const loadingToast = toast.loading('Registering...');
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      toast.dismiss(loadingToast);
      toast.success('Registered successfully');
      setRedirect(true);
    } catch (e) {
      toast.dismiss(loadingToast);
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
        toast.error(e.response.data.message);
      } else {
        setError('Registration failed');
        toast.error('Registration failed');
      }
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <Toaster />
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Your Name (John Doe)'
            value={name}
            onChange={ev => setName(ev.target.value)}
            required
          />
          <input
            type='email'
            placeholder='your@gmail.com'
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            required
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={ev => setPassword(ev.target.value)}
            required
          />
          <button className="primary" type="submit">Register</button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div className="text-center py-2 text-gray-500">
            Do you already have an account? <Link className="underline text-black" to={'/login'}>Login</Link><br />
          </div>
        </form>
        {redirect && <Navigate to="/login" />}
      </div>
    </div>
  );
}
