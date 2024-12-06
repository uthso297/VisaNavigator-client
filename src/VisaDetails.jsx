import { useLoaderData } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./ContextProviders/AuthProvider";
import LoadingSpinner from './LoadingSpinner';
import Swal from "sweetalert2";


const VisaDetails = () => {
    const loadedVisa = useLoaderData();
    const [showModal, setShowModal] = useState(false);
    const { user, loading } = useContext(AuthContext);

    if (loading || !user) {
        return (
            <LoadingSpinner></LoadingSpinner>
        );
    }

    const userId = user.uid;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const appliedDate = form.appliedDate.value;
        const fee = form.fee.value;

        const { countryName, countryImg, visaType, processingTime, validity, applicationMethod } = loadedVisa
        const applicantInfo = { firstName, lastName, email, appliedDate, fee, userId, countryName, countryImg, visaType, processingTime, validity, applicationMethod };

        // console.log("Form submission data:", applicantInfo);

        fetch('https://visa-navigator-server-iota.vercel.app/applicant', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(applicantInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.insertedId) {
                    // console.log('added visa');
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added your application',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    form.reset();
                }
            })
            .catch((error) => {
                alert(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an issue adding your application.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            });

        setShowModal(false);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Visa Information Display */}
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <img src={loadedVisa.countryImg} alt={loadedVisa.countryName} className="w-full h-96 rounded-lg mb-6" />
                <h2 className="text-3xl font-semibold text-gray-800">{loadedVisa.countryName}</h2>
                <p className="text-lg text-gray-600"><strong>Visa Type:</strong> {loadedVisa.visaType}</p>
                <p className="text-lg text-gray-600"><strong>Processing Time:</strong> {loadedVisa.processingTime}</p>
                <p className="text-lg text-gray-600"><strong>Age Restriction:</strong> {loadedVisa.ageRestriction}</p>
                <p className="text-lg text-gray-600"><strong>Description:</strong> {loadedVisa.description}</p>
                <p className="text-lg text-gray-600"><strong>Visa Fee:</strong> ${loadedVisa.fee}</p>
                <p className="text-lg text-gray-600"><strong>Application Method:</strong> {loadedVisa.applicationMethod}</p>

                <h3 className="mt-6 text-xl font-semibold text-gray-800">Required Documents:</h3>
                <ul className="list-disc pl-6">
                    {loadedVisa.requiredDocuments.map((doc, index) => (
                        <li key={index} className="text-lg text-gray-600">{doc}</li>
                    ))}
                </ul>
            </div>

            {/* Apply Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                >
                    Apply for the visa
                </button>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-2xl font-semibold text-gray-500">
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Apply for {loadedVisa.visaType}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Applied Date</label>
                                <input
                                    type="date"
                                    name="appliedDate"
                                    value={new Date().toISOString().split("T")[0]}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-700">Fee</label>
                                <input
                                    type="text"
                                    name="fee"
                                    value={`$${loadedVisa.fee}`}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                />
                            </div>
                            <div className="flex justify-center mt-4 space-x-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                                >
                                    Apply
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisaDetails;
