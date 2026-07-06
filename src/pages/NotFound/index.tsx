import { Link, useNavigate } from "react-router";
import { Home, Search, ArrowLeft, Briefcase } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">
            Talent<span className="text-primary">Hub</span>
          </span>
        </Link>

        {/* 404 graphic */}
        <div className="relative mb-8">
          <div className="text-[120px] font-black text-primary/10 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-secondary rounded-3xl flex items-center justify-center shadow-lg">
              <Search size={40} className="text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home size={15} />
            Go Home
          </Link>
          <Link
            to="/jobs"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border bg-white text-foreground rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
          >
            <Search size={15} />
            Browse Jobs
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border bg-white text-foreground rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>

        {/* Popular pages */}
        <div className="bg-white rounded-xl border border-border p-5 text-left">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Popular Pages</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Find Jobs", href: "/jobs" },
              { label: "Companies", href: "/companies" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Contact Us", href: "/contact" },
              { label: "About Us", href: "/about" },
              { label: "Register", href: "/register" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
              >
                → {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
