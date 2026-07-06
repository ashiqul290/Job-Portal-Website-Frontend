import { Outlet, NavLink, useLocation } from "react-router";
import Navbar from "../components/common/Navbar";
import {
  LayoutDashboard,
  Briefcase,
  Bookmark,
  Bell,
  User,
  Settings,
  FileText,
  ChevronRight,
} from "lucide-react";

const sidebarNav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Applied Jobs", href: "/dashboard/applied-jobs", icon: FileText },
  { label: "Saved Jobs", href: "/dashboard/saved-jobs", icon: Bookmark },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell, badge: 2 },
  { label: "My Profile", href: "/dashboard/profile", icon: User },
  { label: "Edit Profile", href: "/dashboard/edit-profile", icon: Settings },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 flex-shrink-0">
          {/* User card */}
          <div className="bg-white rounded-xl border border-border p-4 mb-4 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format"
              alt="User"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Alex Morgan</p>
              <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="bg-white rounded-xl border border-border overflow-hidden">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.exact}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-b border-border last:border-b-0 ${
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={16} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs font-medium text-white bg-primary rounded-full px-1.5 py-0.5">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} className="text-primary" />}
                </NavLink>
              );
            })}
          </nav>

          {/* Profile strength */}
          <div className="mt-4 bg-white rounded-xl border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-foreground">Profile Strength</p>
              <p className="text-xs font-semibold text-primary">72%</p>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: "72%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Add portfolio to reach 90%</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
