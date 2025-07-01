import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';


const ContactInfo = () => {
    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Follow us on our social media channels to stay updated with the latest news and offerings.
            </p>
    
            <div className="flex justify-center space-x-6 mb-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="text-indigo-600 dark:text-yellow-400 w-8 h-8 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="text-indigo-600 dark:text-yellow-400 w-8 h-8 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-indigo-600 dark:text-yellow-400 w-8 h-8 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className="text-indigo-600 dark:text-yellow-400 w-8 h-8 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube className="text-indigo-600 dark:text-yellow-400 w-8 h-8 hover:scale-110 transition-transform" />
              </a>
            </div>
    
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-300">Email: <a href="mailto:info@learnmaster.com" className="text-indigo-600 dark:text-yellow-400">info@learnmaster.com</a></p>
            <p className="text-gray-600 dark:text-gray-300">Phone: <span className="text-indigo-600 dark:text-yellow-400">+1 (234) 567-8901</span></p>
          </div>
        </section>
      );
}

export default ContactInfo