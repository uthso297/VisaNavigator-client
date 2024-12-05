import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ContextProviders/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

const MyAddedVisas = () => {
    const { user, loading } = useContext(AuthContext);
    const [visas, setVisas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/visa')
            .then(res => res.json())
            .then(data => setVisas(data));
    }, []);

    // If the user is not yet loaded or if loading is still true, we can return early and show a loading message.
    if (loading || !user) {
        return (
            <div className="container mx-auto p-6">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );
    }

    // Filter visas by the current user's UID only if the user is loaded
    const userVisas = visas.filter(visa => visa.userId === user.uid);

    return (
        <div className="container mx-auto p-6">
            <h3 className="text-2xl font-semibold text-center mb-8">Visas added by user: {user.displayName}</h3>

            {userVisas.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {userVisas.map((visa) => (
                        <div key={visa._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex justify-center mb-4">
                                <img
                                    src={visa.countryImg}
                                    alt={`${visa.countryName} flag`}
                                    className="h-32 w-32 object-cover rounded-full border-4 border-gray-300"
                                />
                            </div>
                            <h4 className="text-xl font-bold text-center text-gray-800 mb-2">{visa.countryName}</h4>
                            <p className="text-sm text-gray-600 mb-2">Visa Type: {visa.visaType}</p>
                            <p className="text-sm text-gray-600 mb-2">Processing Time: {visa.processingTime}</p>
                            <p className="text-sm text-gray-600 mb-2">Fee: ${visa.fee}</p>
                            <p className="text-sm text-gray-600 mb-2">Validity: {visa.validity}</p>
                            <p className="text-sm text-gray-600 mb-4">Application Method: {visa.applicationMethod}</p>

                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                    onClick={() => console.log('Update visa', visa._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                    onClick={() => console.log('Delete visa', visa._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">No visas found for this user.</p>
            )}
        </div>
    );
};

export default MyAddedVisas;
