import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./ContextProviders/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { signInUser, handleGoogleLogin,setUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                form.reset();
                navigate('/');

            })
            .catch(error => {
                alert(error.message);
            });


    }

    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
                // console.log(result.user);
                const name = result.user.displayName;
                const email = result.user.email;
                const photo = result.user.photoURL;

                const newUser = { name, email, photo };

                fetch(`http://localhost:5000/users?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.length > 0) {
                            Swal.fire({
                                title: 'Welcome back!',
                                text: 'User login successful.',
                                icon: 'success',
                                confirmButtonText: 'Cool',
                            });
                            navigate('/');

                        } else {
                            fetch('http://localhost:5000/users', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(newUser),
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        Swal.fire({
                                            title: 'Success!',
                                            text: 'User created and logged in successfully.',
                                            icon: 'success',
                                            confirmButtonText: 'Cool',
                                        });
                                        navigate('/');

                                    } else {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'Failed to create user in the database.',
                                            icon: 'error',
                                            confirmButtonText: 'Try Again',
                                        });
                                    }
                                });
                        }
                    })
                    .catch(err => {
                        alert(err);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error checking the user in the database.',
                            icon: 'error',
                            confirmButtonText: 'Try Again',
                        });
                    });
            })
            .catch((err) => {
                alert(err.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error with your registration.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-600" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <button
                            type="button"
                            className="text-sm text-blue-500 hover:underline"
                            onClick={() => alert('Forgot password clicked')}
                        >
                            Forgot Password?
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
                {/* Register */}
                <p className="text-sm text-center mt-4">
                    Don&apos;t have an account?
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                        Register
                    </Link>
                </p>
                {/* Login with Google Button */}
                <button
                    onClick={handleGoogle}
                    className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                    <FaGoogle className="mr-3 text-xl" />
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
