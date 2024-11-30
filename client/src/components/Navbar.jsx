import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/coding-icon.png';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const linkClass = ({ isActive }) => isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white px-3 py-1' : 'text-white hover:bg-gray-900 hover:text-white px-3 py-1';
    const { user } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-gray-700 pt-2">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div
                            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
                        >
                            <NavLink
                                className="flex flex-shrink-0 items-center mr-4"
                                to="/"
                            >
                                <img
                                    className="h-8 w-auto rounded-full bg-white"
                                    src={logo}
                                    alt="Let's Code"
                                />
                                <span className="md:block text-white text-2xl font-bold mx-4"
                                >
                                    Let's Code
                                    < span className='text-xs text-blue-300 block'>
                                        {!user
                                            ? ''
                                            : user.isAdmin && 'admin🔧'
                                        }
                                    </span>

                                </span>
                            </NavLink>
                            <div className="md:ml-auto">
                                <div className="flex space-x-2">
                                    <NavLink
                                        to="/"
                                        className={linkClass}
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/problems"
                                        className={linkClass}
                                    >
                                        Problems
                                    </NavLink>
                                    {!user
                                        ? (
                                            <>
                                                <NavLink
                                                    to="/login"
                                                    className={linkClass}
                                                >
                                                    Login
                                                </NavLink>
                                                <NavLink
                                                    to="/signup"
                                                    className={linkClass}
                                                >
                                                    Signup
                                                </NavLink>
                                            </>
                                        )
                                        : (
                                            <>
                                                {user.isAdmin &&
                                                    <NavLink
                                                        to="/problems/add"
                                                        className={linkClass}
                                                    >
                                                        Add Problem
                                                    </NavLink>
                                                }
                                                <NavLink
                                                    to="/submissions"
                                                    className={linkClass}
                                                >
                                                    Submissions
                                                </NavLink>
                                                <NavLink
                                                    to="/my-profile"
                                                    className={linkClass}
                                                >
                                                    🧑⚙️
                                                </NavLink>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Navbar;