import { Link } from "react-router";
import { Briefcase, Twitter, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = {
  "For Job Seekers": [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Browse Companies", href: "/companies" },
    { label: "Career Resources", href: "/about" },
    { label: "Salary Calculator", href: "/jobs" },
    { label: "Job Alerts", href: "/register" },
  ],
  "For Employers": [
    { label: "Post a Job", href: "/dashboard" },
    { label: "Browse Candidates", href: "/dashboard" },
    { label: "Pricing", href: "/about" },
    { label: "Recruitment Solutions", href: "/about" },
    { label: "Employer Branding", href: "/about" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/about" },
    { label: "Press", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/about" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Talent<span className="text-blue-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Connecting exceptional talent with world-class companies. Find your dream job or the perfect candidate
              today.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Github, label: "GitHub" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 TalentHub, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
