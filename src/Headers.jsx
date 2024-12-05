import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './ContextProviders/AuthProvider';

const Headers = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        signOutUser();
    };

    const handleAddVisa = () => {
        navigate('/login')
    }

    const handleMyAddVisa = () => {
        navigate('/login')
    }

    const handleApplication = () => {
        navigate('/login')
    }

    return (
        <div>
            {/* Navbar container */}
            <nav className="bg-gray-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Website Logo/Name */}
                        <div className="flex-shrink-0 text-white text-xl font-semibold">
                            <a href="/">VisaGate</a>
                        </div>

                        {/* Hamburger Menu for Mobile */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Navbar Links */}
                        <div className="hidden lg:flex space-x-4">
                            <NavLink to={"/"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Home</NavLink>
                            <NavLink to={"/all-visas"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">All Visas</NavLink>


                            {
                                user ?
                                    (<NavLink to={"/add-visa"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Add Visa</NavLink>)
                                    :
                                    (<button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={handleAddVisa}>Add Visa</button>)
                            }


                            {
                                user ?
                                    (<NavLink to={"/added-visa"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">My Added Visas</NavLink>)
                                    :
                                    (<button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={handleMyAddVisa}>My Added Visas</button>)
                            }

                            {
                                user ?
                                    (<NavLink to={"/my-visa-application"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">My Visa Applications</NavLink>)
                                    :
                                    (<button className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium" onClick={handleApplication}>My Visa Applications</button>)
                            }


                            {user ? (
                                <div className="relative flex items-center space-x-3">
                                    {/* User Photo */}
                                    <img
                                        className="h-8 w-8 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-blue-500 cursor-pointer"
                                        src={user?.photoURL}
                                        alt="User"
                                    />

                                    {/* Username and Logout */}
                                    <div className="flex items-center space-x-2">
                                        <div className="hidden lg:block text-white text-sm">{user?.displayName}</div>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500 text-sm hover:text-red-400"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <NavLink to={"/login"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
                                    <NavLink to={"/register"} className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">Register</NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Visible on smaller screens) */}
            <div
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:hidden bg-gray-800 text-white`}
                name="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NavLink to={"/"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Home</NavLink>
                    <NavLink to={"/all-visas"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">All Visas</NavLink>

                    {
                        user ?
                            (<NavLink to={"/add-visa"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Add Visa</NavLink>)
                            :
                            (<button className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" onClick={handleAddVisa}>Add Visa</button>)
                    }


                    {
                        user ?
                            (<NavLink to={"/added-visa"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">My Added Visas</NavLink>)
                            :
                            (<button className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" onClick={handleMyAddVisa}>My Added Visas</button>)
                    }
                    {
                        user ?
                            (<NavLink to={"/my-visa-application"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">My Visa Applications</NavLink>)
                            :
                            (<button className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" onClick={handleApplication}>My Visa Applications</button>)
                    }

                    {user ? (
                        <div className="flex items-center justify-between space-x-2">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user?.photoURL}
                                alt="User"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm text-white">{user?.displayName}</span>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm text-red-500 hover:text-red-400"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <NavLink to={"/login"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</NavLink>
                            <NavLink to={"/register"} className="block text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">Register</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Headers;
