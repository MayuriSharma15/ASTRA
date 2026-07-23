import { Plus, Trash2 } from "lucide-react";

function makeEmptyEntry() {
  return { title: "", company: "", duration: "", description: "" };
}

export function ExperienceEditor({ entries, onChange }) {
  function updateEntry(index, field, value) {
    const next = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    onChange(next);
  }

  function addEntry() {
    onChange([...entries, makeEmptyEntry()]);
  }

  function removeEntry(index) {
    onChange(entries.filter((_, i) => i !== index));
  }

  const inputClass =
    "w-full px-3 py-2 rounded-md bg-glass-fill border border-glass-border text-sm text-text-primary placeholder:text-text-tertiary font-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-signal";

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="relative border border-glass-border rounded-md p-4 flex flex-col gap-3"
        >
          <button
            onClick={() => removeEntry(index)}
            aria-label="Remove entry"
            className="absolute top-3 right-3 text-text-tertiary hover:text-accent-rare transition-colors duration-fast"
          >
            <Trash2 size={14} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-6">
            <input
              type="text"
              placeholder="Job title"
              value={entry.title}
              onChange={(e) => updateEntry(index, "title", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Company"
              value={entry.company}
              onChange={(e) => updateEntry(index, "company", e.target.value)}
              className={inputClass}
            />
          </div>

          <input
            type="text"
            placeholder="Duration (e.g. Jan 2023 - Present)"
            value={entry.duration}
            onChange={(e) => updateEntry(index, "duration", e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="What did you do / achieve in this role?"
            value={entry.description}
            onChange={(e) => updateEntry(index, "description", e.target.value)}
            rows={2}
            className={inputClass + " resize-none"}
          />
        </div>
      ))}

      <button
        onClick={addEntry}
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border border-dashed border-glass-border-strong text-text-secondary hover:text-text-primary hover:border-accent-core/40 transition-colors duration-fast text-sm font-body"
      >
        <Plus size={16} />
        Add experience
      </button>
    </div>
  );
}
