import { Link } from "react-router";
import {
  FileText,
  Bookmark,
  Eye,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Bell,
} from "lucide-react";
import { applicationHistory, notifications } from "../../data/mockData";

const stats = [
  { label: "Applied", value: 12, icon: FileText, color: "text-primary", bg: "bg-secondary" },
  { label: "Saved Jobs", value: 8, icon: Bookmark, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Profile Views", value: 47, icon: Eye, color: "text-green-600", bg: "bg-green-50" },
  { label: "Interviews", value: 3, icon: CalendarCheck, color: "text-purple-600", bg: "bg-purple-50" },
];

const statusColors: Record<string, string> = {
  Interview: "bg-blue-50 text-blue-700",
  "Under Review": "bg-yellow-50 text-yellow-700",
  Rejected: "bg-red-50 text-red-700",
  "Offer Received": "bg-green-50 text-green-700",
};

const statusIcons: Record<string, React.ReactNode> = {
  Interview: <CalendarCheck size={12} />,
  "Under Review": <Clock size={12} />,
  Rejected: <XCircle size={12} />,
  "Offer Received": <CheckCircle2 size={12} />,
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-blue-200 text-sm mb-1">Good morning 👋</p>
          <h1 className="text-xl font-bold text-white">Welcome back, Alex!</h1>
          <p className="text-blue-100 text-sm mt-1">You have 2 new notifications and 1 interview invite.</p>
        </div>
        <Link
          to="/jobs"
          className="flex items-center gap-2 bg-white text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors flex-shrink-0"
        >
          Find Jobs <ArrowRight size={15} />
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-border p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Applications</h2>
            <Link to="/dashboard/applied-jobs" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {applicationHistory.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center gap-3 px-5 py-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: app.companyColor === "#000000" ? "#374151" : app.companyColor }}
                >
                  {app.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{app.title}</p>
                  <p className="text-xs text-muted-foreground">{app.company} · {app.appliedDate}</p>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${statusColors[app.status]}`}>
                  {statusIcons[app.status]}
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-border">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              Notifications
              <span className="text-xs font-medium text-white bg-primary rounded-full px-1.5 py-0.5">2</span>
            </h2>
            <Link to="/dashboard/notifications" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {notifications.slice(0, 3).map((n) => (
              <div key={n.id} className={`flex items-start gap-3 px-5 py-4 ${!n.read ? "bg-blue-50/30" : ""}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  n.type === "interview" ? "bg-blue-100" : n.type === "application" ? "bg-green-100" : "bg-muted"
                }`}>
                  {n.type === "interview" ? (
                    <CalendarCheck size={15} className="text-blue-600" />
                  ) : n.type === "application" ? (
                    <FileText size={15} className="text-green-600" />
                  ) : (
                    <Bell size={15} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile completion */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Complete Your Profile</h2>
          <Link to="/dashboard/edit-profile" className="text-xs text-primary hover:underline">
            Edit Profile
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: "72%" }} />
          </div>
          <span className="text-sm font-bold text-primary flex-shrink-0">72%</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Profile Photo", done: true },
            { label: "Work Experience", done: true },
            { label: "Education", done: true },
            { label: "Skills", done: true },
            { label: "Portfolio Link", done: false },
            { label: "Resume Uploaded", done: false },
          ].map(({ label, done }) => (
            <div key={label} className={`flex items-center gap-2.5 p-3 rounded-lg ${done ? "bg-green-50" : "bg-muted"}`}>
              {done ? (
                <CheckCircle2 size={15} className="text-green-600 flex-shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground flex-shrink-0" />
              )}
              <span className={`text-xs font-medium ${done ? "text-green-700" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>



      {/* Job Recommendations */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            Recommended for You
          </h2>
          <Link to="/jobs" className="text-xs text-primary hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Senior React Engineer", company: "Vercel", salary: "$130K–$170K", color: "#374151" },
            { title: "Staff Frontend Engineer", company: "Linear", salary: "$200K–$240K", color: "#5E6AD2" },
          ].map((rec) => (
            <Link
              key={rec.title}
              to="/jobs"
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-secondary/30 transition-all"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: rec.color }}
              >
                {rec.company[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{rec.title}</p>
                <p className="text-xs text-muted-foreground">{rec.company} · {rec.salary}</p>
              </div>
              <ArrowRight size={14} className="text-muted-foreground flex-shrink-0 ml-auto" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
