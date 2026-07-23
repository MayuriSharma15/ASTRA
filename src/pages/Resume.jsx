import { useEffect, useState } from "react";
import { Save, Sparkles, Loader2 } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { GlassCard } from "../components/ui/GlassCard";
import { Button } from "../components/ui/Button";
import { ExperienceEditor } from "../components/dashboard/ExperienceEditor";
import { EducationEditor } from "../components/dashboard/EducationEditor";
import { ResumeReviewCard } from "../components/dashboard/ResumeReviewCard";
import { useAuth } from "../hooks/useAuth";
import { getResume, updateResume, reviewResume } from "../services/resumeService";

const inputClass =
  "w-full px-3 py-2.5 rounded-md bg-glass-fill border border-glass-border text-sm text-text-primary placeholder:text-text-tertiary font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal";

export function Resume() {
  const { token } = useAuth();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    getResume(token)
      .then((data) => setResume(data.resume))
      .catch(() => setError("Couldn't load your resume"))
      .finally(() => setLoading(false));
  }, [token]);

  function updateField(field, value) {
    setResume((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaveMessage("");
    try {
      const data = await updateResume(token, resume);
      setResume(data.resume);
      setSaveMessage("Saved");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleReview() {
    setReviewing(true);
    setError("");
    try {
      await updateResume(token, resume);
      const data = await reviewResume(token);
      setResume(data.resume);
    } catch (err) {
      setError(err.message);
    } finally {
      setReviewing(false);
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64 text-text-tertiary">
          <Loader2 size={20} className="animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-semibold text-2xl text-text-primary">Resume</h1>
          <p className="mt-1 text-text-secondary font-body text-sm">
            Build your resume and get real AI feedback on it.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage && <span className="text-xs text-accent-signal font-body">{saveMessage}</span>}
          <Button variant="secondary" size="sm" icon={Save} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Sparkles}
            onClick={handleReview}
            disabled={reviewing}
          >
            {reviewing ? "Reviewing..." : "Get AI Review"}
          </Button>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-accent-rare font-body">{error}</p>}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard padding="lg" hover={false}>
            <h3 className="font-display font-semibold text-base text-text-primary mb-4">
              Basic Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full name"
                value={resume.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email"
                value={resume.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Phone"
                value={resume.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={resume.skills.join(", ")}
                onChange={(e) =>
                  updateField(
                    "skills",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
                className={inputClass}
              />
            </div>
            <textarea
              placeholder="Professional summary"
              value={resume.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              rows={3}
              className={inputClass + " mt-3 resize-none"}
            />
          </GlassCard>

          <GlassCard padding="lg" hover={false}>
            <h3 className="font-display font-semibold text-base text-text-primary mb-4">
              Experience
            </h3>
            <ExperienceEditor
              entries={resume.experience}
              onChange={(entries) => updateField("experience", entries)}
            />
          </GlassCard>

          <GlassCard padding="lg" hover={false}>
            <h3 className="font-display font-semibold text-base text-text-primary mb-4">
              Education
            </h3>
            <EducationEditor
              entries={resume.education}
              onChange={(entries) => updateField("education", entries)}
            />
          </GlassCard>
        </div>

        <div>
          {resume.lastReview ? (
            <ResumeReviewCard review={resume.lastReview} />
          ) : (
            <GlassCard padding="lg" hover={false} className="text-center">
              <Sparkles size={24} className="text-accent-core/50 mx-auto mb-2" />
              <p className="text-sm text-text-secondary font-body">
                Click "Get AI Review" once you've filled in your resume to get real feedback.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
