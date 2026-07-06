import { useState, useMemo } from "react";
import { Search, MapPin, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { jobs } from "../../data/mockData";
import JobCard from "../../components/jobs/JobCard";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];
const EXPERIENCE_LEVELS = ["Entry (0–2 yrs)", "Mid (3–5 yrs)", "Senior (5+ yrs)", "Staff (8+ yrs)"];
const CATEGORIES = ["Engineering", "Design", "Marketing", "Product", "Data Science", "Finance", "Sales", "Operations"];
const SORT_OPTIONS = ["Most Relevant", "Newest First", "Salary: High to Low", "Salary: Low to High"];

export default function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const q = keyword.toLowerCase();
      if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q)) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (selectedTypes.length && !selectedTypes.includes(j.type)) return false;
      if (selectedCategories.length && !selectedCategories.includes(j.category)) return false;
      if (selectedExperience.length && !selectedExperience.includes(j.experience)) return false;
      if (remoteOnly && !j.remote) return false;
      return true;
    });
  }, [keyword, location, selectedTypes, selectedCategories, selectedExperience, remoteOnly]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const clearAll = () => {
    setKeyword("");
    setLocation("");
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedExperience([]);
    setRemoteOnly(false);
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedTypes.length + selectedCategories.length + selectedExperience.length + (remoteOnly ? 1 : 0);

  const Filters = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm">Filters</h3>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Remote toggle */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`w-10 h-5.5 rounded-full transition-colors cursor-pointer flex items-center px-0.5 ${
              remoteOnly ? "bg-primary" : "bg-gray-300"
            }`}
            style={{ height: "22px" }}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                remoteOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-sm text-foreground">Remote only</span>
        </label>
      </div>

      {/* Job Type */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Job Type</p>
        <div className="space-y-2">
          {JOB_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes(t)}
                onChange={() => setSelectedTypes(toggle(selectedTypes, t))}
                className="w-4 h-4 rounded border-gray-300 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{t}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Category</p>
        <div className="space-y-2">
          {CATEGORIES.map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() => setSelectedCategories(toggle(selectedCategories, c))}
                className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Experience Level</p>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((e) => (
            <label key={e} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedExperience.includes(e)}
                onChange={() => setSelectedExperience(toggle(selectedExperience, e))}
                className="w-4 h-4 rounded border-gray-300 accent-primary cursor-pointer"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">{e}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Browse Jobs</h1>
          <p className="text-muted-foreground text-sm mb-6">
            {jobs.length.toLocaleString()} opportunities waiting for you
          </p>

          {/* Search row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-3">
              <Search size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value); setCurrentPage(1); }}
                placeholder="Job title or keyword"
                className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
              {keyword && (
                <button onClick={() => setKeyword("")}>
                  <X size={14} className="text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <div className="flex-1 flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-3">
              <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                value={location}
                onChange={(e) => { setLocation(e.target.value); setCurrentPage(1); }}
                placeholder="City, state, or Remote"
                className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-xl text-sm font-medium text-foreground"
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="text-xs bg-primary text-white rounded-full px-1.5">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-24">
              <Filters />
            </div>
          </aside>

          {/* Job list */}
          <div className="flex-1 min-w-0">
            {/* Sort & count bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> jobs found
              </p>
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 text-sm text-foreground bg-white border border-border rounded-lg px-3 py-2 hover:border-primary/40 transition-colors"
                >
                  Sort: {sortBy}
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-border shadow-lg py-1 z-10 w-52">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          sortBy === opt ? "text-primary font-medium" : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Job cards */}
            {paginated.length > 0 ? (
              <>
                <div className="space-y-3">
                  {paginated.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-40 hover:bg-muted transition-colors text-foreground"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary text-white"
                            : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-40 hover:bg-muted transition-colors text-foreground"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <button onClick={clearAll} className="text-sm text-primary hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-foreground">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-6 py-3 bg-primary text-white rounded-xl text-sm font-medium"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
