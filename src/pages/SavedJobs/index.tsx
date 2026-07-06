import { useState } from "react";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { jobs } from "../../data/mockData";
import JobCard from "../../components/jobs/JobCard";

export default function SavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>(jobs.filter((j) => j.saved).map((j) => j.id));
  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  const removeAll = () => setSavedIds([]);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-border p-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Bookmark size={18} className="text-primary" />
            Saved Jobs
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {savedJobs.length} saved {savedJobs.length === 1 ? "job" : "jobs"}
          </p>
        </div>
        {savedJobs.length > 0 && (
          <button
            onClick={removeAll}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
          >
            <Trash2 size={13} />
            Clear all
          </button>
        )}
      </div>

      {savedJobs.length > 0 ? (
        <div className="space-y-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={{ ...job, saved: true }} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-16 text-center">
          <div className="text-5xl mb-4">🔖</div>
          <h3 className="font-semibold text-foreground mb-2">No saved jobs yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Bookmark jobs you're interested in so you can easily find them later.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Jobs <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </div>
  );
}
