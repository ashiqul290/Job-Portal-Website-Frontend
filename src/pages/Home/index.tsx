import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { jobs, companies, categories, testimonials, faqItems } from "../../data/mockData";
import JobCard from "../../components/jobs/JobCard";
import CompanyCard from "../../components/company/CompanyCard";

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>("1");
  const [email, setEmail] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${keyword}&location=${location}`);
  };

  const featuredJobs = jobs.filter((j) => j.featured).slice(0, 6);
  const topCompanies = companies.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <TrendingUp size={14} />
            Over 10,000 jobs posted this month
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your{" "}
            <span className="text-primary relative">
              Dream Job
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 5.5C75 2.5 225 2.5 299 5.5" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Today
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover thousands of job opportunities from world-class companies. Your next career move is just a search
            away.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-lg border border-border p-2 flex flex-col sm:flex-row gap-2 max-w-3xl mx-auto mb-8"
          >
            <div className="flex-1 flex items-center gap-2 px-4">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, keyword, or company"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 text-sm outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <div className="hidden sm:block w-px bg-border" />
            <div className="flex-1 flex items-center gap-2 px-4">
              <MapPin size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Location or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-sm outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors flex-shrink-0"
            >
              Search Jobs
            </button>
          </form>

          <p className="text-sm text-muted-foreground mb-2">Popular:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["React Engineer", "Product Manager", "UI Designer", "Data Scientist", "Remote"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?q=${tag}`)}
                className="text-xs font-medium text-muted-foreground bg-white border border-border px-3 py-1.5 rounded-full hover:text-primary hover:border-primary/40 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-border/50">
            {[
              { icon: Briefcase, value: "10,000+", label: "Active Jobs" },
              { icon: Building2, value: "5,000+", label: "Companies" },
              { icon: Users, value: "50,000+", label: "Job Seekers" },
              { icon: CheckCircle2, value: "98%", label: "Success Rate" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
              <p className="text-muted-foreground mt-1">Explore jobs across popular industries</p>
            </div>
            <Link to="/jobs" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/jobs?category=${cat.name}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                style={{ backgroundColor: cat.color }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{cat.count.toLocaleString()} jobs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured Jobs</h2>
              <p className="text-muted-foreground mt-1">Hand-picked opportunities from top employers</p>
            </div>
            <Link to="/jobs" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All Jobs <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Top Hiring Companies</h2>
              <p className="text-muted-foreground mt-1">Join industry leaders and fast-growing startups</p>
            </div>
            <Link to="/companies" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              All Companies <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-3">Ready to Take the Next Step?</h2>
              <p className="text-blue-100 max-w-lg">
                Join thousands of job seekers who found their perfect match on TalentHub. Start your journey today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <Link
                to="/jobs"
                className="px-8 py-3 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Find Jobs Now
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-blue-800 text-white rounded-xl text-sm font-semibold border border-blue-600 hover:bg-blue-900 transition-colors text-center"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">What People Say</h2>
            <p className="text-muted-foreground mt-1">Stories from candidates who found success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-1">Everything you need to know about TalentHub</p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div key={item.id} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                >
                  <span className="text-sm font-medium text-foreground">{item.question}</span>
                  {openFaq === item.id ? (
                    <ChevronUp size={16} className="text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === item.id && (
                  <div className="px-6 pb-4 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-4">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Mail size={22} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Get Job Alerts in Your Inbox</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to receive personalized job alerts matching your profile every week.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/10 text-white placeholder:text-blue-200 border border-white/20 focus:outline-none focus:border-white/50 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-blue-200 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
