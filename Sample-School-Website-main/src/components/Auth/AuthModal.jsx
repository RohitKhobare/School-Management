import React, { useState, useEffect } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const AuthModal = ({ activeModal, onClose }) => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(activeModal === 'signup');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsSignup(activeModal === 'signup');
  }, [activeModal]);

  // If user is already logged in, don't show the modal
  if (user) {
    onClose();
    return null;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [signupRole, setSignupRole] = useState('student');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = await authAPI.login({ email, password, role });
      // Pass both token and user data to login function
      login({ token: data.data.token, user: data.data.user }, navigate);
      onClose();
    } catch (error) {
      alert(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const signupData = { name, email, password, confirmPassword: confirmpassword, role: signupRole };
      console.log('Signup payload:', signupData);
      console.log('Form state - name:', name, 'email:', email, 'role:', signupRole, 'pwd:', password?.length, 'confirmPwd:', confirmpassword?.length);
      await authAPI.signup(signupData);
      alert("Signup successful. Please login.");
      setIsSignup(false);
      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSignupRole('student');
    } catch (error) {
      alert(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Container */}
      <div className="relative w-full max-w-3xl mx-4 md:w-3xl min-h-112 py-6 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM */}
        <div
          className={`relative md:absolute top-0 left-0 h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-500 ${isSignup ? 'hidden md:block md:translate-x-full md:opacity-0 md:z-10' : 'block md:translate-x-0 md:opacity-100 md:z-20'}`}
        >
          <form onSubmit={handleLogin} className="w-full max-w-md px-6 md:px-10 text-center flex flex-col items-center justify-center gap-3 py-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login To Your Account</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Password"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded">
              <option value="student">Login as Student</option>
              <option value="parent">Login as Parent</option>
              <option value="teacher">Login as Teacher</option>
              <option value="admin">Login as Admin</option>
            </select>
            <button type="submit" disabled={loading} className="border border-black text-black px-8 py-2 rounded-full cursor-pointer max-w-md w-full sm:w-auto disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="mt-4 text-sm">
              <span>Don't have an account? </span>
              <button type="button" onClick={() => setIsSignup(true)} className="text-amber-600 font-semibold ml-1 cursor-pointer">Sign up</button>
            </div>
          </form>
        </div>

        {/* SIGNUP FORM */}
        <div
          className={`relative md:absolute h-full w-full md:w-1/2 flex items-center justify-center transition-all duration-500 ${isSignup ? 'block md:translate-x-full md:opacity-100 md:z-20' : 'hidden md:block md:translate-x-0 md:opacity-0 md:z-10'}`}
        >
          <form onSubmit={handleSignup} className="w-full max-w-md px-6 md:px-10 text-center flex flex-col items-center justify-center gap-3 py-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Your New Account</h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Email"
            />
            
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Password"
            />
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
              placeholder="Confirm Password"
            />
            
            <select 
              value={signupRole} 
              onChange={(e) => setSignupRole(e.target.value)} 
              className="max-w-md w-full mb-2 px-4 py-2 bg-gray-100 rounded"
            >
              <option value="student">Sign up as Student</option>
              <option value="parent">Sign up as Parent</option>
              <option value="teacher">Sign up as Teacher</option>
            </select>

            <button disabled={loading} className="border border-black text-black px-8 py-2 rounded-full cursor-pointer max-w-md w-full sm:w-auto disabled:opacity-50">
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
            <div className="mt-4 text-sm">
              <span>Already have an account? </span>
              <button type="button" onClick={() => setIsSignup(false)} className="text-amber-600 font-semibold ml-1 cursor-pointer">Login</button>
            </div>
          </form>
        </div>

        {/* OVERLAY CONTAINER */}
        <div
          className={`hidden md:block md:absolute md:top-0 md:left-1/2 md:w-1/2 md:h-full overflow-hidden transition-transform duration-500 z-30 ${isSignup ? 'md:-translate-x-full' : ''}`}
        >
          <div
            className={`relative -left-full w-[200%] h-full bg-linear-to-r from-amber-500 via-red-400 to-amber-500
            transition-transform duration-500
            ${isSignup ? "translate-x-1/2" : ""}`}
          >
            {/* LEFT PANEL */}
            <div className="absolute w-1/2 h-full flex flex-col items-center justify-center text-white text-center px-8">
              <div className="flex items-center">
                <img
                  className="h-13 w-13 rounded-full"
                  src="src\assets\Logo.png"
                ></img>
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="mt-2 text-sm">Please login</p>
              <button
                onClick={() => setIsSignup(false)}
                className="mt-4 border border-white px-6 py-2 rounded-full cursor-pointer"
              >
                Login
              </button>
            </div>

            {/* RIGHT PANEL */}
            <div className="absolute right-0 w-1/2 h-full flex flex-col items-center justify-center text-white text-center px-8">
              <div className="flex items-center ">
                <img
                  className="h-13 w-13 rounded-full"
                  src="src\assets\Logo.png"
                ></img>
              </div>
              <h1 className="text-2xl font-bold">Hello Friend</h1>
              <p className="mt-2 text-sm">Start your journey</p>
              <button
                onClick={() => setIsSignup(true)}
                className="mt-4 border border-white px-6 py-2 rounded-full cursor-pointer"
              >
                Signup
              </button>
            </div>
          </div>
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 cursor-pointer text-xl text-gray-600 z-50"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
