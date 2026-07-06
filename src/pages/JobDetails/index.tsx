import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Share2,
  ArrowLeft,
  Star,
  BadgeCheck,
  Wifi,
  Calendar,
  Users,
} from "lucide-react";
import { jobs, companies } from "../../data/mockData";
import JobCard from "../../components/jobs/JobCard";

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id) || jobs[0];
  const company = companies.find((c) => c.id === job.companyId);
  const [saved, setSaved] = useState(job.saved ?? false);
  const [applied, setApplied] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);

  const similarJobs = jobs.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/jobs" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft size={14} />
            Back to Jobs
          </Link>
          <span>/</span>
          <span className="text-foreground">{job.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Job header card */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                    style={{ backgroundColor: job.companyColor === "#000000" ? "#374151" : job.companyColor }}
                  >
                    {job.company[0]}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground mb-1">{job.title}</h1>
                    <Link to={`/companies/${job.companyId}`} className="text-primary hover:underline text-sm font-medium">
                      {job.company}
                    </Link>
                    {job.featured && (
                      <span className="ml-2 text-xs font-medium text-primary bg-secondary px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSaved(!saved)}
                    className="p-2.5 rounded-xl border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all"
                  >
                    {saved ? <BookmarkCheck size={18} className="text-primary" /> : <Bookmark size={18} />}
                  </button>
                  <button className="p-2.5 rounded-xl border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Meta grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-border mb-5">
                {[
                  { icon: MapPin, label: "Location", value: job.location },
                  { icon: DollarSign, label: "Salary", value: job.salary },
                  { icon: Briefcase, label: "Job Type", value: job.type },
                  { icon: Clock, label: "Experience", value: job.experience },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra meta */}
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  Posted {job.postedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={12} />
                  Apply by {job.deadline}
                </span>
                {job.remote && (
                  <span className="flex items-center gap-1.5 text-blue-600">
                    <Wifi size={12} />
                    Remote Friendly
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Job Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium text-accent-foreground bg-accent px-4 py-2 rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div>
                <h2 className="font-semibold text-foreground mb-4">Similar Jobs</h2>
                <div className="space-y-3">
                  {similarJobs.map((j) => (
                    <JobCard key={j.id} job={j} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4">
            {/* Apply card */}
            <div className="bg-white rounded-xl border border-border p-5 sticky top-24">
              <div className="text-center mb-5">
                <p className="text-2xl font-bold text-primary mb-0.5">{job.salary}</p>
                <p className="text-xs text-muted-foreground">per year</p>
              </div>
              {applied ? (
                <div className="w-full py-3 bg-green-50 text-green-700 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2 mb-3">
                  <CheckCircle2 size={16} />
                  Application Submitted!
                </div>
              ) : (
                <button
                  onClick={() => setApplyOpen(true)}
                  className="w-full py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors mb-3"
                >
                  Apply Now
                </button>
              )}
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full py-3 rounded-xl text-sm font-semibold border transition-colors ${
                  saved
                    ? "border-primary text-primary bg-secondary"
                    : "border-border text-foreground hover:border-primary/40"
                }`}
              >
                {saved ? "Saved" : "Save Job"}
              </button>
              <div className="mt-4 pt-4 border-t border-border text-center">
                <p className="text-xs text-muted-foreground">Apply by</p>
                <p className="text-sm font-medium text-foreground">{job.deadline}</p>
              </div>
            </div>

            {/* Company card */}
            {company && (
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-4">About the Company</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: company.color === "#000000" ? "#374151" : company.color }}
                  >
                    {company.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm flex items-center gap-1">
                      {company.name}
                      {company.verified && <BadgeCheck size={14} className="text-primary" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{company.industry}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">{company.description}</p>
                <div className="space-y-2 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} />
                    {company.size} employees
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    {company.rating} ({company.reviews} reviews)
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase size={12} />
                    {company.openJobs} open positions
                  </div>
                </div>
                <Link
                  to={`/companies/${company.id}`}
                  className="block w-full text-center py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  View Company Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply modal */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setApplyOpen(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="font-bold text-foreground text-lg mb-1">Apply for {job.title}</h2>
            <p className="text-sm text-muted-foreground mb-6">at {job.company}</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  defaultValue="Alex Morgan"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  defaultValue="alex@example.com"
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-background"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Resume</label>
                <div className="w-full px-3 py-3 text-sm border-2 border-dashed border-border rounded-xl text-center text-muted-foreground hover:border-primary/40 cursor-pointer">
                  📄 Alex_Morgan_Resume.pdf — click to change
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground block mb-1.5">Cover Letter (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell them why you are a great fit..."
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-background resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setApplyOpen(false)}
                className="flex-1 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => { setApplied(true); setApplyOpen(false); }}
                className="flex-1 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
