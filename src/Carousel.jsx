import { useState, useEffect } from "react";

const slides = [
    {
        title: "Visa Application Made Easy",
        description:
            "Our Visa Navigator Portal simplifies your application process with step-by-step guidance and updates.",
        img: "https://i.ibb.co.com/8s18krN/visa1.jpg", 
    },
    {
        title: "Track Your Application Status",
        description:
            "Stay up-to-date with real-time updates on your visa application status. No more waiting in the dark.",
        img: "https://i.ibb.co.com/8gJg3Ld/resume-genius-9si2no-VCVH8-unsplash.jpg", 
    },
    {
        title: "Global Visa Information",
        description:
            "Get the most accurate and up-to-date information about visa requirements for countries all over the world.",
        img: "https://i.ibb.co.com/Qf7cgjC/julentto-photography-CIuak-YIjadc-unsplash.jpg", 
    },
];

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="relative">
            <div className="overflow-hidden rounded-lg">
                <div className="flex transition-transform duration-500 ease-in-out transform" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="bg-gray-100 p-6">
                                <img src={slide.img} alt={slide.title} className="w-full h-64 object-cover rounded-lg" />
                                <h2 className="text-2xl font-semibold mt-4">{slide.title}</h2>
                                <p className="text-gray-700 mt-2">{slide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
            >
                &#60;
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200"
            >
                &#62;
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
