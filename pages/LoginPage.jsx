import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { toast, Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLogin(ev) {
    ev.preventDefault();
    const loadingToast = toast.loading('Logging in...');
    try {
      const { data } = await axios.post('/login', { email, password });
      toast.dismiss(loadingToast);
      toast.success('Login successful!');
      setUser(data);
      setRedirect(true);
    } catch (e) {
      toast.dismiss(loadingToast);
      if (e.response && e.response.data) {
        toast.error(e.response.data);
      } else {
        toast.error('Login failed');
      }
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <Toaster />
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <input type='email' placeholder='your@gmail.com' value={email} onChange={ev => setEmail(ev.target.value)} required />
          <input type='password' placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} required />
          <button className="primary" type="submit">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
