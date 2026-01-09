'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { api, setAuthToken } from '@/app/_components/lib/api';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send credentials to Laravel backend
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (response.status === 200 && data.token) {
        // Store token in localStorage
        setAuthToken(data.token);
        router.push('/admin');
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      
      try {
        // Send Google access token to Laravel backend
        const res = await api.post('/login/google/callback', {
          token: tokenResponse.access_token,
        });

        const data = res.data;

        if (res.status === 200 && data.token) {
          // Store token in localStorage
          setAuthToken(data.token);

          router.push('/admin');
        } else {
          alert(data.message || 'Login gagal');
        }
      } catch (error) {
        console.error('Google login error:', error);
        alert('Terjadi kesalahan saat login dengan Google');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      alert('Google login failed');
      setIsLoading(false);
    },
  });

  return (
    <div className="flex justify-center items-center p-4 min-h-screen">
      <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md">
        {/* Logo and Title */}
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="flex justify-center items-center bg-red-500 rounded-full w-10 h-10">
          </div>
          <h1 className="font-bold text-gray-900 text-2xl">Moklet Portal</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleCredentialLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-900 text-sm">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="user@student.smktelkom-mlg.sch.id"
              className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full text-sm"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-900 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full text-sm"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white hover:bg-gray-50 disabled:opacity-50 mb-4 py-3 border border-gray-300 rounded-lg w-full font-medium text-gray-700 transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Sign in with Credentials'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 bg-gray-300 h-px"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 bg-gray-300 h-px"></div>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={() => handleGoogleLogin()}
          disabled={isLoading}
          className="flex justify-center items-center gap-3 bg-white hover:bg-gray-50 disabled:opacity-50 py-3 border border-gray-300 rounded-lg w-full font-medium text-gray-700 transition-colors disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isLoading ? 'Loading...' : 'Sign in with Google'}
        </button>

        {/* Footer Links */}
        <div className="mt-6 text-gray-500 text-sm text-center">
          <a href="#" className="hover:text-gray-700 transition-colors">
            Forgot password?
          </a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-gray-700 transition-colors">
            Butuh bantuan?
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <LoginForm />
    </GoogleOAuthProvider>
  );
}