import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Briefcase, Bell, ChevronDown, User, LayoutDashboard, LogOut, Bookmark } from "lucide-react";

const navLinks = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // Simulate logged-in state based on /dashboard routes
  const isLoggedIn = location.pathname.startsWith("/dashboard");

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Talent<span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard/notifications"
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&auto=format"
                      alt="User avatar"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-foreground">Alex Morgan</span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-border shadow-lg py-1 z-50">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={15} className="text-muted-foreground" />
                        Dashboard
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User size={15} className="text-muted-foreground" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard/saved-jobs"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Bookmark size={15} className="text-muted-foreground" />
                        Saved Jobs
                      </Link>
                      <div className="border-t border-border my-1" />
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LogOut size={15} />
                        Sign Out
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-secondary transition-colors"
                >
                  Post a Job
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full text-center px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted"
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
