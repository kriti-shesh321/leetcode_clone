import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/images/coding-icon.png';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            toast.success('Login Successful.');
            return navigate('/problems');
        } catch (error) {
            toast.error("Login failed, please try again!");
        }
    };
    return (
        <>
            <section className="bg-gray-800 border-gray-100">
                <div className="container h-screen p-10 mx-auto max-w-lg">
                    <div
                        className="bg-gray-300 px-6 py-10 shadow-md border md:m-0"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className='text-center'>
                            <div>
                                <img
                                    className="h-10 w-auto rounded-full bg-white mx-auto"
                                    src={logo}
                                    alt="React Jobs"
                                />
                                <p className='mb-20 mt-2 text-xl'>Let's Code</p>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border rounded w-3/5 py-2 px-3 mb-2"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border rounded w-3/5 py-2 px-3 mb-2"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button
                                    className="bg-gray-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-3/5 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                            <div className='mt-20'>
                                <p className='my-1 text-gray-500'>Don't have an account?</p>
                                <Link
                                    to="/signup"
                                    className="bg-gray-400 text-white text-center py-1 px-3 rounded hover:bg-gray-500"
                                >
                                    Signup
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
export default LoginPage;