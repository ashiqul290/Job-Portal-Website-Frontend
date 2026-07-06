import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Briefcase, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/dashboard"); }, 1200);
  };

  const passwordStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Good", "Strong"];
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-indigo-600 via-primary to-blue-700 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3" />
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-white">TalentHub</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">Join 50,000+ professionals</h2>
          <p className="text-blue-100 text-lg mb-10">
            Create your free account and unlock your next career opportunity.
          </p>
          <div className="space-y-3">
            {[
              "Free to use — no hidden fees",
              "Get matched with top companies",
              "Personalized job recommendations",
              "One-click apply to thousands of jobs",
              "Salary insights and career resources",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-green-300 flex-shrink-0" />
                <span className="text-blue-50 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-blue-200 text-sm">
            "TalentHub helped me find my dream job in just 3 weeks. Incredible platform!"
          </p>
          <div className="flex items-center gap-3 mt-3">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&auto=format"
              alt="Sarah"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-white text-xs font-medium">Sarah Chen, Senior Engineer at Stripe</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Talent<span className="text-primary">Hub</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { value: "candidate", label: "Job Seeker", icon: "👤" },
              { value: "employer", label: "Employer", icon: "🏢" },
            ].map(({ value, label, icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm((f) => ({ ...f, role: value }))}
                className={`flex items-center justify-center gap-2.5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.role === value
                    ? "border-primary bg-secondary text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder="Min. 8 characters"
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
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          passwordStrength >= i ? strengthColors[passwordStrength] : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{strengthLabels[passwordStrength]}</span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-primary" />
              <span className="text-xs text-muted-foreground">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="border-t border-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-muted-foreground">
              or sign up with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Google", icon: "🔷" }, { label: "LinkedIn", icon: "🔗" }].map(({ label, icon }) => (
              <button
                key={label}
                className="flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
