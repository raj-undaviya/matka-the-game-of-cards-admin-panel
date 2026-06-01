import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useToast from "@/utils/useToast";

export default function LoginPage() {
  const { login, isAuthenticated, loginLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  // Redirect if already authenticated
  // if (isAuthenticated) {
  //   navigate("/admin/overview", { replace: true });
  // }

  const [email, setEmail] = useState("admin@yopmail.com");
  const [password, setPassword] = useState("admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [error, setError] = useState("");
  const from = location.state?.from?.pathname || "/admin/overview";

  // Redirect if already authenticated  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/overview", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
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

    try {
      await login({ email, password, rememberAuth: rememberMe });
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (apiError) {
      const message = apiError?.message || "Login failed";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans overflow-hidden">
      <div className="max-w-[1800px] mx-auto min-h-screen flex">

        {/* LEFT SIDE PANEL */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden text-white p-12 xl:p-16 flex-col justify-between"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(16,185,129,0.18), transparent 35%),
              radial-gradient(circle at bottom right, rgba(52,211,153,0.12), transparent 40%),
              linear-gradient(135deg, #022c22 0%, #014737 45%, #01684f 100%)
            `,
          }}
        >
          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Ambient Glow */}
          <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="absolute bottom-[-140px] right-[-120px] w-[380px] h-[380px] bg-green-300/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-3.5 z-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 shadow-inner backdrop-blur-md">
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

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold tracking-wide text-emerald-100 shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              Secure access
            </div>

            {/* Heading */}
            <h1 className="text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] text-white">
              Manage every <br />
              moment with clarity.
            </h1>

            {/* Description */}
            <p className="text-emerald-50/75 text-base leading-relaxed font-medium max-w-lg">
              Sign in to monitor performance, manage users, and orchestrate
              operations from a single, beautifully crafted dashboard.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 pt-6">

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-lg hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-black text-white">99.9%</p>
                <p className="text-xs font-bold tracking-wider uppercase text-emerald-200/80 mt-2">
                  Uptime
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-lg hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-black text-white">256-bit</p>
                <p className="text-xs font-bold tracking-wider uppercase text-emerald-200/80 mt-2">
                  Encryption
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-lg hover:bg-white/10 transition-all duration-300">
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-xs font-bold tracking-wider uppercase text-emerald-200/80 mt-2">
                  Monitoring
                </p>
              </div>

            </div>
          </div>

          {/* Footer */}
          <p className="text-emerald-100/40 text-xs font-semibold z-10">
            &copy; 2026 Admin Console. All rights reserved.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 xl:p-16 bg-[#F8FAFC] border-l border-slate-200">

          {/* LOGIN CARD */}
          <div className="w-full max-w-md space-y-8 bg-white border border-slate-200 rounded-3xl shadow-xl p-8 sm:p-10">

            {/* Heading */}
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h1>

              <p className="text-sm font-semibold text-slate-500 mt-2">
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-2.5 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs font-bold text-rose-600">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
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
                    disabled={loginLoading}
                    className="w-full bg-transparent pl-11 pr-3 py-3 text-sm font-bold text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">

                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>

                  <a
                    href="#forgot"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
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
                    disabled={loginLoading}
                    className="w-full bg-transparent pl-11 pr-11 py-3 text-sm font-bold text-slate-700 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4.5 w-4.5" />
                    ) : (
                      <Eye className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 accent-emerald-600"
                />

                <label
                  htmlFor="remember-me"
                  className="ml-2.5 text-xs font-bold text-slate-500"
                >
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loginLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Sign in to dashboard"
                )}
              </button>
            </form>

            {/* Footer Text */}
            <p className="text-center text-xs font-semibold text-slate-400 pt-2">
              Need an admin account?{" "}
              <span className="font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer">
                Contact your administrator
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
