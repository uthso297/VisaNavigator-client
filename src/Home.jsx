import { useState, useEffect } from "react";
import Carousel from "./Carousel";
import { Link } from "react-router-dom";

const Home = () => {
    const [visas, setVisas] = useState([]); 

    
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

    return (
        <div>
            {/* Banner Section with Slider */}
            <Carousel />

            {/* Latest Visas Section */}
            <section className="py-12 bg-gray-50">
                <h2 className="text-3xl font-semibold text-center mb-8">Latest Visas</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {visas.map((visa) => (
                        <div
                            key={visa._id}
                            className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <img
                                src={visa.countryImg}
                                alt={visa.countryName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{visa.countryName}</h3>
                                <p className="text-gray-600 mb-2">Visa Type: {visa.visaType}</p>
                                <p className="text-gray-600 mb-2">Processing Time: {visa.processingTime}</p>
                                <p className="text-gray-600 mb-2">Fee: {visa.fee} USD</p>
                                <p className="text-gray-600 mb-2">Validity: {visa.validity}</p>
                                <p className="text-gray-600 mb-4">Application Method: {visa.applicationMethod}</p>
                                <button
                                    onClick={() => window.location.href = `/visa/${visa._id}`}
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
            <section className="py-12 bg-white">
                <h2 className="text-3xl font-semibold text-center mb-8">Visa Tips & Guides</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Document Checklist</h3>
                        <p className="text-gray-600">Ensure you have all the necessary documents before applying for a visa. This guide will help you keep track of your paperwork.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Visa Interview Tips</h3>
                        <p className="text-gray-600">Prepare for your visa interview with our tips on how to answer questions, dress appropriately, and what to expect during the process.</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Common Visa Denial Reasons</h3>
                        <p className="text-gray-600">Learn about the most common reasons why visas get denied and how you can avoid these pitfalls during the application process.</p>
                    </div>
                </div>
            </section>

            {/* Top Destinations Section */}
            <section className="py-12 bg-gray-50">
                <h2 className="text-3xl font-semibold text-center mb-8">Top Destinations</h2>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img
                            src="https://i.ibb.co.com/9nFhMZ8/canada.jpg"
                            alt="Canada"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">Canada</h3>
                        <p className="text-gray-600">Explore one of the most diverse and welcoming countries in the world. Canada is perfect for students, tourists, and professionals alike.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img
                            src="https://i.ibb.co.com/n1ZPQ3b/uk.jpg"
                            alt="United Kingdom"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">United Kingdom</h3>
                        <p className="text-gray-600">The UK offers endless opportunities, whether you&apos;re looking to study, work, or explore its rich history and culture.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <img
                            src="https://i.pinimg.com/736x/ab/49/b6/ab49b62a3ffadcaab3ce9f044d681d82.jpg"
                            alt="USA"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-4">United States</h3>
                        <p className="text-gray-600">The United States offers a variety of visa types for education, work, tourism, and permanent residency. Explore the land of opportunities.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
