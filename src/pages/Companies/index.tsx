import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { companies } from "../../data/mockData";
import CompanyCard from "../../components/company/CompanyCard";

const INDUSTRIES = ["FinTech", "Design Tools", "Cloud Platform", "Project Management", "Productivity", "AI / Research", "Video Messaging", "Developer Tools"];
const SIZES = ["1–50", "50–200", "200–500", "500–1,000", "1,000–5,000"];

export default function Companies() {
  const [keyword, setKeyword] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const filtered = companies.filter((c) => {
    const q = keyword.toLowerCase();
    if (q && !c.name.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q)) return false;
    if (selectedIndustries.length && !selectedIndustries.includes(c.industry)) return false;
    return true;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Browse Companies</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Discover {companies.length} top companies actively hiring
          </p>
          <div className="flex gap-3">
            <div className="flex-1 max-w-lg flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-3">
              <Search size={16} className="text-muted-foreground" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by company name or industry"
                className="flex-1 text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              />
              {keyword && (
                <button onClick={() => setKeyword("")}>
                  <X size={14} className="text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <SlidersHorizontal size={14} />
                  Filters
                </h3>
                {selectedIndustries.length > 0 && (
                  <button onClick={() => setSelectedIndustries([])} className="text-xs text-primary hover:underline">
                    Clear
                  </button>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Industry</p>
                <div className="space-y-2">
                  {INDUSTRIES.map((ind) => (
                    <label key={ind} className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(ind)}
                        onChange={() => setSelectedIndustries(toggle(selectedIndustries, ind))}
                        className="w-4 h-4 rounded border-gray-300 accent-primary"
                      />
                      <span className="text-sm text-foreground hover:text-primary transition-colors">{ind}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Company grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> companies found
              </p>
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🏢</p>
                <h3 className="font-semibold text-foreground mb-2">No companies found</h3>
                <p className="text-sm text-muted-foreground">Try different search terms or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
