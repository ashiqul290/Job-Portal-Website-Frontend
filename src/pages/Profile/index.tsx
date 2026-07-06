import { Link } from "react-router";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  GraduationCap,
  Star,
  Edit3,
  Download,
  BadgeCheck,
} from "lucide-react";

export default function Profile() {
  const skills = ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "PostgreSQL", "Docker", "AWS"];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-r from-primary via-blue-600 to-indigo-600" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
                alt="Alex Morgan"
                className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <Download size={14} />
                Resume
              </button>
              <Link
                to="/dashboard/edit-profile"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Edit3 size={14} />
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                Alex Morgan
                <BadgeCheck size={18} className="text-primary" />
              </h1>
              <p className="text-muted-foreground mt-0.5">Senior Frontend Engineer</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin size={13} /> San Francisco, CA</span>
                <span className="flex items-center gap-1.5"><Mail size={13} /> alex@example.com</span>
                <span className="flex items-center gap-1.5"><Phone size={13} /> +1 (415) 555-0192</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[{ icon: Linkedin, label: "LinkedIn" }, { icon: Github, label: "GitHub" }, { icon: Twitter, label: "Twitter" }, { icon: Globe, label: "Website" }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-3">About</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Senior Frontend Engineer with 6+ years of experience building high-performance web applications. Passionate
          about developer experience, design systems, and open source. Previously at Airbnb and Shopify. I love working
          on products that millions of people use and care deeply about craft, accessibility, and performance.
        </p>
      </div>

      {/* Experience */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Briefcase size={16} className="text-primary" />
          Work Experience
        </h2>
        <div className="space-y-5">
          {[
            {
              title: "Senior Frontend Engineer",
              company: "Shopify",
              period: "Jan 2022 – Present",
              current: true,
              desc: "Led the redesign of Shopify's merchant dashboard, improving task completion rate by 34%. Built a React component library used across 12 product teams.",
            },
            {
              title: "Frontend Engineer II",
              company: "Airbnb",
              period: "Mar 2019 – Dec 2021",
              current: false,
              desc: "Worked on the host onboarding flow, increasing conversion by 22%. Contributed to Airbnb's internal design system (Lottie).",
            },
            {
              title: "Frontend Developer",
              company: "Vercel",
              period: "Jun 2017 – Feb 2019",
              current: false,
              desc: "Built and maintained the marketing site and documentation. Helped launch the rebranding from Zeit to Vercel.",
            },
          ].map((exp) => (
            <div key={exp.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${exp.current ? "bg-primary" : "bg-muted-foreground/30"}`} />
                <div className="w-px flex-1 bg-border mt-1" />
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">{exp.title}</p>
                    <p className="text-xs text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{exp.period}</p>
                    {exp.current && (
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <GraduationCap size={16} className="text-primary" />
          Education
        </h2>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
            <GraduationCap size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">B.S. Computer Science</p>
            <p className="text-xs text-primary font-medium">University of California, Berkeley</p>
            <p className="text-xs text-muted-foreground">2013 – 2017 · GPA: 3.8</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star size={16} className="text-primary" />
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="text-sm font-medium text-accent-foreground bg-accent px-4 py-2 rounded-xl">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
