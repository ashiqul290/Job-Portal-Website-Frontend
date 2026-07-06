import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Briefcase, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-primary via-blue-600 to-indigo-700 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${120 + i * 80}px`,
                height: `${120 + i * 80}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">TalentHub</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Welcome back to your career journey
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            Sign in to access your applications, saved jobs, and personalized job recommendations.
          </p>
          <div className="space-y-4">
            {[
              { emoji: "🚀", title: "10,000+ Active Jobs", sub: "Updated daily from top companies" },
              { emoji: "✅", title: "Application Tracking", sub: "Follow your applications in real-time" },
              { emoji: "🔔", title: "Job Alerts", sub: "Get notified of perfect matches" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-blue-100 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Talent<span className="text-primary">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-1">Sign in to your account</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Create one free
            </Link>
          </p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-foreground">Password</label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-primary" />
              <span className="text-sm text-muted-foreground">Remember me for 30 days</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="border-t border-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted-foreground">
              or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "🔷" },
              { label: "LinkedIn", icon: "🔗" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            By signing in you agree to our{" "}
            <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
