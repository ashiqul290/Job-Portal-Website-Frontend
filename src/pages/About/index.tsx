import { Link } from "react-router";
import { ArrowRight, Target, Heart, Zap, Globe2, Users, Briefcase, TrendingUp, Star } from "lucide-react";
import { teamMembers } from "../../data/mockData";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Star size={13} className="fill-white" />
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            We're on a mission to connect{" "}
            <span className="text-yellow-300">great talent</span> with great companies
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            TalentHub was founded in 2021 with a simple belief: finding the right job — or the right hire — should be
            faster, smarter, and more human.
          </p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Find Jobs Today <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-14 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { icon: Briefcase, value: "10K+", label: "Active Jobs" },
              { icon: Users, value: "50K+", label: "Job Seekers" },
              { icon: Globe2, value: "5K+", label: "Companies" },
              { icon: TrendingUp, value: "98%", label: "Satisfaction" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label}>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Our Mission",
                color: "text-primary",
                bg: "bg-secondary",
                body: "To create a world where every person can find meaningful work and every company can build the team they need to change their industry.",
              },
              {
                icon: Heart,
                title: "Our Values",
                color: "text-red-500",
                bg: "bg-red-50",
                body: "We believe in transparency, fairness, and putting people first. Every decision we make is guided by our commitment to both job seekers and employers.",
              },
              {
                icon: Zap,
                title: "Our Vision",
                color: "text-yellow-600",
                bg: "bg-yellow-50",
                body: "A future where AI and human expertise combine to make the hiring process radically better — faster for companies, more personal for candidates.",
              },
            ].map(({ icon: Icon, title, color, bg, body }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-6">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Built by people who've been on both sides of the table
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  TalentHub started in 2021 when co-founders Jordan Kim and Aisha Okonkwo met at a conference and
                  discovered they shared a frustration: job searching and hiring were both unnecessarily painful.
                </p>
                <p>
                  Jordan, a former engineering lead who had hired hundreds of engineers, was exhausted by the noise of
                  traditional job boards. Aisha, a product manager who had searched for jobs multiple times, was
                  frustrated by the black-hole experience of applying and never hearing back.
                </p>
                <p>
                  Together, they built TalentHub with a simple goal: create a platform where signal beats noise, where
                  every application gets a response, and where companies can find exactly the talent they need.
                </p>
              </div>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Opportunities <ArrowRight size={15} />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop&auto=format"
                alt="Team working together"
                className="rounded-2xl w-full shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl border border-border p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {teamMembers.slice(0, 3).map((m) => (
                      <img key={m.id} src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">50,000+ users</p>
                    <p className="text-xs text-muted-foreground">joined this year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Meet the Team</h2>
            <p className="text-muted-foreground mt-1">The people building TalentHub</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-border p-5 text-center hover:shadow-md transition-shadow">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
                />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your next opportunity?</h2>
          <p className="text-blue-100 mb-8">
            Join 50,000+ professionals who've already found their dream job through TalentHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-blue-800 text-white rounded-xl text-sm font-semibold border border-blue-600 hover:bg-blue-900 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
