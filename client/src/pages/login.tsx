import { Nav } from '../containers'; 
import {Lock} from '../assets'


// React.FC (or React.FunctionComponent) is a generic type for functional components
const Login: React.FC = () => {
  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-screen">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          {/* Left Side with Lock Logo */}
          <div className="w-1/3 bg-stone-800 flex items-center justify-center p-8">
            <img
              src={Lock}
              alt="Lock Logo"
              className="w-24 h-24"
            />
          </div>

          {/* Login Form Section */}
          <div className="w-2/3 p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Welcome Back</h2>
            <form action="#" method="POST">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-lg mb-2 text-stone-200"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-lg mb-2 text-stone-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="text-blue-500 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-stone-300">
                    Remember Me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:text-red-600">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-red-500 rounded-lg text-white text-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;