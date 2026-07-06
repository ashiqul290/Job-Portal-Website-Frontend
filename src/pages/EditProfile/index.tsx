import { useState } from "react";
import { Link } from "react-router";
import { Camera, Plus, X, Save, ArrowLeft } from "lucide-react";

export default function EditProfile() {
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 1000);
  };

  const Field = ({ label, type = "text", placeholder, defaultValue, required = false }: any) => (
    <div>
      <label className="text-xs font-medium text-foreground block mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background resize-none"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full px-3.5 py-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-background"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white rounded-xl border border-border p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/profile"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Edit Profile</h1>
            <p className="text-sm text-muted-foreground">Update your personal information</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-70"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <>✓ Saved!</>
          ) : (
            <><Save size={14} /> Save Changes</>
          )}
        </button>
      </div>

      {/* Photo */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Profile Photo</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
              alt="Profile"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-border"
            />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md">
              <Camera size={12} className="text-white" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Upload new photo</p>
            <p className="text-xs text-muted-foreground mb-2">JPG, PNG or GIF · Max 5MB</p>
            <button className="text-xs font-medium text-primary border border-primary/40 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors">
              Choose File
            </button>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" placeholder="Alex" defaultValue="Alex" required />
          <Field label="Last Name" placeholder="Morgan" defaultValue="Morgan" required />
          <Field label="Job Title / Headline" placeholder="Senior Frontend Engineer" defaultValue="Senior Frontend Engineer" required />
          <Field label="Location" placeholder="San Francisco, CA" defaultValue="San Francisco, CA" />
          <Field label="Email Address" type="email" placeholder="alex@example.com" defaultValue="alex@example.com" required />
          <Field label="Phone Number" type="tel" placeholder="+1 (415) 555-0192" defaultValue="+1 (415) 555-0192" />
          <div className="sm:col-span-2">
            <Field label="About / Bio" type="textarea" placeholder="Tell employers about yourself..." defaultValue="Senior Frontend Engineer with 6+ years of experience building high-performance web applications." />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Social Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="LinkedIn URL" placeholder="linkedin.com/in/alexmorgan" defaultValue="linkedin.com/in/alexmorgan" />
          <Field label="GitHub URL" placeholder="github.com/alexmorgan" defaultValue="github.com/alexmorgan" />
          <Field label="Portfolio Website" placeholder="alexmorgan.dev" defaultValue="alexmorgan.dev" />
          <Field label="Twitter / X" placeholder="@alexmorgan" defaultValue="@alexmorgan" />
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <div key={skill} className="flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-medium px-3 py-1.5 rounded-xl">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="Add a skill (e.g. Python)"
            className="flex-1 px-3.5 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-input-background"
          />
          <button
            onClick={addSkill}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-secondary text-primary rounded-xl text-sm font-medium hover:bg-accent transition-colors"
          >
            <Plus size={15} />
            Add
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Resume</h2>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
          <div className="text-3xl mb-3">📄</div>
          <p className="text-sm font-medium text-foreground mb-1">Alex_Morgan_Resume.pdf</p>
          <p className="text-xs text-muted-foreground mb-4">Uploaded Jan 3, 2026 · 245 KB</p>
          <button className="text-sm font-medium text-primary border border-primary/40 px-4 py-2 rounded-xl hover:bg-secondary transition-colors">
            Replace Resume
          </button>
        </div>
      </div>
    </div>
  );
}
