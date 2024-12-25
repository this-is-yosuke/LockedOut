import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useUser } from '../contexts'; // Import useUser hook
import { login } from '../api/authAPI'; // Assuming login API function
import { Nav } from '../containers';
import Lock from '../assets/lock.png';
import { AxiosError } from 'axios'; // Import AxiosError type
import type { UserLogin } from '../interfaces/UserLogin';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string | null>(null); // For storing error message

  // Get login function from UserContext
  const { login: loginUser } = useUser();

  // Initialize navigate function for redirection
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null); // Reset error message on new submit

    try {
      const data = await login(loginData); // Assuming this API returns user data with a token
      console.log("Login success data:", data); // Debugging: check data returned from API
      loginUser({ username: loginData.username, token: data.token }); // Update context with user data

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify({ username: loginData.username, token: data.token }));

      // Redirect to homepage after successful login
      navigate('/'); // Redirect to homepage (or another page if needed)
    } catch (err) {
      console.error('Failed to login', err);  // Log full error for debugging

      // Check if the error is an instance of AxiosError
      if (err instanceof AxiosError && err.response) {
        console.log("Axios error details:", err.response); // Log Axios error details for inspection

        // Handle Axios error based on response status
        if (err.response.status === 401) {
          setLoginError('Invalid username or password. Please try again.');
        } else {
          setLoginError('An error occurred. Please try again later.');
        }
      } else {
        // For any non-Axios error or unexpected error type
        setLoginError('Please make sure your username and password are correct');
      }
    }
  };

  return (
    <>
      <Nav />
      <section className="flex items-center justify-center min-h-screen">
        <div className="flex bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
          <div className="w-1/3 bg-stone-800 flex items-center justify-center p-8">
            <img src={Lock} alt="Lock Logo" className="w-24 h-24" />
          </div>
          <div className="w-2/3 p-8 bg-stone-800">
            <h2 className="text-3xl font-semibold mb-6 text-stone-100">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-lg mb-2 text-stone-200">
                  Username
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-lg mb-2 text-stone-200">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 bg-stone-200 text-stone-900 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Error message display */}
              {loginError && (
                <div className="text-red-500 mb-4 text-center">{loginError}</div>
              )}

              <button
                type="submit"
                className="w-full p-3 bg-red-500 rounded-lg text-white text-lg font-semibold hover:bg-green-500"
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