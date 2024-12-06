import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "./ContextProviders/AuthProvider";

const AllVisas = () => {
    const loadedVisas = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [selectedVisaType, setSelectedVisaType] = useState("All");

    const handleVisaTypeChange = (event) => {
        setSelectedVisaType(event.target.value);
    };

    const filteredVisas = selectedVisaType === "All"
        ? loadedVisas
        : loadedVisas.filter(visa => visa.visaType === selectedVisaType);

    const handleDetails = () => {
        navigate('/login');
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Available Visas</h2>

            {/* Dropdown Menu for Visa Type Filter */}
            <div className="mb-8 flex justify-center">
                <select
                    value={selectedVisaType}
                    onChange={handleVisaTypeChange}
                    className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="All">All Visa Types</option>
                    {Array.from(new Set(loadedVisas.map(visa => visa.visaType))).map((visaType, index) => (
                        <option key={index} value={visaType}>{visaType}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredVisas.map((visa, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300">
                        <img src={visa.countryImg} alt={visa.countryName} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{visa.countryName}</h3>
                            <p className="text-sm text-gray-600">Visa Type: {visa.visaType}</p>
                            <p className="text-sm text-gray-600">Processing Time: {visa.processingTime}</p>
                            {
                                user ?
                                    (<Link to={`/visa-details/${visa._id}`}>
                                        <button
                                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                                        >
                                            See Details
                                        </button>
                                    </Link>)
                                    :
                                    (
                                        <button onClick={handleDetails}
                                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                                        >
                                            See Details
                                        </button>
                                    )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVisas;
