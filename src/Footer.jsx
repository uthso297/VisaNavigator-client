import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-semibold mb-2">VisaGate</h2>
            <p className="text-lg">Your trusted visa partner for seamless travel.</p>
            <p className="mt-4 text-sm">&copy; 2024 VisaGate. All Rights Reserved.</p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Phone: +123 456 7890</p>
            <p className="text-sm mb-2">Email: support@visagate.com</p>
            <p className="text-sm">Address: 123 Visa St., Travel City, Country</p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-200 transition duration-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-200 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-200 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-gray-200 transition duration-300">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:text-gray-200 transition duration-300">About Us</a></li>
              <li><a href="/services" className="hover:text-gray-200 transition duration-300">Services</a></li>
              <li><a href="/blog" className="hover:text-gray-200 transition duration-300">Blog</a></li>
              <li><a href="/privacy-policy" className="hover:text-gray-200 transition duration-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
