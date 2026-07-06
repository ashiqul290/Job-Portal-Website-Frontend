import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Headphones, FileText } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Get in Touch</h1>
          <p className="text-blue-100 text-lg">
            Have a question or need help? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: "Email Support",
                sub: "We'll respond within 24 hours",
                value: "support@talenthub.io",
                color: "text-primary",
                bg: "bg-secondary",
              },
              {
                icon: Phone,
                title: "Phone Support",
                sub: "Mon–Fri, 9am–6pm PST",
                value: "+1 (415) 555-0102",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: MapPin,
                title: "Office",
                sub: "Come visit us",
                value: "548 Market St, San Francisco, CA 94104",
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                icon: Clock,
                title: "Business Hours",
                sub: "When we're available",
                value: "Mon–Fri: 9am–6pm PST\nSat–Sun: Closed",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
            ].map(({ icon: Icon, title, sub, value, color, bg }) => (
              <div key={title} className="bg-white rounded-xl border border-border p-5 flex items-start gap-4">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} className={color} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mb-1">{sub}</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            {/* Quick links */}
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="font-semibold text-foreground text-sm mb-3">Quick Help</p>
              <div className="space-y-2">
                {[
                  { icon: MessageSquare, label: "Live Chat — Available now" },
                  { icon: Headphones, label: "Help Center" },
                  { icon: FileText, label: "Documentation" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-secondary transition-colors text-left"
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-border p-7">
              {!submitted ? (
                <>
                  <h2 className="text-lg font-bold text-foreground mb-1">Send us a message</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Alex Morgan"
                          required
                          className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-foreground block mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="you@example.com"
                          required
                          className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground block mb-1.5">Subject *</label>
                      <select
                        value={form.subject}
                        onChange={update("subject")}
                        required
                        className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-background text-foreground"
                      >
                        <option value="">Select a topic</option>
                        <option>Job Seeker Support</option>
                        <option>Employer / Hiring</option>
                        <option>Technical Issue</option>
                        <option>Billing & Pricing</option>
                        <option>Partnership Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground block mb-1.5">Message *</label>
                      <textarea
                        rows={6}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="How can we help you? Please be as detailed as possible..."
                        required
                        className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send size={15} /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={30} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                    Thanks for reaching out. We'll get back to you at <span className="font-medium text-foreground">{form.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setSubmitted(false); }}
                    className="text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
