import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const UserProfile = ({ user, updateUser }) => {
    const navigate = useNavigate();
    const { logout, deleteUser } = useContext(AuthContext);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);

    const handleEditClick = () => {
        updateUser({ email, password });
    };

    const handleLogoutClick = (e) => {
        logout();
        toast.success("Logged out successfully!");
        navigate('/');
    }

    const handleDeleteClick = () => {
        const confirm = window.confirm('Are you sure you want to delete your account?');
        if (!confirm) return;
        const deleteAccount = async () => {
            try {
                await deleteUser(user);
                toast.success('Account deleted successfully.');
                navigate('/');

            } catch (error) {
                toast.error("Error deleting account.");

            } finally {
                setLoading(false);
            }
        };
        deleteAccount();

    }

    return (
        <>
            <div className='bg-gray-700 border-t border-gray-400'>
                <div
                    className='h-screen lg:w-2/5 w-3/5 bg-gray-100 mx-auto py-5 px-10 border '>
                    <div>
                        <p className='my-10 text-xl font-bold text-gray-600'>Account Details</p>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="bg-gray-50 w-full text-gray-500 border rounded py-2 px-3 mb-2 cursor-not-allowed"
                            placeholder="Username"
                            value={user.username}
                            disabled
                            readOnly
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 w-full border border-gray-300 rounded py-2 px-3 mb-2"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="bg-gray-50 w-full border border-gray-300 rounded py-2 px-3 mb-2"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-gray-600 hover:bg-gray-800 text-white font-bold mt-5 mr-5 py-1 px-10 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleEditClick}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-gray-600 hover:bg-gray-800 text-white font-bold mt-5 py-1 px-10 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            onClick={handleLogoutClick}
                        >
                            Logout ╰➤🚪
                        </button>
                    </div>
                    <div className='mt-20'>
                        <button
                            className="bg-gray-400 text-white text-center font-bold py-1 px-4 rounded hover:bg-red-500 border border-2 border-red-700"
                            onClick={handleDeleteClick}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfile