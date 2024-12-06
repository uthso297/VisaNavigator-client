import { useState, useEffect, useContext } from "react";
import Carousel from "./Carousel";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./ContextProviders/AuthProvider";

const Home = () => {
    const [visas, setVisas] = useState([]);
    const [theme, setTheme] = useState("light");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchVisas = async () => {
            try {
                const response = await fetch("https://visa-navigator-server-iota.vercel.app/visa-limited");
                const data = await response.json();
                setVisas(data);
            } catch (error) {
                console.error("Error fetching visa data:", error);
            }
        };

        fetchVisas();
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const navigate = useNavigate();

    const handleDetails = (id) => {
        if (user) {
            navigate(`/visa-details/${id}`)
        }
        else {
            navigate('/login')
        }
    }

    return (
        <div>
            {/* Header Section with VisaGate and Theme Toggle */}
            <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    A Visa Navigator Portal
                </div>

                {/* Theme Toggle Button beside VisaGate */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition duration-300"
                >
                    {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
                </button>
            </header>

            {/* Banner Section with Slider */}
            <Carousel />

            {/* Latest Visas Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Latest Visas</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {visas.map((visa) => (
                        <div
                            key={visa._id}
                            className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 dark:bg-gray-800"
                        >
                            <img
                                src={visa.countryImg}
                                alt={visa.countryName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{visa.countryName}</h3>
                                <p className="text-gray-600 mb-2 dark:text-gray-300">Visa Type: {visa.visaType}</p>
                                <p className="text-gray-600 mb-2 dark:text-gray-300">Processing Time: {visa.processingTime}</p>
                                <p className="text-gray-600 mb-2 dark:text-gray-300">Fee: {visa.fee} USD</p>
                                <p className="text-gray-600 mb-2 dark:text-gray-300">Validity: {visa.validity}</p>
                                <p className="text-gray-600 mb-4 dark:text-gray-300">Application Method: {visa.applicationMethod}</p>
                                <button
                                    onClick={() => handleDetails(visa._id)}
                                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                                >
                                    See Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to={'/all-visas'}>
                        <button
                            className="py-3 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
                        >
                            See all visas
                        </button>
                    </Link>
                </div>
            </section>

            {/* Visa Tips & Guides Section */}
            <section className="py-12 bg-white dark:bg-gray-800">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Visa Tips & Guides</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Document Checklist</h3>
                        <p className="text-gray-600 dark:text-gray-300">Ensure you have all the necessary documents before applying for a visa. This guide will help you keep track of your paperwork.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Visa Interview Tips</h3>
                        <p className="text-gray-600 dark:text-gray-300">Prepare for your visa interview with our tips on how to answer questions, dress appropriately, and what to expect during the process.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md dark:bg-gray-700 dark:text-white">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Common Visa Denial Reasons</h3>
                        <p className="text-gray-600 dark:text-gray-300">Learn about the most common reasons why visas get denied and how you can avoid these pitfalls during the application process.</p>
                    </div>
                </div>
            </section>

            {/* Top Destinations Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Top Destinations</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                        <img
                            src="https://i.ibb.co.com/9nFhMZ8/canada.jpg"
                            alt="Canada"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">Canada</h3>
                        <p className="text-gray-600 dark:text-gray-300">Explore one of the most diverse and welcoming countries in the world. Canada is perfect for students, tourists, and professionals alike.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                        <img
                            src="https://i.ibb.co.com/n1ZPQ3b/uk.jpg"
                            alt="United Kingdom"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">United Kingdom</h3>
                        <p className="text-gray-600 dark:text-gray-300">The UK offers endless opportunities, whether you&apos;re looking to study, work, or explore its rich history and culture.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
                        <img
                            src="https://i.pinimg.com/736x/ab/49/b6/ab49b62a3ffadcaab3ce9f044d681d82.jpg"
                            alt="USA"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white">United States</h3>
                        <p className="text-gray-600 dark:text-gray-300">The United States offers a variety of visa types for education, work, tourism, and permanent residency. Explore the land of opportunities.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
