import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo */}
      <div className="mb-8 flex flex-col items-center">
        <img src="/Logo%20main.png" alt="UMI Logo" className="h-16 mb-2" />
        <div className="text-sm font-semibold text-blue-900 tracking-wide mt-2 text-center">UGANDA MANAGEMENT INSTITUTE</div>
      </div>
      {/* Reset Password Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">We'll send you a link to your email id if you're registered in the system.</p>
        {submitted ? (
          <div className="text-green-600 text-center font-medium mb-4">If your email is registered, a reset link has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">School Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition-colors mt-2"
            >
              Submit
            </button>
          </form>
        )}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-700 hover:underline text-sm">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;