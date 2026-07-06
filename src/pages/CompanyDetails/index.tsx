import { useParams, Link } from "react-router";
import {
  MapPin,
  Globe,
  Users,
  Star,
  Briefcase,
  Calendar,
  BadgeCheck,
  ArrowLeft,
  Twitter,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import { companies, jobs } from "../../data/mockData";
import JobCard from "../../components/jobs/JobCard";

export default function CompanyDetails() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id) || companies[0];
  const companyJobs = jobs.filter((j) => j.companyId === company.id);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Cover image */}
      <div className="relative h-52 sm:h-64 overflow-hidden bg-gradient-to-r from-primary to-blue-700">
        <img
          src={company.coverImage}
          alt={`${company.name} office`}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-6 mb-6">
          <Link to="/companies" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft size={14} />
            Back to Companies
          </Link>
          <span>/</span>
          <span className="text-foreground">{company.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Company header */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 -mt-12 shadow-lg border-4 border-white"
                  style={{ backgroundColor: company.color === "#000000" ? "#374151" : company.color }}
                >
                  {company.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-xl font-bold text-foreground">{company.name}</h1>
                    {company.verified && (
                      <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        <BadgeCheck size={12} />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{company.tagline}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {company.size} employees
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Founded {company.founded}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      {company.rating} ({company.reviews} reviews)
                    </span>
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <Globe size={12} />
                      {company.website}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {Object.entries(company.socialLinks).map(([key]) => {
                    const icons: Record<string, React.ReactNode> = {
                      twitter: <Twitter size={15} />,
                      linkedin: <Linkedin size={15} />,
                      github: <Github size={15} />,
                    };
                    return (
                      <a
                        key={key}
                        href="#"
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        {icons[key]}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border">
                {[
                  { label: "Open Jobs", value: company.openJobs },
                  { label: "Team Size", value: company.size },
                  { label: "Rating", value: `${company.rating}/5` },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-3">About {company.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-4">Benefits & Perks</h2>
              <div className="flex flex-wrap gap-2">
                {company.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="text-sm font-medium text-accent-foreground bg-accent px-4 py-2 rounded-xl"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>

            {/* Open Jobs */}
            <div>
              <h2 className="font-semibold text-foreground mb-4">
                Open Positions at {company.name} ({companyJobs.length})
              </h2>
              {companyJobs.length > 0 ? (
                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-border p-10 text-center">
                  <p className="text-2xl mb-2">📋</p>
                  <p className="text-sm text-muted-foreground">No open positions at this time</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-24">
              <h3 className="font-semibold text-foreground text-sm mb-4">Company Overview</h3>
              <div className="space-y-3.5 text-sm">
                {[
                  { icon: Briefcase, label: "Industry", value: company.industry },
                  { icon: Users, label: "Company Size", value: `${company.size} employees` },
                  { icon: MapPin, label: "Headquarters", value: company.location },
                  { icon: Calendar, label: "Founded", value: company.founded },
                  { icon: Globe, label: "Website", value: company.website, link: true },
                ].map(({ icon: Icon, label, value, link }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {link ? (
                        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium text-xs">
                          {value}
                        </a>
                      ) : (
                        <p className="text-foreground font-medium text-xs">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/jobs"
                className="block w-full text-center mt-5 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                View All {company.openJobs} Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12" />
    </div>
  );
}
