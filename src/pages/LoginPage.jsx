import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, send them straight to overview
  if (isAuthenticated) {
    navigate("/admin/overview", { replace: true });
  }

  const [email, setEmail] = useState("akshitasondagar@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Get the redirect path from location state or default to overview
  const from = location.state?.from?.pathname || "/admin/overview";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid credentials. Try any password with 6+ characters.");
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const success = login("akshitasondagar@gmail.com", "google-oauth");
      setIsLoading(false);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError("Google authentication failed.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* LEFT SIDE PANEL (Hidden on mobile/tablet) */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-tr from-emerald-950 via-emerald-800 to-emerald-950 text-white p-12 xl:p-16 flex-col justify-between"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(16, 185, 129, 0.12) 0%, transparent 80%),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        }}
      >
        {/* Decorative subtle ambient lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center gap-3.5 z-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shadow-inner">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-wide uppercase text-white">
              Admin Console
            </h2>
          </div>
        </div>

        {/* Middle Content */}
        <div className="my-auto max-w-xl z-10 space-y-6">
          {/* Secure Access Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide text-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Secure Access
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Manage every <br />
            moment with clarity.
          </h1>

          <p className="text-emerald-100/70 text-base leading-relaxed font-medium">
            Sign in to monitor performance, manage users, and orchestrate operations from a single, beautifully crafted dashboard.
          </p>

          {/* Glassmorphic Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4.5">
              <p className="text-xl xl:text-2xl font-black text-white">99.9%</p>
              <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-300/80 mt-1">Uptime</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4.5">
              <p className="text-xl xl:text-2xl font-black text-white">256-bit</p>
              <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-300/80 mt-1">Encryption</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4.5">
              <p className="text-xl xl:text-2xl font-black text-white">24/7</p>
              <p className="text-[10px] font-bold tracking-wider uppercase text-emerald-300/80 mt-1">Monitoring</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-emerald-100/40 text-xs font-semibold z-10">
          &copy; 2026 Admin Console. All rights reserved.
        </p>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 bg-slate-50/50">
        <div className="w-full max-w-md space-y-8 bg-white border border-slate-100 p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100/40">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm font-semibold text-slate-400 mt-2">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {error && (
            <div className="flex gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-600 animate-shake">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400">
                Email address
              </label>
              <div className="relative rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={isLoading}
                  className="w-full bg-transparent pl-11 pr-3 py-3 text-sm font-bold text-slate-700 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact system administrators to reset your credentials.");
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="h-4.5 w-4.5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-transparent pl-11 pr-11 py-3 text-sm font-bold text-slate-700 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
                className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2.5 text-xs font-bold text-slate-500 cursor-pointer select-none"
              >
                Keep me signed in for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative px-3 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400">
              or
            </span>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 text-sm font-bold shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-60"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.08-.63-.12-1.27-.12-1.91z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Need Admin Account */}
          <p className="text-center text-xs font-semibold text-slate-400 pt-2">
            Need an admin account?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                alert("Please request account access from your organization admin.");
              }}
              className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
