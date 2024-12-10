import { Nav, Footer } from '../containers'; // Ensure correct path for Nav

const Contact: React.FC = () => {
  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-screen">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left Side with a Contact Icon */}
          <div className="w-1/3 bg-stone-800 flex items-center justify-center p-8">
            <img
              src="https://via.placeholder.com/100x100?text=Contact"
              alt="Contact Icon"
              className="w-24 h-24"
            />
          </div>

          {/* Contact Form Section */}
          <div className="w-2/3 p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Get in Touch</h2>
            <form action="#" method="POST">
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg mb-2 text-stone-200">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-2 text-stone-200">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-lg mb-2 text-stone-200">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message here"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-red-500 rounded-lg text-white text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;