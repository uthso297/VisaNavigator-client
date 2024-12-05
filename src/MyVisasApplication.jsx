import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ContextProviders/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

const MyVisasApplication = () => {
    const { user, loading } = useContext(AuthContext);
    const [appliers, setAppliers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/applicant')
            .then(res => res.json())
            .then(data => setAppliers(data));
    }, []);

    if (loading || !user) {
        return (
            <div className="container mx-auto p-6">
                <LoadingSpinner />
            </div>
        );
    }

    const applicants = appliers.filter(applier => applier.userId === user.uid);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-8">My Visa Applications</h2>

            {applicants.length === 0 ? (
                <div className="text-center text-xl">You haven&apos;t applied for any visas yet.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applicants.map(applier => (
                        <div key={applier._id} className="visa-card border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                            <img src={applier.countryImg} alt={applier.country} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{applier.countryName}</h3>
                                <p className="text-gray-600">Visa Type: {applier.visaType}</p>
                                <p className="text-gray-600">Processing Time: {applier.processingTime}</p>
                                <p className="text-gray-600">Fee: {applier.fee}</p>
                                <p className="text-gray-600">Validity: {applier.validity}</p>
                                <p className="text-gray-600">Application Method: {applier.applicationMethod}</p>
                                <p className="text-gray-600">Applied On: {new Date(applier.appliedDate).toLocaleDateString()}</p>
                                <p className="text-gray-600">Applicant: {applier.firstName} {applier.lastName}</p>
                                <p className="text-gray-600">Email: {applier.email}</p>

                                <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full w-full">
                                    Cancel Application
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyVisasApplication;
