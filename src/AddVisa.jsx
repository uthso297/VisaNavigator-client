import Swal from 'sweetalert2'
const AddVisa = () => {

    const handleAddvisa = e => {
        e.preventDefault();
        const form = e.target;
        const countryImg = form.countryImage.value;
        const countryName = form.countryName.value;
        const visaType = form.visaType.value;
        const processingTime = form.processingTime.value;

        const requiredDocuments = Array.from(form.elements.requiredDocuments)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const description = form.description.value;
        const ageRestriction = form.ageRestriction.value;
        const fee = form.fee.value;
        const applicationMethod = form.applicationMethod.value;
        const validity = form.validity.value;

        const newVisa = {
            countryImg,
            countryName,
            visaType,
            processingTime,
            requiredDocuments,
            description,
            ageRestriction,
            fee,
            applicationMethod,
            validity
        };

        console.log(newVisa);

        fetch('http://localhost:5000/visa', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newVisa)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Added your Visa',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    form.reset();
                }
            })
    }


    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Add Visa Information</h2>
            <form onSubmit={handleAddvisa} className="space-y-6">
                {/* Country Image */}
                <div>
                    <label htmlFor="countryImage" className="block text-lg">Country Image</label>
                    <input
                        type="text"
                        name="countryImage"
                        placeholder="Paste country image URL here"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Country Name */}
                <div>
                    <label htmlFor="countryName" className="block text-lg">Country Name</label>
                    <input
                        type="text"
                        name="countryName"
                        placeholder="Enter country name"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Visa Type */}
                <div>
                    <label htmlFor="visaType" className="block text-lg">Visa Type</label>
                    <select
                        name="visaType"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    >
                        <option value="">Select Visa Type</option>
                        <option value="Tourist visa">Tourist visa</option>
                        <option value="Student visa">Student visa</option>
                        <option value="Official visa">Official visa</option>
                        <option value="Business visa">Business visa</option>
                    </select>
                </div>

                {/* Processing Time */}
                <div>
                    <label htmlFor="processingTime" className="block text-lg">Processing Time</label>
                    <input
                        type="text"
                        name="processingTime"
                        placeholder="Enter processing time"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Required Documents (Checkboxes) */}
                <div>
                    <label className="block text-lg">Required Documents</label>
                    <div className="space-y-2 mt-2">
                        {["Valid passport", "Visa application form", "Recent passport-sized photograph"].map((doc) => (
                            <div key={doc} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={doc}
                                    className="mr-2"
                                    name="requiredDocuments"
                                />
                                <label>{doc}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-lg">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter a description of the visa"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                        rows="4"
                    />
                </div>

                {/* Age Restriction */}
                <div>
                    <label htmlFor="ageRestriction" className="block text-lg">Age Restriction</label>
                    <input
                        type="number"
                        name="ageRestriction"
                        placeholder="Enter age restriction"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Fee */}
                <div>
                    <label htmlFor="fee" className="block text-lg">Fee</label>
                    <input
                        type="number"
                        name="fee"
                        placeholder="Enter visa fee"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Validity */}
                <div>
                    <label htmlFor="validity" className="block text-lg">Validity</label>
                    <input
                        type="text"
                        name="validity"
                        placeholder="Enter visa validity period"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Application Method */}
                <div>
                    <label htmlFor="applicationMethod" className="block text-lg">Application Method</label>
                    <input
                        type="text"
                        name="applicationMethod"
                        placeholder="Enter application method"
                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                    >
                        Add Visa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVisa;
