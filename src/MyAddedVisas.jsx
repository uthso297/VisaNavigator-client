import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ContextProviders/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";
import Swal from "sweetalert2";

const MyAddedVisas = () => {
    const { user, loading } = useContext(AuthContext);
    const [visas, setVisas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedVisa, setSelectedVisa] = useState(null);
    const [updatedVisa, setUpdatedVisa] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/visa')
            .then(res => res.json())
            .then(data => setVisas(data));
    }, []);

    if (loading || !user) {
        return (
            <div className="container mx-auto p-6">
                <LoadingSpinner />
            </div>
        );
    }

    const userVisas = visas.filter(visa => visa.userId === user.uid);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This visa will be deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/visa/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your visa has been deleted.",
                                icon: "success"
                            });

                            const remainingVisas = visas.filter(visa => visa._id !== _id);
                            setVisas(remainingVisas);
                        }
                    });
            }
        });
    };

    const handleUpdate = (visa) => {
        setSelectedVisa(visa);
        setUpdatedVisa({
            ...visa
        });
        setShowModal(true); 
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedVisa(null); 
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUpdatedVisa(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSaveChanges = () => {
        fetch(`http://localhost:5000/visa/${selectedVisa._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedVisa),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Visa updated successfully") {
                    Swal.fire({
                        title: "Updated!",
                        text: "Your visa has been updated.",
                        icon: "success"
                    });

                    const updatedVisas = visas.map((visa) =>
                        visa._id === selectedVisa._id ? { ...visa, ...updatedVisa } : visa
                    );
                    setVisas(updatedVisas);
                    closeModal();
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error updating the visa.",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "An error occurred while updating the visa.",
                    icon: "error"
                });
                console.error("Error updating visa:", error);
            });
    };

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
                                    onClick={() => handleUpdate(visa)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors"
                                    onClick={() => handleDelete(visa._id)}
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

            {/* Modal for Update */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3">
                        <h3 className="text-2xl font-semibold text-center mb-4">Update Visa</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="countryName" className="block text-sm font-medium text-gray-700">Country Name</label>
                                <input
                                    type="text"
                                    id="countryName"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.countryName || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="visaType" className="block text-sm font-medium text-gray-700">Visa Type</label>
                                <input
                                    type="text"
                                    id="visaType"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.visaType || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="processingTime" className="block text-sm font-medium text-gray-700">Processing Time</label>
                                <input
                                    type="text"
                                    id="processingTime"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.processingTime || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="fee" className="block text-sm font-medium text-gray-700">Fee</label>
                                <input
                                    type="text"
                                    id="fee"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.fee || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="validity" className="block text-sm font-medium text-gray-700">Validity</label>
                                <input
                                    type="text"
                                    id="validity"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.validity || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="applicationMethod" className="block text-sm font-medium text-gray-700">Application Method</label>
                                <input
                                    type="text"
                                    id="applicationMethod"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={updatedVisa?.applicationMethod || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAddedVisas;


