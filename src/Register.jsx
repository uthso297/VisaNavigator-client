import { useState, useContext } from "react";
import { AuthContext } from "./ContextProviders/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons

const Register = () => {
    const { createUser, handleGoogleLogin, setUser, updateUserProfile } = useContext(AuthContext);

    // State for password error
    const [passwordError, setPasswordError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photourl.value;
        const password = form.password.value;

        // Password Validation
        if (!validatePassword(password)) {
            // Show password error toast message
            toast.error("Password must have at least 6 characters, one uppercase letter, and one lowercase letter.");
            setPasswordError("Password does not meet criteria.");
            return;
        }

        // If password is valid, proceed with registration
        setPasswordError(""); // Clear error

        const newUser = { name, email, photo };

        console.log(newUser, password);

        createUser(email, password)
            .then((result) => {
                // Assuming user creation is successful
                console.log(result.user);
                setUser(result.user);

                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        // navigate("/");

                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

                // Now, proceed to create the user in your database
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'User Registration Successful',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                            form.reset();
                        } else {
                            // Handle the case when user creation fails on the backend
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed to create user in the database.',
                                icon: 'error',
                                confirmButtonText: 'Try Again'
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error creating user in the database:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'There was an error with your registration.',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                        });
                    });
            })
            .catch((error) => {
                console.log(error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error with your registration.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            });
    };

    const validatePassword = (password) => {
        // Password validation checks
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const minLength = password.length >= 6;

        return hasUpperCase && hasLowerCase && minLength;
    };

    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
                console.log(result.user)
                const name = result.user.displayName
                const email = result.user.email
                const photo = result.user.photoURL

                const newUser = { name, email, photo }

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'User Registration Successful',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            });
                        } else {
                            // Handle the case when user creation fails on the backend
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed to create user in the database.',
                                icon: 'error',
                                confirmButtonText: 'Try Again'
                            });
                        }
                    })

            })
            .catch((err) => {
                alert(err.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error with your registration.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Register for Our App</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Photo URL Input */}
                    <div>
                        <label htmlFor="photourl" className="block text-sm font-semibold text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            name="photourl"
                            placeholder="Enter your photo URL"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {/* Show error message if password is invalid */}
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>

                    {/* Already Registered */}
                    <p className="text-sm text-center mt-4">
                        Already registered?
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                            Login
                        </Link>
                    </p>
                </form>

                {/* Register with Google Button */}
                <button
                    onClick={handleGoogle}
                    className="w-full py-3 mt-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                    <FaGoogle className="mr-3 text-xl" />
                    Register with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
