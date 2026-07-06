import { useState } from "react";
import { FileText, Clock, CheckCircle2, XCircle, CalendarCheck, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { applicationHistory } from "../../data/mockData";

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Interview: { color: "text-blue-700", bg: "bg-blue-50", icon: <CalendarCheck size={13} /> },
  "Under Review": { color: "text-yellow-700", bg: "bg-yellow-50", icon: <Clock size={13} /> },
  Rejected: { color: "text-red-700", bg: "bg-red-50", icon: <XCircle size={13} /> },
  "Offer Received": { color: "text-green-700", bg: "bg-green-50", icon: <CheckCircle2 size={13} /> },
};

const STATUSES = ["All", "Interview", "Under Review", "Offer Received", "Rejected"];

export default function AppliedJobs() {
  const [filter, setFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered =
    filter === "All" ? applicationHistory : applicationHistory.filter((a) => a.status === filter);

  const counts = STATUSES.slice(1).reduce(
    (acc, s) => ({ ...acc, [s]: applicationHistory.filter((a) => a.status === s).length }),
    {} as Record<string, number>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Applied Jobs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {applicationHistory.length} total applications
            </p>
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-sm border border-border rounded-xl px-3 py-2 text-foreground hover:border-primary/40 transition-colors"
            >
              {filter}
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-border shadow-lg py-1 z-10 w-44">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setFilter(s); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      filter === s ? "text-primary font-medium" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(statusConfig).map(([status, cfg]) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                filter === status ? `${cfg.bg} ring-1 ring-current` : "bg-muted hover:bg-muted/70"
              } ${cfg.color}`}
            >
              {cfg.icon}
              <div>
                <p className="text-sm font-bold">{counts[status] ?? 0}</p>
                <p className="text-xs opacity-75">{status}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Applications list */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((app) => {
            const cfg = statusConfig[app.status];
            return (
              <div key={app.id} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: app.companyColor === "#000000" ? "#374151" : app.companyColor }}
                >
                  {app.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/jobs/${app.jobId}`}
                    className="font-semibold text-foreground hover:text-primary transition-colors block truncate"
                  >
                    {app.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
                    <span>{app.company}</span>
                    <span>•</span>
                    <span>{app.location}</span>
                    <span>•</span>
                    <span>{app.salary}</span>
                    <span>•</span>
                    <span>{app.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Applied on {app.appliedDate}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                  {cfg.icon}
                  {app.status}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="font-semibold text-foreground mb-2">No applications found</h3>
          <p className="text-sm text-muted-foreground">
            {filter === "All" ? "You haven't applied to any jobs yet." : `No jobs with "${filter}" status.`}
          </p>
        </div>
      )}
    </div>
  );
}
