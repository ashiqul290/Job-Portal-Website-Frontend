import { Link } from "react-router";
import { MapPin, Briefcase, Star, BadgeCheck } from "lucide-react";

interface CompanyCardProps {
  company: {
    id: string;
    name: string;
    tagline?: string;
    industry: string;
    size: string;
    location: string;
    openJobs: number;
    rating: number;
    reviews?: number;
    verified: boolean;
    color: string;
  };
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link
      to={`/companies/${company.id}`}
      className="block bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all duration-200 p-5 group"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
          style={{ backgroundColor: company.color === "#000000" ? "#374151" : company.color }}
        >
          {company.name[0]}
        </div>
        {company.verified && (
          <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            <BadgeCheck size={12} />
            Verified
          </div>
        )}
      </div>

      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-0.5">
        {company.name}
      </h3>
      {company.tagline && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{company.tagline}</p>
      )}

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <MapPin size={11} />
          {company.location}
        </span>
        <span className="flex items-center gap-1">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          {company.rating}
          {company.reviews && <span className="text-gray-400">({company.reviews})</span>}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">{company.industry}</p>
          <p className="text-xs text-muted-foreground">{company.size} employees</p>
        </div>
        <div className="flex items-center gap-1 text-primary bg-secondary px-3 py-1.5 rounded-lg text-xs font-medium">
          <Briefcase size={12} />
          {company.openJobs} Jobs
        </div>
      </div>
    </Link>
  );
}
