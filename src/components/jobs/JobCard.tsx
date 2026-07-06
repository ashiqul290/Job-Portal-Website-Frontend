import { Link } from "react-router";
import { MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, Wifi } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyColor: string;
    location: string;
    type: string;
    remote: boolean;
    salary: string;
    experience: string;
    category: string;
    skills: string[];
    postedAt: string;
    featured?: boolean;
    saved?: boolean;
  };
  variant?: "default" | "compact";
}

export default function JobCard({ job, variant = "default" }: JobCardProps) {
  const [saved, setSaved] = useState(job.saved ?? false);

  const typeColor =
    job.type === "Full-time"
      ? "bg-green-50 text-green-700"
      : job.type === "Part-time"
      ? "bg-yellow-50 text-yellow-700"
      : job.type === "Contract"
      ? "bg-purple-50 text-purple-700"
      : "bg-blue-50 text-blue-700";

  return (
    <div
      className={`bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 group ${
        job.featured ? "ring-1 ring-primary/20" : ""
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            {/* Company logo */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
              style={{ backgroundColor: job.companyColor === "#000000" ? "#374151" : job.companyColor }}
            >
              {job.company[0]}
            </div>
            <div className="min-w-0">
              <Link
                to={`/jobs/${job.id}`}
                className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 block"
              >
                {job.title}
              </Link>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {job.featured && (
              <span className="text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded-full">Featured</span>
            )}
            <button
              onClick={() => setSaved(!saved)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
              aria-label={saved ? "Unsave job" : "Save job"}
            >
              {saved ? (
                <BookmarkCheck size={18} className="text-primary" />
              ) : (
                <Bookmark size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={13} />
            {job.salary}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {job.postedAt}
          </span>
          {job.remote && (
            <span className="flex items-center gap-1 text-blue-600">
              <Wifi size={13} />
              Remote
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${typeColor}`}>{job.type}</span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
            {job.experience}
          </span>
          {job.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-xs text-muted-foreground">+{job.skills.length - 3} more</span>
          )}
        </div>
      </div>

      {variant !== "compact" && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{job.category}</span>
          <Link
            to={`/jobs/${job.id}`}
            className="text-xs font-medium text-primary hover:underline"
          >
            View Details →
          </Link>
        </div>
      )}
    </div>
  );
}
