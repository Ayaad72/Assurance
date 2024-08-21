import React from "react";
const ContactUs = () => {
  return (
    <div className="font-sans min-h-screen  flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-4">
          Let's <span className="text-bardum">Connect</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-700">
          Have questions or want to work together? Reach out to us, and we’ll be
          in touch soon!
        </p>
      </div>
      {/* Contact Form */}
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 sm:p-10 border-t-4 border-red-500">
        <form className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700"
              >
                First Name
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-bardum to-bardum rounded-lg p-[2px]"></div>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="relative w-full p-2 sm:p-3 outline-none bg-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2  "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-bardum to-bardum rounded-lg p-[2px]"></div>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="relative w-full p-2 sm:p-3 outline-none bg-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2  "
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-0 bg-gradient-to-r from-bardum to-bardum rounded-lg p-[2px]"></div>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="relative w-full p-2 sm:p-3 outline-none bg-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2  "
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700"
            >
              Message
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-0 bg-gradient-to-r from-bardum to-bardum rounded-lg p-[2px]"></div>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                className="relative w-full p-2 sm:p-3 outline-none bg-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2  "
              ></textarea>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-6 border border-gray-500 text-base sm:text-lg font-medium rounded-lg text-white bg-gradient-to-r from-gray-600 to-red-800 hover:from-bardum hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-all duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      {/* Additional Contact Information */}
      <div className="mt-16 max-w-3xl w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
          Contact Details
        </h2>
        <p className="text-bardum mb-8">
          Reach out to us through email or phone, or visit us at our office.
        </p>
        <div className="space-y-4">
          <p className="text-black">
            <span className="font-bold">Email:</span>{" "}
            <a
              href="mailto:contact@yourcompany.com"
              className="text-bardum hover:underline transition duration-150"
            >
              contact@yourcompany.com
            </a>
          </p>
          <p className="text-black">
            <span className="font-bold">Phone:</span>{" "}
            <a
              href="tel:+1234567890"
              className="text-bardum hover:underline transition duration-150"
            >
              +1 (234) 567-890
            </a>
          </p>
          <p className="text-black">
            <span className="font-bold">Address:</span> 123 Business Street,
            Suite 100, City, Country
          </p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
