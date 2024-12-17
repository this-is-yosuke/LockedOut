import { Nav, Footer } from '../containers'; // Ensure correct path for Nav
import Lock from '../assets/lock.png';

const Register: React.FC = () => {
  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-screen">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left Side with a Logo */}
          <div className="w-1/3 bg-stone-800 flex items-center justify-center p-8">
            <img
              src={Lock}
              alt="Logo"
              className="w-24 h-24"
            />
          </div>

          {/* Register Form Section */}
          <div className="w-2/3 p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Create an Account</h2>
            <form action="#" method="POST">
              {/* Display Name Field */}
              <div className="mb-4">
                <label htmlFor="display-name" className="block text-lg mb-2 text-stone-200">
                  Display Name
                </label>
                <input
                  type="text"
                  id="display-name"
                  name="display-name"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your display name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg mb-2 text-stone-200">
                  Email Address
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

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-lg mb-2 text-stone-200">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-lg mb-2 text-stone-200">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="text-blue-500 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-stone-300">
                  I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-red-500 rounded-lg text-white text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Register;